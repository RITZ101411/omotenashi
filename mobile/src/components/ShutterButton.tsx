import { View, Pressable } from "react-native";

type Props = {
  onPress: () => void;
};

export function ShutterButton({ onPress }: Props) {
  return (
    <View className="items-center py-8">
      <Pressable
        onPress={onPress}
        className="rounded-full border-4 border-white/60 items-center justify-center active:scale-95"
        style={{ width: 76, height: 76 }}
      >
        <View className="bg-white rounded-full" style={{ width: 60, height: 60 }} />
      </Pressable>
    </View>
  );
}
