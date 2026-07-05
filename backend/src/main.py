import math

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Session, select

from .database import get_session, create_db_and_tables
from .models import Spot, SpotCreate, SpotRead, Stamp, StampCreate, StampRead

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


class UserMe(BaseModel):
    id: str
    display_name: str
    exploration_rate: float
    stamped_count: int
    total_spots: int

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
def get_current_user():
    return UserMe(
        id="anonymous-user-1",
        display_name="テストユーザー",
        exploration_rate=37.5,
        stamped_count=3,
        total_spots=8,
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
def create_spot(spot_data: SpotCreate, session: Session = Depends(get_session)):
    spot = Spot.model_validate(spot_data)
    session.add(spot)
    session.commit()
    session.refresh(spot)
    return spot


@app.post("/spots/{spot_id}/stamp", response_model=StampRead, status_code=201)
def stamp_spot(
    spot_id: int,
    stamp_data: StampCreate,
    session: Session = Depends(get_session),
):
    # TODO: 認証実装後は stamp_data.user_id ではなく JWT から取得した user_id を使う
    user_id = stamp_data.user_id

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
