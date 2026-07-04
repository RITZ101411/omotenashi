import { View, Image, Text } from "react-native";
import { Footprints } from "lucide-react-native";

type Props = {
  photo_url: string | null;
  name: string;
  state: "normal" | "in-range" | "visited";
};

export function SpotThumbnail({ photo_url, name, state }: Props) {
  const size = state === "in-range" ? "w-16 h-16" : "w-11 h-11";
  const borderColor = state === "in-range" ? "border-purple-400" : "border-white";

  return (
    <View className="items-center">
      <View className={`${size} rounded-2xl overflow-hidden bg-purple-100 border-[3px] ${borderColor}`}>
        <Image
          source={{ uri: photo_url ?? "https://placehold.co/80x80" }}
          className="w-full h-full"
        />
        {state === "visited" && (
          <View className="absolute inset-0 bg-purple-900/50 items-center justify-center">
            <Footprints size={18} color="white" />
          </View>
        )}
      </View>
      {state === "in-range" && (
        <View className="bg-purple-600 rounded-full px-2.5 py-1 mt-1.5">
          <Text className="text-[10px] text-white font-bold" numberOfLines={1}>{name}</Text>
        </View>
      )}
    </View>
  );
}
