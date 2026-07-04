import { View, Text } from "react-native";

type Props = {
  percentage: number;
  label?: string;
  subtitle?: string;
};

export function ProgressBar({ percentage, label = "探索度", subtitle }: Props) {
  return (
    <View className="bg-gray-50 rounded-2xl p-5">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-medium text-gray-600">{label}</Text>
        <Text className="text-2xl font-bold text-gray-900">{percentage}%</Text>
      </View>
      <View className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-black rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
      {subtitle && (
        <Text className="text-xs text-gray-400 mt-2">{subtitle}</Text>
      )}
    </View>
  );
}
