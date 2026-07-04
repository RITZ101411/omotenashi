import { View, Text, Image, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Footprints } from "lucide-react-native";

export default function CompleteScreen() {
  const { photoUri, reaction } = useLocalSearchParams<{
    photoUri: string;
    reaction: string;
  }>();

  return (
    <View className="flex-1 bg-white items-center justify-center px-8">
      {/* 写真 + 足あとスタンプ */}
      <View className="w-52 h-52 rounded-3xl overflow-hidden bg-gray-100 mb-6 relative">
        {photoUri ? (
          <Image source={{ uri: photoUri }} className="w-full h-full" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400">写真</Text>
          </View>
        )}
        {/* 足あとオーバーレイ */}
        <View className="absolute inset-0 items-center justify-center">
          <View className="w-16 h-16 bg-black/60 rounded-full items-center justify-center rotate-[-15deg]">
            <Footprints size={28} color="white" />
          </View>
        </View>
      </View>

      {/* テキスト */}
      <Text className="text-2xl font-black text-gray-900 mb-2">足あとを残しました！</Text>
      {reaction ? (
        <View className="bg-purple-100 rounded-full px-4 py-2 mb-8">
          <Text className="text-sm font-medium text-purple-700">{reaction}</Text>
        </View>
      ) : null}

      {/* 地図に戻るボタン */}
      <Pressable
        onPress={() => router.dismissAll()}
        className="w-full h-14 bg-gray-900 rounded-full items-center justify-center"
      >
        <Text className="text-white text-base font-bold">地図に戻る</Text>
      </Pressable>
    </View>
  );
}
