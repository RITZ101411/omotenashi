import { View, Text, Pressable } from "react-native";
import { Map, Plus, User } from "lucide-react-native";

type Tab = "map" | "post" | "mypage";

type Props = {
  active: Tab;
  onTabPress: (tab: Tab) => void;
};

export function FloatingFooter({ active, onTabPress }: Props) {
  return (
    <View className="absolute bottom-8 left-5 right-5">
      <View className="flex-row bg-white/95 backdrop-blur-lg rounded-full shadow-xl items-center px-3 py-2">
        <Pressable
          onPress={() => onTabPress("map")}
          className={`flex-1 flex-row items-center justify-center gap-1 py-2.5 rounded-full ${active === "map" ? "bg-black" : ""}`}
        >
          <Map size={14} color={active === "map" ? "white" : "#6b7280"} />
          <Text className={`text-xs font-semibold ${active === "map" ? "text-white" : "text-gray-500"}`}>
            地図
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onTabPress("post")}
          className="w-14 h-14 bg-black rounded-full items-center justify-center mx-3 shadow-lg"
        >
          <Plus size={24} color="white" />
        </Pressable>

        <Pressable
          onPress={() => onTabPress("mypage")}
          className={`flex-1 flex-row items-center justify-center gap-1 py-2.5 rounded-full ${active === "mypage" ? "bg-black" : ""}`}
        >
          <User size={14} color={active === "mypage" ? "white" : "#6b7280"} />
          <Text className={`text-xs font-semibold ${active === "mypage" ? "text-white" : "text-gray-500"}`}>
            マイページ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
