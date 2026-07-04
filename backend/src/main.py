from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Session, select

from .database import get_session, create_db_and_tables
from .models import Spot, SpotCreate, SpotRead


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
