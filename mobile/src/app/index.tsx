import { View, Pressable, Text } from "react-native";
import { useMemo, useState, useCallback } from "react";
import {
  Map,
  Camera,
  Marker,
  GeoJSONSource,
  Layer,
} from "@maplibre/maplibre-react-native";
import { router, useFocusEffect } from "expo-router";
import { SpotThumbnail } from "../components/SpotThumbnail";
import { circleRing } from "../lib/geo";
import { NEARBY_RADIUS_M, spotsWithinRadius } from "../lib/nearby";
import { useUserLocation } from "../hooks/useUserLocation";
import { useAuth } from "../providers/AuthProvider";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8000";
const INITIAL_CENTER: [number, number] = [139.6991, 35.5312];
const INITIAL_ZOOM = 14;

type Spot = {
  id: number;
  name: string;
  photo_url: string | null;
  lat: number;
  lng: number;
};

export default function MapScreen() {
  const { coords } = useUserLocation();
  const { session } = useAuth();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [visitedSpotIds, setVisitedSpotIds] = useState<Set<number>>(new Set());

  // スポット一覧 + スタンプ済み取得
  useFocusEffect(
    useCallback(() => {
      fetch(`${API_BASE_URL}/spots`)
        .then((res) => res.ok ? res.json() : [])
        .then((data) => setSpots(data))
        .catch(() => {});

      if (session) {
        fetch(`${API_BASE_URL}/users/me/stamps`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
          .then((res) => res.ok ? res.json() : [])
          .then((stamps: { spot_id: number }[]) => {
            setVisitedSpotIds(new Set(stamps.map((s) => s.spot_id)));
          })
          .catch(() => {});
      }
    }, [session])
  );

  // 範囲内のマーカーを揺らす
  const nearbySpotIds = useMemo(() => {
    if (!coords) return new Set<number>();
    return new Set(spotsWithinRadius(coords, spots).map(({ spot }) => spot.id));
  }, [coords, spots]);

  // 現在地を中心にした20m圏（NEARBY_RADIUS_M）。現在地が動くたびに作り直す。
  const userRadiusCircle = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (!coords) return null;
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [circleRing(coords, NEARBY_RADIUS_M)],
          },
        },
      ],
    };
  }, [coords]);

  return (
    <View className="flex-1">
      <Map style={{ flex: 1 }} mapStyle={"https://tiles.openfreemap.org/styles/bright"}>
        <Camera
          initialViewState={{ center: INITIAL_CENTER, zoom: INITIAL_ZOOM }}
          trackUserLocation="default"
        />

        {spots.map((spot) => (
          <Marker
            key={spot.id}
            lngLat={[spot.lng, spot.lat]}
            onPress={() => router.push(`/spot/${spot.id}`)}
          >
            <SpotThumbnail
              photo_url={spot.photo_url}
              name={spot.name}
              state={visitedSpotIds.has(spot.id) ? "visited" : nearbySpotIds.has(spot.id) ? "in-range" : "normal"}
            />
          </Marker>
        ))}

        {/* 現在地まわりの20m圏（紫の外枠のみ） */}
        {userRadiusCircle && (
          <GeoJSONSource id="user-radius" data={userRadiusCircle}>
            <Layer
              id="user-radius-line"
              type="line"
              paint={{ "line-color": "#a855f7", "line-width": 2, "line-opacity": 0.9 }}
            />
          </GeoJSONSource>
        )}

        {/* 現在地（紫のドット） */}
        {coords && (
          <Marker lngLat={[coords.longitude, coords.latitude]}>
            <View className="w-5 h-5 rounded-full bg-purple-500 border-2 border-white shadow" />
          </Marker>
        )}
      </Map>

    </View>
  );
}
