import { View, Text, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Star, LogOut } from "lucide-react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { ProgressBar } from "../components/ProgressBar";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8000";

type UserData = {
  id: string;
  display_name: string;
  avatar_url: string | null;
  exploration_rate: number;
  stamped_count: number;
  total_spots: number;
  post_count: number;
};

function getTitle(explorationRate: number): string {
  if (explorationRate >= 80) return "マスターガイド";
  if (explorationRate >= 50) return "ベテラン探索者";
  if (explorationRate >= 20) return "街歩きルーキー";
  return "はじめての一歩";
}

export default function MypageScreen() {
  const { session } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [session])
  );

  async function fetchUser() {
    if (!session) return;

    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (e) {
      console.error("Failed to fetch user:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    Alert.alert("ログアウト", "ログアウトしますか？", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "ログアウト",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const explorationRate = user?.exploration_rate ?? 0;
  const title = getTitle(explorationRate);
  const nextThreshold = explorationRate >= 80 ? 100 : explorationRate >= 50 ? 80 : explorationRate >= 20 ? 50 : 20;
  const remaining = nextThreshold - Math.floor(explorationRate);

  return (
    <View className="flex-1 bg-white">
      {/* 固定ヘッダー: プロフィール */}
      <View className="px-5 pt-24 pb-6 items-center">
        <TouchableOpacity
          className="absolute top-14 right-5 p-2"
          onPress={handleLogout}
        >
          <LogOut size={22} color="#6b7280" />
        </TouchableOpacity>

        <View className="w-20 h-20 rounded-full overflow-hidden border-3 border-gray-100 mb-3">
          <Image
            source={{
              uri: user?.avatar_url || `https://api.dicebear.com/9.x/avataaars/png?seed=${user?.id || "default"}`,
            }}
            className="w-full h-full"
          />
        </View>
        <Text className="text-2xl font-black text-gray-900">{user?.display_name ?? "---"}</Text>
        <View className="flex-row items-center gap-1 bg-purple-100 rounded-full px-3 py-1 mt-2">
          <Star size={12} color="#7c3aed" fill="#7c3aed" />
          <Text className="text-xs font-bold text-purple-700">{title}</Text>
        </View>
      </View>

      {/* スクロール部分 */}
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* 探索度 */}
        <View className="mb-6">
          <ProgressBar
            percentage={Math.floor(explorationRate)}
            subtitle={`次の称号まで：あと${remaining}%`}
          />
        </View>

        {/* 統計 */}
        <View className="flex-row gap-3">
          {[
            { label: "投稿数", value: user?.post_count ?? 0 },
            { label: "足あと", value: user?.stamped_count ?? 0 },
            { label: "スポット", value: user?.total_spots ?? 0 },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-gray-50 rounded-3xl p-4 items-center">
              <Text className="text-2xl font-black text-gray-900">{stat.value}</Text>
              <Text className="text-xs font-medium text-gray-400 mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
