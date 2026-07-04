import { View } from "react-native";
import { MapView } from "../components/map-view";
import { mockSpots } from "../data/mock-spots";

export default function MapScreen() {
  return (
    <View className="flex-1">
      <MapView spots={mockSpots} />
    </View>
  );
}
