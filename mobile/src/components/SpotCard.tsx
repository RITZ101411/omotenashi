import { View, Image, Text, Pressable } from "react-native";
import { Spot } from "../data/mock-spots";

type Props = {
  spot: Spot;
  onPress?: () => void;
};

export function SpotCard({ spot, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 bg-gray-50 rounded-2xl p-3 active:bg-gray-100"
    >
      <Image
        source={{ uri: spot.photo_url ?? "https://placehold.co/80x80" }}
        className="w-12 h-12 rounded-xl bg-gray-200"
      />
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-900">{spot.name}</Text>
        <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>
          {spot.description}
        </Text>
      </View>
      <Text className="text-gray-300 text-lg">›</Text>
    </Pressable>
  );
}
