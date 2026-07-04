import { View, Pressable } from "react-native";

type Props = {
  onPress: () => void;
};

// カメラ画面のシャッターボタン
export function ShutterButton({ onPress }: Props) {
  return (
    <View className="items-center py-6">
      <Pressable
        onPress={onPress}
        className="w-16 h-16 rounded-full border-4 border-white items-center justify-center active:scale-95"
      >
        <View className="w-12 h-12 bg-white rounded-full" />
      </Pressable>
    </View>
  );
}
