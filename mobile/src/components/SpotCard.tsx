import { View, Image, Text, Pressable } from "react-native";
import { Spot } from "../data/mock-spots";

type Props = {
  spot: Spot;
  onPress?: () => void;
};

// スポット一覧のカード（マイページ、検索結果等で使用）
export function SpotCard({ spot, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 border border-black rounded-xl p-3 active:bg-gray-100"
    >
      <Image
        source={{ uri: spot.photo_url ?? "https://placehold.co/80x80" }}
        className="w-11 h-11 rounded-lg bg-gray-200"
      />
      <View className="flex-1">
        <Text className="text-sm font-bold">{spot.name}</Text>
        <Text className="text-xs text-gray-500" numberOfLines={1}>
          {spot.description}
        </Text>
      </View>
      <Text className="text-gray-400 text-lg">›</Text>
    </Pressable>
  );
}
