import math

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, func

from .auth import get_current_user_id
from .database import get_session, create_db_and_tables
from .models import (
    Spot,
    SpotCreate,
    SpotRead,
    Stamp,
    StampCreate,
    StampRead,
    UserMe,
    UserProfile,
)

# スタンプを許可するスポット中心からの半径(メートル)
# docs/screens.md 「2. メイン画面」の現在地サークル半径(20m)に合わせる
STAMP_ALLOWED_RADIUS_METERS = 20

EARTH_RADIUS_METERS = 6371000


def haversine_distance_meters(
    lat1: float, lon1: float, lat2: float, lon2: float
) -> float:
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    d_phi = math.radians(lat2 - lat1)
    d_lambda = math.radians(lon2 - lon1)

    a = (
        math.sin(d_phi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(d_lambda / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return EARTH_RADIUS_METERS * c


app = FastAPI(title="表無し API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/users/me", response_model=UserMe)
def get_current_user(
    user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session),
):
    profile = session.get(UserProfile, user_id)
    if not profile:
        profile = UserProfile(
            id=user_id,
            display_name="user-" + user_id[:8],
        )
        session.add(profile)
        session.commit()
        session.refresh(profile)

    stamped_count = session.exec(
        select(func.count()).select_from(Stamp).where(Stamp.user_id == user_id)
    ).one()
    total_spots = session.exec(select(func.count()).select_from(Spot)).one()
    post_count = session.exec(
        select(func.count()).select_from(Spot).where(Spot.user_id == user_id)
    ).one()

    exploration_rate = (
        0.0 if total_spots == 0 else stamped_count / total_spots * 100
    )

    return UserMe(
        id=profile.id,
        display_name=profile.display_name,
        avatar_url=profile.avatar_url,
        exploration_rate=exploration_rate,
        stamped_count=stamped_count,
        total_spots=total_spots,
        post_count=post_count,
    )


@app.get("/spots", response_model=list[SpotRead])
def list_spots(session: Session = Depends(get_session)):
    spots = session.exec(select(Spot)).all()
    return spots


@app.get("/spots/{spot_id}", response_model=SpotRead)
def get_spot(spot_id: int, session: Session = Depends(get_session)):
    spot = session.get(Spot, spot_id)
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    return spot


@app.post("/spots", response_model=SpotRead, status_code=201)
def create_spot(
    spot_data: SpotCreate,
    user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session),
):
    spot = Spot.model_validate(spot_data, update={"user_id": user_id})
    session.add(spot)
    session.commit()
    session.refresh(spot)
    return spot


@app.post("/spots/{spot_id}/stamp", response_model=StampRead, status_code=201)
def stamp_spot(
    spot_id: int,
    stamp_data: StampCreate,
    user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session),
):
    spot = session.get(Spot, spot_id)
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")

    existing = session.exec(
        select(Stamp).where(Stamp.user_id == user_id, Stamp.spot_id == spot_id)
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Already stamped")

    distance = haversine_distance_meters(
        spot.lat, spot.lng, stamp_data.latitude, stamp_data.longitude
    )
    if distance > STAMP_ALLOWED_RADIUS_METERS:
        raise HTTPException(status_code=400, detail="Out of stamp range")

    stamp = Stamp(user_id=user_id, spot_id=spot_id)
    session.add(stamp)
    session.commit()
    session.refresh(stamp)
    return stamp
