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
    latitude: float
    longitude: float


class StampRead(SQLModel):
    id: int
    user_id: str
    spot_id: int
    stamped_at: datetime


class UserProfile(SQLModel, table=True):
    __tablename__ = "user_profiles"

    id: str = Field(primary_key=True)
    display_name: str
    avatar_url: str | None = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class UserProfileRead(SQLModel):
    id: str
    display_name: str
    avatar_url: str | None = None
    created_at: datetime


class UserMe(SQLModel):
    id: str
    display_name: str
    avatar_url: str | None = None
    exploration_rate: float
    stamped_count: int
    total_spots: int
    post_count: int


class Notification(SQLModel, table=True):
    __tablename__ = "notifications"

    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    type: str  # "stamp" | "reaction"
    message: str
    spot_id: int = Field(foreign_key="spots.id", ondelete="CASCADE")
    is_read: bool = Field(default=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NotificationRead(SQLModel):
    id: int
    type: str
    message: str
    spot_id: int
    is_read: bool
    created_at: datetime
