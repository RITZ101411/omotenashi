import json
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="表無し API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DUMMY_SPOTS_PATH = Path(__file__).resolve().parents[2] / "shared" / "dummy-spots.json"

with DUMMY_SPOTS_PATH.open(encoding="utf-8") as f:
    spots: list[dict] = json.load(f)


class Spot(BaseModel):
    id: int
    name: str
    description: str
    photo_url: str | None = None
    lat: float
    lng: float
    created_at: str


class SpotCreate(BaseModel):
    name: str
    description: str
    photo_url: str | None = None
    lat: float
    lng: float


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/spots", response_model=list[Spot])
def list_spots():
    return spots


@app.get("/spots/{spot_id}", response_model=Spot)
def get_spot(spot_id: int):
    for spot in spots:
        if spot["id"] == spot_id:
            return spot
    raise HTTPException(status_code=404, detail="Spot not found")


@app.post("/spots", response_model=Spot, status_code=201)
def create_spot(spot: SpotCreate):
    new_id = max((s["id"] for s in spots), default=0) + 1
    new_spot = {
        "id": new_id,
        **spot.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    spots.append(new_spot)
    return new_spot
