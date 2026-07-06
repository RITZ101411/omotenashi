import { View, Text, Image, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Footprints } from "lucide-react-native";

export default function NotificationDetailScreen() {
  const { message, photo_url, reaction, spot_id, created_at } = useLocalSearchParams<{
    message: string;
    photo_url: string;
    reaction: string;
    spot_id: string;
    created_at: string;
  }>();

  return (
    <View className="flex-1 bg-white">
      {/* ヘッダー */}
      <View className="flex-row items-center px-5 pt-16 pb-4 border-b border-gray-100">
        <Pressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#111827" />
        </Pressable>
        <Text className="text-xl font-black text-gray-900">通知詳細</Text>
      </View>

      <View className="flex-1 px-5 pt-6">
        {/* メッセージ */}
        <View className="flex-row items-center gap-3 mb-6">
          <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
            <Footprints size={24} color="#7c3aed" />
          </View>
          <View className="flex-1">
            <Text className="text-base text-gray-900 font-medium">{message}</Text>
          </View>
        </View>

        {/* リアクション */}
        {reaction ? (
          <View className="bg-purple-50 rounded-2xl px-4 py-3 mb-4">
            <Text className="text-sm text-purple-700 font-bold">{reaction}</Text>
          </View>
        ) : null}

        {/* 写真 */}
        {photo_url ? (
          <View className="w-full aspect-square rounded-3xl overflow-hidden bg-gray-100">
            <Image source={{ uri: photo_url }} className="w-full h-full" />
          </View>
        ) : null}

        {/* スポットを見るボタン */}
        <Pressable
          onPress={() => router.push(`/spot/${spot_id}`)}
          className="mt-6 h-14 rounded-full bg-gray-900 items-center justify-center"
        >
          <Text className="text-base font-bold text-white">スポットを見る</Text>
        </Pressable>
      </View>
    </View>
  );
}
