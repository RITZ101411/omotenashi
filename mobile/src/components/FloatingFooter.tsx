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
          className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-[22px] ${active === "map" ? "bg-purple-500" : ""}`}
          style={{ height: 48 }}
        >
          <Map size={16} color={active === "map" ? "white" : "#c4b5fd"} />
          <Text className={`text-sm font-bold ${active === "map" ? "text-white" : "text-purple-200"}`}>
            地図
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onTabPress("post")}
          className={`rounded-full items-center justify-center mx-2 -mt-8 border-[6px] border-purple-600 bg-white`}
          style={{ width: 60, height: 60 }}
        >
          <MapPin size={24} color="#7c3aed" />
        </Pressable>

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
    </View>
  );
}
