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
      <View className="flex-row bg-purple-600 rounded-[28px] items-center px-2 py-2">
        <Pressable
          onPress={() => onTabPress("map")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-[22px] ${active === "map" ? "bg-white" : ""}`}
          style={{ height: 48 }}
        >
          <Map size={16} color={active === "map" ? "#111" : "#c4b5fd"} />
          <Text className={`text-sm font-bold ${active === "map" ? "text-gray-900" : "text-purple-200"}`}>
            地図
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onTabPress("post")}
          className="bg-white rounded-[22px] items-center justify-center mx-2"
          style={{ width: 48, height: 48 }}
        >
          <MapPin size={20} color="#7c3aed" />
        </Pressable>

        <Pressable
          onPress={() => onTabPress("mypage")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-[22px] ${active === "mypage" ? "bg-white" : ""}`}
          style={{ height: 48 }}
        >
          <User size={16} color={active === "mypage" ? "#111" : "#c4b5fd"} />
          <Text className={`text-sm font-bold ${active === "mypage" ? "text-gray-900" : "text-purple-200"}`}>
            マイページ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
