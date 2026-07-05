import { View, Pressable, Text } from "react-native";
import { useEffect, useMemo, useRef } from "react";
import {
  Map,
  Camera,
  Marker,
  GeoJSONSource,
  Layer,
  type CameraRef,
  type LngLat,
} from "@maplibre/maplibre-react-native";
import { router } from "expo-router";
import { mockSpots } from "../data/mock-spots";
import { SpotThumbnail } from "../components/SpotThumbnail";
import { circleRing } from "../lib/geo";
import { NEARBY_RADIUS_M, spotsWithinRadius } from "../lib/nearby";
import { useUserLocation } from "../hooks/useUserLocation";

const INITIAL_CENTER: [number, number] = [139.6991, 35.5312];
const INITIAL_ZOOM = 14;

export default function MapScreen() {
  const { coords } = useUserLocation();
  const cameraRef = useRef<CameraRef>(null);
  const initializedCamera = useRef(false);

  useEffect(() => {
    if (!coords || initializedCamera.current) return;

    const center: LngLat = [coords.longitude, coords.latitude];
    cameraRef.current?.jumpTo({ center, zoom: INITIAL_ZOOM });
    initializedCamera.current = true;
  }, [coords]);

  // 範囲内のマーカーを揺らす
  const nearbySpotIds = useMemo(() => {
    if (!coords) return new Set<number>();
    return new Set(spotsWithinRadius(coords, mockSpots).map(({ spot }) => spot.id));
  }, [coords]);

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
          ref={cameraRef}
          initialViewState={{ center: INITIAL_CENTER, zoom: INITIAL_ZOOM }}
          trackUserLocation="default"
        />

        {mockSpots.map((spot) => (
          <Marker
            key={spot.id}
            lngLat={[spot.lng, spot.lat]}
            onPress={() => router.push(`/spot/${spot.id}`)}
          >
            <SpotThumbnail
              photo_url={spot.photo_url}
              name={spot.name}
              state={nearbySpotIds.has(spot.id) ? "in-range" : "normal"}
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

      <Pressable
        onPress={() => router.push("/components-demo")}
        className="absolute top-16 right-5 bg-white rounded-full px-4 py-2 shadow active:bg-gray-100"
      >
        <Text className="text-sm font-medium text-gray-600">コンポーネント一覧</Text>
      </Pressable>
    </View>
  );
}
