import { distanceMeters, type LatLng } from "./geo";
import type { Spot } from "../data/mock-spots";

/**
 * 「スポットに近づいた」と見なす距離（メートル）。
 * 仕様変更はこの1箇所で完結させる。
 */
export const NEARBY_RADIUS_M = 20;

export type SpotWithDistance = {
  spot: Spot;
  distanceM: number;
};

/**
 * 現在地から半径 radiusM 以内のスポットを、近い順で返す。
 *
 * ここが「20mルール」の唯一の置き場所。マップの表示強調も、
 * 将来のカメラ側「近くにいる時だけ足あと可」も、この関数を経由させる。
 *
 * TODO(近接判定): GPS誤差（都市部で5〜20m）で境界がチラつくため、
 * 実際に「到着した」という発火を扱うときは、この結果を購読する側で
 * ヒステリシス（入る20m/出る30m）や連続ヒット数の確認を入れる。
 */
export function spotsWithinRadius(
  origin: LatLng,
  spots: Spot[],
  radiusM: number = NEARBY_RADIUS_M
): SpotWithDistance[] {
  return spots
    .map((spot) => ({
      spot,
      distanceM: distanceMeters(origin, {
        latitude: spot.lat,
        longitude: spot.lng,
      }),
    }))
    .filter(({ distanceM }) => distanceM <= radiusM)
    .sort((a, b) => a.distanceM - b.distanceM);
}
