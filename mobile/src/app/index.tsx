import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

// メイン画面（地図）
export default function MapScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold mb-4">地図画面</Text>
      <Pressable
        onPress={() => router.push("/components-demo")}
        className="border-2 border-black rounded-full px-4 py-2 active:bg-gray-100"
      >
        <Text className="text-sm font-bold">コンポーネント一覧</Text>
      </Pressable>
    </View>
  );
}
