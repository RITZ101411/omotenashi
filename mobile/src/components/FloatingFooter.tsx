import { View, Text, Pressable } from "react-native";

type Tab = "map" | "post" | "mypage";

type Props = {
  active: Tab;
  onTabPress: (tab: Tab) => void;
};

// 全画面共通のフローティングフッターナビ
export function FloatingFooter({ active, onTabPress }: Props) {
  return (
    <View className="absolute bottom-6 left-4 right-4">
      <View className="flex-row bg-white border-2 border-black rounded-full shadow-lg items-center px-2 py-1.5">
        {/* 地図タブ */}
        <Pressable
          onPress={() => onTabPress("map")}
          className={`flex-1 items-center py-2 rounded-full ${active === "map" ? "bg-black" : ""}`}
        >
          <Text className={`text-xs font-bold ${active === "map" ? "text-white" : "text-black"}`}>
            地図
          </Text>
        </Pressable>

        {/* 投稿ボタン（中央） */}
        <Pressable
          onPress={() => onTabPress("post")}
          className="w-12 h-12 bg-black rounded-full items-center justify-center mx-2"
        >
          <Text className="text-white text-xl font-bold">+</Text>
        </Pressable>

        {/* マイページタブ */}
        <Pressable
          onPress={() => onTabPress("mypage")}
          className={`flex-1 items-center py-2 rounded-full ${active === "mypage" ? "bg-black" : ""}`}
        >
          <Text className={`text-xs font-bold ${active === "mypage" ? "text-white" : "text-black"}`}>
            マイページ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
