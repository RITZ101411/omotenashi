import { View, Text, Pressable } from "react-native";
import { Map, MapPin, User } from "lucide-react-native";

type Tab = "map" | "post" | "mypage";

type Props = {
  active: Tab;
  onTabPress: (tab: Tab) => void;
};

export function FloatingFooter({ active, onTabPress }: Props) {
  return (
    <View className="absolute bottom-8 left-5 right-5 items-center">
      {/* ナビバー本体（後ろ） */}
      <View className="flex-row bg-purple-600 rounded-[28px] items-center px-1.5 py-1.5 w-full" style={{ zIndex: 1 }}>
        <Pressable
          onPress={() => onTabPress("map")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-[22px] ${active === "map" ? "bg-purple-500" : ""}`}
          style={{ height: 48 }}
        >
          <Map size={16} color={active === "map" ? "white" : "#c4b5fd"} />
          <Text className={`text-sm font-bold ${active === "map" ? "text-white" : "text-purple-200"}`}>
            地図
          </Text>
        </Pressable>

        {/* 中央の空きスペース */}
        <View style={{ width: 76 }} />

        <Pressable
          onPress={() => onTabPress("mypage")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-[22px] ${active === "mypage" ? "bg-purple-500" : ""}`}
          style={{ height: 48 }}
        >
          <User size={16} color={active === "mypage" ? "white" : "#c4b5fd"} />
          <Text className={`text-sm font-bold ${active === "mypage" ? "text-white" : "text-purple-200"}`}>
            マイページ
          </Text>
        </Pressable>
      </View>

      {/* 中央ボタン（前面に浮き出し） */}
      <View className="absolute -top-5 items-center justify-center" style={{ zIndex: 2 }}>
        <View className="bg-purple-600 rounded-full items-center justify-center" style={{ width: 72, height: 72 }}>
          <Pressable
            onPress={() => onTabPress("post")}
            className="bg-white rounded-full items-center justify-center"
            style={{ width: 60, height: 60 }}
          >
            <MapPin size={24} color="#7c3aed" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
