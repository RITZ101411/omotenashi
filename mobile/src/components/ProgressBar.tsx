import { View, Text } from "react-native";

type Props = {
  percentage: number;
  label?: string;
  subtitle?: string;
};

// 探索度プログレスバー
export function ProgressBar({ percentage, label = "探索度", subtitle }: Props) {
  return (
    <View className="border-2 border-black rounded-2xl p-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm font-bold">{label}</Text>
        <Text className="text-xl font-bold">{percentage}%</Text>
      </View>
      <View className="h-3 bg-gray-200 rounded-full border border-black overflow-hidden">
        <View
          className="h-full bg-black rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
      {subtitle && (
        <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
      )}
    </View>
  );
}
