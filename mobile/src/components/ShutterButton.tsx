import { View, Pressable } from "react-native";

type Props = {
  onPress: () => void;
};

export function ShutterButton({ onPress }: Props) {
  return (
    <View className="items-center py-8">
      <Pressable
        onPress={onPress}
        className="w-18 h-18 rounded-full border-4 border-white/80 items-center justify-center active:scale-95"
        style={{ width: 72, height: 72 }}
      >
        <View className="w-14 h-14 bg-white rounded-full" style={{ width: 56, height: 56 }} />
      </Pressable>
    </View>
  );
}
