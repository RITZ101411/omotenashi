import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { mockSpots } from "../data/mock-spots";

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
      <ScrollView className="flex-1 px-4 pt-14">
        {/* プロフィール */}
        <View className="flex-row items-center gap-3 mb-6">
          <View className="w-14 h-14 bg-gray-200 rounded-full items-center justify-center border-2 border-black">
            <Text className="text-xl">👤</Text>
          </View>
          <View>
            <Text className="text-lg font-bold">{user.name}</Text>
            <View className="flex-row items-center gap-1 border border-black rounded-full px-2 py-0.5 self-start mt-1">
              <Text className="text-xs">⭐</Text>
              <Text className="text-xs font-bold">{user.title}</Text>
            </View>
          </View>
        </View>

        {/* 探索度 */}
        <View className="border-2 border-black rounded-2xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-bold">探索度</Text>
            <Text className="text-xl font-bold">{user.explorationRate}%</Text>
          </View>
          <View className="h-3 bg-gray-200 rounded-full border border-black overflow-hidden">
            <View
              className="h-full bg-black rounded-full"
              style={{ width: `${user.explorationRate}%` }}
            />
          </View>
          <Text className="text-xs text-gray-500 mt-1">次の称号まで：あと32%</Text>
        </View>

        {/* 統計 */}
        <View className="flex-row gap-2 mb-6">
          {[
            { label: "投稿数", value: user.postCount },
            { label: "足あと", value: user.footprintCount },
            { label: "訪問地", value: user.visitCount },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 border border-black rounded-xl p-3 items-center">
              <Text className="text-xl font-bold">{stat.value}</Text>
              <Text className="text-xs text-gray-500">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* 投稿したスポット */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-bold">投稿したスポット</Text>
            <Text className="text-xs text-gray-500">{myPosts.length}件</Text>
          </View>
          <View className="gap-2">
            {myPosts.map((spot) => (
              <Pressable
                key={spot.id}
                onPress={() => router.push(`/spot/${spot.id}`)}
                className="flex-row items-center gap-3 border border-black rounded-xl p-3 active:bg-gray-100"
              >
                <Image
                  source={{ uri: spot.photo_url ?? "https://placehold.co/80x80" }}
                  className="w-10 h-10 rounded-lg bg-gray-200"
                />
                <View className="flex-1">
                  <Text className="text-sm font-bold">{spot.name}</Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {spot.description}
                  </Text>
                </View>
                <Text className="text-gray-400">›</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
