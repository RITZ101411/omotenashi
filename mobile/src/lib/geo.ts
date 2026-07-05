export type LatLng = {
  latitude: number;
  longitude: number;
};

const EARTH_RADIUS_M = 6_371_000; // 地球の平均半径（メートル）

const toRad = (deg: number) => (deg * Math.PI) / 180;

export function distanceMeters(a: LatLng, b: LatLng): number {
  const dLat = toRad(b.latitude - a.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

const METERS_PER_DEG_LAT = 111_320; // 緯度1度あたりの距離（メートル）

/**
 * 中心から半径 radiusM の円を近似した多角形の座標リング（[lng, lat] の配列）を返す。
 * MapLibre の CircleLayer は半径がピクセル単位でズームに追従しないため、
 * 「地上20m」を描くには実座標のポリゴンにして FillLayer で塗る。
 */
export function circleRing(
  center: LatLng,
  radiusM: number,
  steps = 48
): [number, number][] {
  const dLat = radiusM / METERS_PER_DEG_LAT;
  const dLng = radiusM / (METERS_PER_DEG_LAT * Math.cos(toRad(center.latitude)));

  const ring: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    ring.push([
      center.longitude + dLng * Math.cos(theta),
      center.latitude + dLat * Math.sin(theta),
    ]);
  }
  return ring;
}
