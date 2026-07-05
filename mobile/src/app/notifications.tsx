import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect, router } from "expo-router";
import { ArrowLeft, Footprints, MessageCircle } from "lucide-react-native";
import { useAuth } from "../providers/AuthProvider";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8000";

type Notification = {
  id: number;
  type: "stamp" | "reaction";
  message: string;
  spot_id: number;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsScreen() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [session])
  );

  async function fetchNotifications() {
    if (!session) return;

    try {
      const res = await fetch(`${API_BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (e) {
      console.error("Failed to fetch notifications:", e);
    } finally {
      setLoading(false);
    }
  }

  function getIcon(type: string) {
    switch (type) {
      case "stamp":
        return <Footprints size={20} color="#7c3aed" />;
      case "reaction":
        return <MessageCircle size={20} color="#7c3aed" />;
      default:
        return <Footprints size={20} color="#7c3aed" />;
    }
  }

  function timeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return "たった今";
    if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
    return `${Math.floor(diff / 86400)}日前`;
  }

  function renderItem({ item }: { item: Notification }) {
    return (
      <TouchableOpacity
        className={`flex-row items-center gap-3 px-5 py-4 border-b border-gray-100 ${!item.is_read ? "bg-purple-50" : ""}`}
        onPress={() => router.push(`/spot/${item.spot_id}`)}
        activeOpacity={0.7}
      >
        <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
          {getIcon(item.type)}
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-900 font-medium">{item.message}</Text>
          <Text className="text-xs text-gray-400 mt-1">{timeAgo(item.created_at)}</Text>
        </View>
        {!item.is_read && <View className="w-2 h-2 bg-purple-500 rounded-full" />}
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* ヘッダー */}
      <View className="flex-row items-center px-5 pt-16 pb-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-gray-900">通知</Text>
      </View>

      {/* 通知リスト */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">読み込み中...</Text>
        </View>
      ) : notifications.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
            <Footprints size={32} color="#9ca3af" />
          </View>
          <Text className="text-base font-bold text-gray-400">通知はまだありません</Text>
          <Text className="text-sm text-gray-300 mt-1 text-center">
            あなたのスポットに誰かが足あとを残すとここに届きます
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}
    </View>
  );
}
