import { View, Text } from "react-native";
import { router } from "expo-router";
import { FloatingFooter } from "../components/FloatingFooter";

export default function PostScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">投稿画面（ピン設置）</Text>

      <FloatingFooter
        active="post"
        onTabPress={(tab) => {
          if (tab === "map") router.replace("/");
          if (tab === "mypage") router.push("/mypage");
        }}
      />
    </View>
  );
}
