import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

// スポット詳細画面
export default function SpotDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>スポット詳細 (ID: {id})</Text>
    </View>
  );
}
