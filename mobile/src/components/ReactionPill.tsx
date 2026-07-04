import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function ReactionPill({ label, selected = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2.5 rounded-full ${
        selected ? "bg-purple-600" : "bg-purple-50 active:bg-purple-100"
      }`}
    >
      <Text className={`text-sm font-bold ${selected ? "text-white" : "text-purple-700"}`}>
        {label}
      </Text>
    </Pressable>
  );
}
