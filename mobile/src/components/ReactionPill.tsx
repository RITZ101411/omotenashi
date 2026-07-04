import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

// リアクション選択のタグUI
export function ReactionPill({ label, selected = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-3 py-1.5 border-2 border-black rounded-full ${
        selected ? "bg-black" : "bg-white active:bg-gray-100"
      }`}
    >
      <Text className={`text-xs font-medium ${selected ? "text-white" : "text-black"}`}>
        {label}
      </Text>
    </Pressable>
  );
}
