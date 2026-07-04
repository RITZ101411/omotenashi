import { View, Image, Text } from "react-native";

type Props = {
  photo_url: string | null;
  name: string;
  state: "normal" | "in-range" | "visited";
};

export function SpotThumbnail({ photo_url, name, state }: Props) {
  const size = state === "in-range" ? "w-14 h-14" : "w-10 h-10";
  const shadow = state === "in-range" ? "shadow-lg" : "shadow-md";

  return (
    <View className="items-center">
      <View className={`${size} ${shadow} rounded-xl overflow-hidden bg-gray-100`}>
        <Image
          source={{ uri: photo_url ?? "https://placehold.co/80x80" }}
          className="w-full h-full"
        />
        {state === "visited" && (
          <View className="absolute inset-0 bg-black/40 items-center justify-center rounded-xl">
            <Text className="text-white text-sm">👣</Text>
          </View>
        )}
      </View>
      {state === "in-range" && (
        <View className="bg-black/80 rounded-full px-2 py-0.5 mt-1">
          <Text className="text-[9px] text-white font-medium" numberOfLines={1}>{name}</Text>
        </View>
      )}
    </View>
  );
}
