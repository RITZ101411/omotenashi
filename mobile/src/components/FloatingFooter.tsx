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
      <View className="flex-row bg-purple-950 rounded-full items-center px-2 py-1.5">
        <Pressable
          onPress={() => onTabPress("map")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-full ${active === "map" ? "bg-purple-500" : ""}`}
        >
          <Map size={14} color={active === "map" ? "white" : "#a78bfa"} />
          <Text className={`text-xs font-bold ${active === "map" ? "text-white" : "text-purple-300"}`}>
            地図
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onTabPress("post")}
          className="w-13 h-13 bg-purple-500 rounded-full items-center justify-center mx-2"
          style={{ width: 52, height: 52 }}
        >
          <MapPin size={22} color="white" />
        </Pressable>

        <Pressable
          onPress={() => onTabPress("mypage")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-full ${active === "mypage" ? "bg-purple-500" : ""}`}
        >
          <User size={14} color={active === "mypage" ? "white" : "#a78bfa"} />
          <Text className={`text-xs font-bold ${active === "mypage" ? "text-white" : "text-purple-300"}`}>
            マイページ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
