import { useEffect, useState } from "react";
import * as Location from "expo-location";
import type { LatLng } from "../lib/geo";

export type LocationStatus =
  | "idle" // 取得開始前
  | "denied" // 権限を拒否された
  | "watching" // 監視中（まだ1点も取れていないこともある）
  | "error"; // 監視中にエラー

export type UserLocation = {
  coords: LatLng | null;
  accuracyM: number | null; // 位置の誤差半径（メートル）。判定の信頼度に使う
  status: LocationStatus;
};

/**
 * ユーザーの現在地をフォアグラウンドで監視するフック。
 *
 * - 位置情報の「唯一の情報源」。地図の青ドットも近接判定もここから供給する。
 * - いまはフォアグラウンド監視（watchPositionAsync）のみ。
 *   アプリを閉じていても発火させたくなったら、UIを変えずにこの内部だけ
 *   ジオフェンシング（startGeofencingAsync）へ差し替えられる。
 */
export function useUserLocation(): UserLocation {
  const [state, setState] = useState<UserLocation>({
    coords: null,
    accuracyM: null,
    status: "idle",
  });

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    let cancelled = false;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (cancelled) return;
      if (status !== "granted") {
        setState((s) => ({ ...s, status: "denied" }));
        return;
      }

      setState((s) => ({ ...s, status: "watching" }));

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5, // 5m動いたら更新（電池と精度のバランス）
        },
        (location) => {
          setState({
            coords: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            accuracyM: location.coords.accuracy,
            status: "watching",
          });
        }
      );

      if (cancelled) {
        subscription?.remove();
        subscription = null;
      }
    })().catch(() => {
      if (!cancelled) setState((s) => ({ ...s, status: "error" }));
    });

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, []);

  return state;
}
