import { View, Image, Text, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Spot } from "../data/mock-spots";

type Props = {
  spot: Spot;
  onPress?: () => void;
};

export function SpotCard({ spot, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 bg-purple-50 rounded-3xl p-4 active:bg-purple-100"
    >
      <Image
        source={{ uri: spot.photo_url ?? "https://placehold.co/80x80" }}
        className="w-13 h-13 rounded-2xl bg-purple-100"
        style={{ width: 52, height: 52 }}
      />
      <View className="flex-1">
        <Text className="text-sm font-bold text-gray-900">{spot.name}</Text>
        <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>
          {spot.description}
        </Text>
      </View>
      <ChevronRight size={18} color="#a855f7" />
    </Pressable>
  );
}
