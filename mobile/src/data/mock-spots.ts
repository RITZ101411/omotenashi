import spotsJson from "../../../shared/dummy-spots.json";

export type Spot = {
  id: number;
  name: string;
  description: string;
  photo_url: string | null;
  lat: number;
  lng: number;
  created_at: string;
};

export type Stamp = {
  id: number;
  user_id: string;
  spot_id: number;
  photo_url: string;
  reaction: string;
  stamped_at: string;
};

export const mockSpots: Spot[] = spotsJson as Spot[];

export const reactions = [
  "静かでよかった！",
  "美味しかった！",
  "景色が良かった！",
  "また来たい！",
  "穴場すぎる！",
];
