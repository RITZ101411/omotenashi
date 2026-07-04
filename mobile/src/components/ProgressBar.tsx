import { View, Text } from "react-native";

type Props = {
  percentage: number;
  label?: string;
  subtitle?: string;
};

export function ProgressBar({ percentage, label = "探索度", subtitle }: Props) {
  return (
    <View className="bg-gray-50 rounded-3xl p-5">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-bold text-gray-600">{label}</Text>
        <Text className="text-3xl font-black text-gray-900">{percentage}%</Text>
      </View>
      <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-purple-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
      {subtitle && (
        <Text className="text-xs text-gray-400 mt-2">{subtitle}</Text>
      )}
    </View>
  );
}
