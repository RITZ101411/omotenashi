import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function MapScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-lg font-bold">地図画面（仮）</Text>
      <Pressable
        onPress={() => router.push("/spot/camera")}
        className="bg-purple-500 rounded-full px-6 py-3"
      >
        <Text className="text-white font-bold">足あとを残す</Text>
      </Pressable>
    </View>
  );
}
