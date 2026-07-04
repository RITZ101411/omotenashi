import { View, Text, Pressable } from "react-native";
import { Map, MapPin, User } from "lucide-react-native";

type Tab = "map" | "post" | "mypage";

type Props = {
  active: Tab;
  onTabPress: (tab: Tab) => void;
};

export function FloatingFooter({ active, onTabPress }: Props) {
  return (
    <View className="absolute bottom-8 left-5 right-5">
      <View className="flex-row items-end justify-center">
        {/* 左タブ */}
        <View className="flex-1 bg-purple-600 rounded-l-[28px] rounded-r-[8px] px-2 py-2 mr-[-4px]">
          <Pressable
            onPress={() => onTabPress("map")}
            className={`flex-row items-center justify-center gap-1.5 rounded-[22px] ${active === "map" ? "bg-white" : ""}`}
            style={{ height: 48 }}
          >
            <Map size={16} color={active === "map" ? "#111" : "#c4b5fd"} />
            <Text className={`text-sm font-bold ${active === "map" ? "text-gray-900" : "text-purple-200"}`}>
              地図
            </Text>
          </Pressable>
        </View>

        {/* 中央ボタン（浮き出し） */}
        <Pressable
          onPress={() => onTabPress("post")}
          className={`rounded-full items-center justify-center -mt-4 mx-1 border-4 border-white ${active === "post" ? "bg-white" : "bg-purple-500"}`}
          style={{ width: 64, height: 64 }}
        >
          <MapPin size={24} color={active === "post" ? "#7c3aed" : "white"} />
        </Pressable>

        {/* 右タブ */}
        <View className="flex-1 bg-purple-600 rounded-r-[28px] rounded-l-[8px] px-2 py-2 ml-[-4px]">
          <Pressable
            onPress={() => onTabPress("mypage")}
            className={`flex-row items-center justify-center gap-1.5 rounded-[22px] ${active === "mypage" ? "bg-white" : ""}`}
            style={{ height: 48 }}
          >
            <User size={16} color={active === "mypage" ? "#111" : "#c4b5fd"} />
            <Text className={`text-sm font-bold ${active === "mypage" ? "text-gray-900" : "text-purple-200"}`}>
              マイページ
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
