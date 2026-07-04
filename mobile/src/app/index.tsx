import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { FloatingFooter } from "../components/FloatingFooter";

export default function MapScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold mb-4">地図画面</Text>
      <Pressable
        onPress={() => router.push("/components-demo")}
        className="bg-gray-100 rounded-full px-4 py-2 active:bg-gray-200"
      >
        <Text className="text-sm font-medium text-gray-600">コンポーネント一覧</Text>
      </Pressable>

      <FloatingFooter
        active="map"
        onTabPress={(tab) => {
          if (tab === "post") router.push("/post");
          if (tab === "mypage") router.push("/mypage");
        }}
      />
    </View>
  );
}
