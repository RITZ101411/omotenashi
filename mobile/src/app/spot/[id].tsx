import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";
import { useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Footprints } from "lucide-react-native";
import { mockSpots } from "../../data/mock-spots";

const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 0.8;

export default function SpotDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const spot = mockSpots.find((s) => String(s.id) === id);

  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        g.dy > 6 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > DISMISS_DISTANCE || g.vy > DISMISS_VELOCITY) {
          router.back();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    })
  ).current;

  if (!spot) {
    return <Pressable className="flex-1" onPress={() => router.back()} />;
  }

  // TODO: 足あと数はモック値（本実装ではスタンプ数を集計する）
  const footprintCount = spot.id * 3 + 5;

  // TODO: 投稿者情報はモック（本実装ではspotに紐づくユーザーを参照）
  const author = {
    name: "地元たろう",
    title: "マスターガイド",
    avatar: `https://api.dicebear.com/9.x/avataaars/png?seed=spot${spot.id}`,
  };

  const startFootprint = () => {
    router.back();
    router.push("/spot/camera");
  };

  return (
    <View className="flex-1">
      <Pressable className="h-16" onPress={() => router.back()} />

      <Animated.View
        className="flex-1 bg-white rounded-t-3xl overflow-hidden"
        style={{ transform: [{ translateY }] }}
      >
        <View {...panResponder.panHandlers}>
          <View className="w-full aspect-square bg-gray-100">
            <Image
              source={{ uri: spot.photo_url ?? "https://placehold.co/400x400" }}
              className="w-full h-full"
            />
          </View>

          <View className="px-5 pt-4 pb-3">
            <Text className="text-2xl font-extrabold text-gray-900">{spot.name}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Footprints size={13} color="#111827" />
              <Text className="text-sm text-gray-900">{footprintCount}足あと</Text>
            </View>
          </View>
        </View>

        <View className="border-b border-black" />

        <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
          <Text className="text-sm text-gray-800 leading-6">{spot.description}</Text>
        </ScrollView>

        <View className="px-5 pb-8">
          <View className="flex-row items-center gap-3 rounded-2xl border border-black p-2.5">
            <View className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
              <Image source={{ uri: author.avatar }} className="w-full h-full" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
                投稿者：{author.name}
              </Text>
              {author.title ? (
                <Text className="text-xs text-gray-400" numberOfLines={1}>
                  {author.title}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        <View className="px-5 pb-8 pt-0">
          <Pressable
            onPress={startFootprint}
            className="h-14 rounded-full bg-purple-500 flex-row items-center justify-center gap-2 active:bg-purple-600"
          >
            <Footprints size={20} color="white" />
            <Text className="text-base font-bold text-white">足あとを残す</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}
