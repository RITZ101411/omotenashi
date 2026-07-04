import { View, Text, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { Star } from "lucide-react-native";
import { ProgressBar } from "../components/ProgressBar";
import { FloatingFooter } from "../components/FloatingFooter";

const user = {
  name: "地元たろう",
  title: "マスターガイド",
  explorationRate: 68,
  postCount: 12,
  footprintCount: 48,
  visitCount: 7,
};

export default function MypageScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-16" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* プロフィール */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200 mb-3">
            <Image
              source={{ uri: "https://placehold.co/160x160" }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-2xl font-black text-gray-900">{user.name}</Text>
          <View className="flex-row items-center gap-1 bg-purple-100 rounded-full px-3 py-1 mt-2">
            <Star size={12} color="#7c3aed" fill="#7c3aed" />
            <Text className="text-xs font-bold text-purple-700">{user.title}</Text>
          </View>
        </View>

        {/* 探索度 */}
        <View className="mb-6">
          <ProgressBar
            percentage={user.explorationRate}
            subtitle="次の称号まで：あと32%"
          />
        </View>

        {/* 統計 */}
        <View className="flex-row gap-3">
          {[
            { label: "投稿数", value: user.postCount },
            { label: "足あと", value: user.footprintCount },
            { label: "訪問地", value: user.visitCount },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-purple-50 rounded-3xl p-4 items-center">
              <Text className="text-2xl font-black text-purple-600">{stat.value}</Text>
              <Text className="text-xs font-medium text-purple-400 mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <FloatingFooter
        active="mypage"
        onTabPress={(tab) => {
          if (tab === "map") router.replace("/");
          if (tab === "post") router.push("/post");
        }}
      />
    </View>
  );
}
