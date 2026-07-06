import { View, Text, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import {
  Map,
  Camera,
  Marker,
  type MapRef,
  type CameraRef,
} from "@maplibre/maplibre-react-native";
import { router } from "expo-router";
import { X, MapPin } from "lucide-react-native";
import { useUserLocation } from "../hooks/useUserLocation";

const FALLBACK_CENTER: [number, number] = [139.6991, 35.5312];
const DEFAULT_ZOOM = 16;

export default function PostScreen() {
  const { coords } = useUserLocation();
  const mapRef = useRef<MapRef>(null);
  const cameraRef = useRef<CameraRef>(null);
  const centeredOnUser = useRef(false);

  // 初回だけ自分の位置へ寄せる（＝デフォルトのピン位置）。以降はユーザーが自由に動かせる。
  useEffect(() => {
    if (coords && !centeredOnUser.current) {
      cameraRef.current?.jumpTo({ center: [coords.longitude, coords.latitude] });
      centeredOnUser.current = true;
    }
  }, [coords]);

  // 画面中央（＝固定ピンの先端）の座標を確定
  const confirm = async () => {
    const center = await mapRef.current?.getCenter();
    if (!center) return;
    const [longitude, latitude] = center;
    router.push({
      pathname: "/post-detail",
      params: { lat: String(latitude), lng: String(longitude) },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Map
        ref={mapRef}
        style={{ flex: 1 }}
        mapStyle={"https://tiles.openfreemap.org/styles/bright"}
      >
        <Camera
          ref={cameraRef}
          initialViewState={{ center: FALLBACK_CENTER, zoom: DEFAULT_ZOOM }}
        />

        {/* 現在地（紫のドット。周囲の20m円は出さない） */}
        {coords && (
          <Marker lngLat={[coords.longitude, coords.latitude]}>
            <View className="w-5 h-5 rounded-full bg-purple-500 border-2 border-white shadow" />
          </Marker>
        )}
      </Map>

      {/* 画面中央に固定したピン。先端を画面中央に合わせている（getCenter の座標と一致） */}
      <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
        <View style={{ transform: [{ translateY: -30 }] }} className="items-center">
          <MapPin size={30} color="#7c3aed" fill="#7c3aed" />
          <View className="w-2 h-2 rounded-full bg-purple-600 -mt-1" />
        </View>
      </View>

      {/* 左上の閉じるボタン（白背景・黒文字・黒枠） */}
      <Pressable
        onPress={() => router.replace("/")}
        className="absolute top-14 left-5 w-10 h-10 rounded-full bg-white border border-black items-center justify-center"
      >
        <X size={20} color="#111827" />
      </Pressable>

      {/* 下部エリア */}
      <View className="absolute left-0 right-0 bottom-0">
        {/* ヒントバッジ */}
        <View className="items-center mb-3">
          <View className="flex-row items-center gap-1.5 bg-white rounded-full border border-black px-3.5 py-2">
            <MapPin size={14} color="#7c3aed" />
            <Text className="text-xs text-gray-900">
              地図を動かしてピンの位置を決めてください
            </Text>
          </View>
        </View>

        {/* 決定バー */}
        <View className="bg-white border-t border-gray-200 px-5 pt-3 pb-8">
          <Pressable
            onPress={confirm}
            className="h-14 rounded-full bg-purple-500 items-center justify-center active:bg-purple-600"
          >
            <Text className="text-base font-bold text-white">この場所に決定</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
