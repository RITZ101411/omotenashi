import { View, Image, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Footprints } from "lucide-react-native";

type Props = {
  photo_url: string | null;
  name: string;
  state: "normal" | "in-range" | "visited";
};

export function SpotThumbnail({ photo_url, name, state }: Props) {
  const size = state === "in-range" ? "w-16 h-16" : "w-11 h-11";
  const borderColor = state === "in-range" ? "border-purple-400" : "border-white";

  // 圏内のときだけ画面の縦方向に揺らす（マーカーは画面固定なので地図の回転に依らず縦）
  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (state !== "in-range") {
      translateY.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: -6, duration: 220, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [state, translateY]);

  return (
    <View className="items-center">
      <Animated.View
        style={{ transform: [{ translateY }] }}
        className={`${size} rounded-2xl overflow-hidden bg-gray-100 border-[3px] ${borderColor}`}
      >
        <Image
          source={{ uri: photo_url ?? "https://placehold.co/80x80" }}
          className="w-full h-full"
        />
        {state === "visited" && (
          <View className="absolute inset-0 bg-black/40 items-center justify-center">
            <Footprints size={18} color="white" />
          </View>
        )}
      </Animated.View>
      {state === "in-range" && (
        <View className="bg-purple-600 rounded-full px-2.5 py-1 mt-1.5">
          <Text className="text-[10px] text-white font-bold" numberOfLines={1}>{name}</Text>
        </View>
      )}
    </View>
  );
}
