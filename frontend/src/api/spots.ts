import rawSpots from '../../../shared/dummy-spots.json';
import type { Spot } from '../types/spot';

export const spots: Spot[] = rawSpots.map((spot) => ({
  id: spot.id,
  name: spot.name,
  description: spot.description,
  photoUrl: spot.photo_url,
  lat: spot.lat,
  lng: spot.lng,
  createdAt: spot.created_at,
}));

// TODO: バックエンドのエンドポイントが実装次第、実際にデータを取得するように修正する
export const fetchSpots = async (): Promise<Spot[]> => spots;
