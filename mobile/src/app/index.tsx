import { View, Pressable, Text } from "react-native";
import { Map, Camera, Marker } from "@maplibre/maplibre-react-native";
import { router } from "expo-router";
import { mockSpots } from "../data/mock-spots";
import { SpotThumbnail } from "../components/SpotThumbnail";

const INITIAL_CENTER: [number, number] = [139.6991, 35.5312];
const INITIAL_ZOOM = 14;

export default function MapScreen() {
  return (
    <View className="flex-1">
      <Map style={{ flex: 1 }} mapStyle={"https://tiles.openfreemap.org/styles/bright"}>
        <Camera
          initialViewState={{ center: INITIAL_CENTER, zoom: INITIAL_ZOOM }}
        />
        {mockSpots.map((spot) => (
          <Marker
            key={spot.id}
            lngLat={[spot.lng, spot.lat]}
            onPress={() => router.push(`/spot/${spot.id}`)}
          >
            <SpotThumbnail photo_url={spot.photo_url} name={spot.name} state="normal" />
          </Marker>
        ))}
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
