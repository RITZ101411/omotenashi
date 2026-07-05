import { View, Text, Image, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function PostCompleteScreen() {
  const { photo } = useLocalSearchParams<{ photo: string }>();

  return (
    <View className="flex-1 bg-white items-center justify-center px-8">
      {/* 投稿した画像（端を丸める）。中央よりやや上に来るよう、下にボタン等を積む */}
      <View className="w-56 h-56 rounded-3xl overflow-hidden bg-gray-100">
        <Image
          source={{ uri: photo || "https://placehold.co/400x400" }}
          className="w-full h-full"
        />
      </View>

      <Text className="text-2xl font-extrabold text-gray-900 mt-8">投稿しました</Text>
      <Text className="text-sm text-gray-400 mt-2">裏スポットが地図に追加されました</Text>

      <Pressable
        onPress={() => router.replace("/")}
        className="mt-10 h-14 px-12 rounded-full bg-purple-500 items-center justify-center active:bg-purple-600"
      >
        <Text className="text-base font-bold text-white">地図に戻る</Text>
      </Pressable>
    </View>
  );
}
