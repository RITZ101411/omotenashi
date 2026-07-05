from sqlmodel import SQLModel, Field, UniqueConstraint
from datetime import datetime, timezone


class Spot(SQLModel, table=True):
    __tablename__ = "spots"

    id: int | None = Field(default=None, primary_key=True)
    user_id: str | None = None
    name: str
    description: str
    photo_url: str | None = None
    lat: float
    lng: float
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SpotCreate(SQLModel):
    name: str
    description: str
    photo_url: str | None = None
    lat: float
    lng: float


class SpotRead(SQLModel):
    id: int
    name: str
    description: str
    photo_url: str | None = None
    lat: float
    lng: float
    created_at: datetime


class Stamp(SQLModel, table=True):
    __tablename__ = "stamps"
    __table_args__ = (UniqueConstraint("user_id", "spot_id"),)

    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(max_length=50)
    spot_id: int = Field(foreign_key="spots.id", ondelete="CASCADE")
    stamped_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StampCreate(SQLModel):
    # TODO: 認証実装後は JWT から取得した user_id に差し替える想定
    user_id: str
    latitude: float
    longitude: float


class StampRead(SQLModel):
    id: int
    user_id: str
    spot_id: int
    stamped_at: datetime
