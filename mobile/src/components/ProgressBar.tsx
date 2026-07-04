import { View, Text } from "react-native";

type Props = {
  percentage: number;
  label?: string;
  subtitle?: string;
};

export function ProgressBar({ percentage, label = "探索度", subtitle }: Props) {
  return (
    <View className="bg-purple-50 rounded-3xl p-5">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-bold text-purple-900">{label}</Text>
        <Text className="text-3xl font-black text-purple-600">{percentage}%</Text>
      </View>
      <View className="h-3 bg-purple-100 rounded-full overflow-hidden">
        <View
          className="h-full bg-purple-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
      {subtitle && (
        <Text className="text-xs text-purple-400 mt-2">{subtitle}</Text>
      )}
    </View>
  );
}
