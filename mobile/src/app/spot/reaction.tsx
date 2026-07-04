import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ReactionPill } from "../../components/ReactionPill";
import { reactions } from "../../data/mock-spots";

export default function ReactionScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [selected, setSelected] = useState<number | null>(null);

  const handleConfirm = () => {
    router.push({
      pathname: "/spot/complete",
      params: {
        photoUri,
        reaction: selected !== null ? reactions[selected] : "",
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* ヘッダー */}
      <View className="flex-row items-center gap-3 px-5 pt-14 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
        >
          <ArrowLeft size={18} color="#111" />
        </Pressable>
        <Text className="text-lg font-bold">リアクション</Text>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* 撮影した写真プレビュー */}
        <View className="w-full aspect-square rounded-3xl overflow-hidden bg-gray-100 mb-6">
          {photoUri ? (
            <Image source={{ uri: photoUri }} className="w-full h-full" />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-400">写真プレビュー</Text>
            </View>
          )}
        </View>

        {/* リアクション選択 */}
        <Text className="text-base font-bold mb-3">どうだった？</Text>
        <View className="flex-row flex-wrap gap-2">
          {reactions.map((r, i) => (
            <ReactionPill
              key={r}
              label={r}
              selected={selected === i}
              onPress={() => setSelected(i)}
            />
          ))}
        </View>
      </ScrollView>

      {/* 確定ボタン */}
      <View className="px-5 pb-10 pt-4 border-t border-gray-100">
        <Pressable
          onPress={handleConfirm}
          className={`h-14 rounded-full items-center justify-center ${
            selected !== null ? "bg-purple-500" : "bg-gray-200"
          }`}
          disabled={selected === null}
        >
          <Text className={`text-base font-bold ${selected !== null ? "text-white" : "text-gray-400"}`}>
            確定する
          </Text>
        </Pressable>
        <Text className="text-xs text-gray-400 text-center mt-2">
          📬 投稿主に匿名で届きます
        </Text>
      </View>
    </View>
  );
}
