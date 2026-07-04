from sqlmodel import SQLModel, Field
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
