import { View, Pressable, Text, Alert } from "react-native";
import { Map, Camera, Marker } from "@maplibre/maplibre-react-native";
import { router } from "expo-router";
import { mockSpots } from "../data/mock-spots";
import { SpotThumbnail } from "../components/SpotThumbnail";
import * as Notifications from "expo-notifications";

const INITIAL_CENTER: [number, number] = [139.6991, 35.5312];
const INITIAL_ZOOM = 14;

export default function MapScreen() {

  // 通知を発火させる関数
  const triggerSpotNotification = async (spotName: string) => {
    console.log("ボタンが押されました！通知リクエスト開始:", spotName); // 👈 ログが出るか確認用

    const { status } = await Notifications.getPermissionsAsync();
    console.log("現在の通知権限ステータス:", status); // 👈 権限が取れているか確認用

    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      console.log("新しく要求したステータス:", newStatus);
      if (newStatus !== 'granted') {
        Alert.alert("通知エラー", "通知権限がありません！設定アプリから許可してください。");
        return; // 権限がない場合はここで処理を止める
      }
    }

    const triggerSpotNotification = async (spotName: string) => {
    // 1. 既存の通知をクリア
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 2. 通知チャンネルを「最高重要度」で強制作成・更新
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX, // 👈 これが重要！
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      enableVibrate: true,
      enableLights: true,
    });

    // 3. 通知スケジュール
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📍 近くに裏スポットを発見！",
        body: `「${spotName}」がすぐ近くにあります。覗いてみよう！`,
        sound: 'default', // 👈 音を鳴らす
        priority: Notifications.AndroidNotificationPriority.MAX, // 👈 これも重要！
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
      },
    });
    
    console.log("通知を最優先でスケジュールしました！");
  };

  return (
    <View className="flex-1">
      <Map style={{ flex: 1 }} mapStyle={"https://tiles.openfreemap.org/styles/bright"}>
        <Camera
          initialViewState={{ center: INITIAL_CENTER, zoom: INITIAL_ZOOM }}
        />
        {mockSpots.map((spot) => (
          <Marker
            key={spot.id}
            lngLat={[spot.lng, spot.lat]}
            onPress={() => router.push(`/spot/${spot.id}`)}
          >
            <SpotThumbnail photo_url={spot.photo_url} name={spot.name} state="normal" />
          </Marker>
        ))}
      </Map>

      {/* 👇 3. 動作確認用のテストボタン（コンポーネント一覧ボタンの下あたりに配置） */}
      <Pressable
        onPress={() => triggerSpotNotification("秘密の裏路地カフェ")}
        className="absolute top-32 right-5 bg-orange-500 rounded-full px-4 py-2 shadow active:bg-orange-600"
      >
        <Text className="text-sm font-medium text-white">🔥 [テスト] 接近通知</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/components-demo")}
        className="absolute top-16 right-5 bg-white rounded-full px-4 py-2 shadow active:bg-gray-100"
      >
        <Text className="text-sm font-medium text-gray-600">コンポーネント一覧</Text>
      </Pressable>
    </View>
  );
}
