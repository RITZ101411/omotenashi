import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { Star, ChevronRight } from "lucide-react-native";
import { mockSpots } from "../data/mock-spots";
import { SpotCard } from "../components/SpotCard";
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

const myPosts = mockSpots.slice(0, 3);

export default function MypageScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-16" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* プロフィール */}
        <View className="flex-row items-center gap-4 mb-8">
          <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center">
            <Image
              source={{ uri: "https://placehold.co/128x128" }}
              className="w-full h-full rounded-full"
            />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Star size={12} color="black" fill="black" />
              <Text className="text-xs font-medium text-gray-600">{user.title}</Text>
            </View>
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
        <View className="flex-row gap-3 mb-8">
          {[
            { label: "投稿数", value: user.postCount },
            { label: "足あと", value: user.footprintCount },
            { label: "訪問地", value: user.visitCount },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-gray-50 rounded-2xl p-4 items-center">
              <Text className="text-2xl font-bold text-gray-900">{stat.value}</Text>
              <Text className="text-xs text-gray-500 mt-1">{stat.label}</Text>
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
