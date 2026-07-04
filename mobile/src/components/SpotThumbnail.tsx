import { View, Image, Text } from "react-native";

type Props = {
  photo_url: string | null;
  name: string;
  state: "normal" | "in-range" | "visited";
};

// 地図上に表示するスポットの正方形サムネイル
export function SpotThumbnail({ photo_url, name, state }: Props) {
  const size = state === "in-range" ? "w-12 h-12" : "w-9 h-9";
  const border = state === "in-range" ? "border-[3px]" : "border-2";

  return (
    <View className="items-center">
      <View className={`${size} ${border} border-black rounded-lg overflow-hidden bg-gray-200 relative`}>
        <Image
          source={{ uri: photo_url ?? "https://placehold.co/80x80" }}
          className="w-full h-full"
        />
        {state === "visited" && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <Text className="text-white text-xs">👣</Text>
          </View>
        )}
      </View>
      {state === "in-range" && (
        <Text className="text-[8px] font-bold mt-0.5" numberOfLines={1}>{name}</Text>
      )}
    </View>
  );
}
