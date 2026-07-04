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
      <View className="flex-row bg-black rounded-full items-center px-2 py-1.5">
        <Pressable
          onPress={() => onTabPress("map")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-full ${active === "map" ? "bg-white" : ""}`}
        >
          <Map size={14} color={active === "map" ? "black" : "#9ca3af"} />
          <Text className={`text-xs font-semibold ${active === "map" ? "text-black" : "text-gray-400"}`}>
            地図
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onTabPress("post")}
          className="w-12 h-12 bg-white rounded-full items-center justify-center mx-2"
        >
          <MapPin size={22} color="black" />
        </Pressable>

        <Pressable
          onPress={() => onTabPress("mypage")}
          className={`flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-full ${active === "mypage" ? "bg-white" : ""}`}
        >
          <User size={14} color={active === "mypage" ? "black" : "#9ca3af"} />
          <Text className={`text-xs font-semibold ${active === "mypage" ? "text-black" : "text-gray-400"}`}>
            マイページ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
