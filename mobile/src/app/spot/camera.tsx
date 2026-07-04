import { View, Text, Pressable } from "react-native";
import { useState, useRef } from "react";
import { router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { X } from "lucide-react-native";
import { ShutterButton } from "../../components/ShutterButton";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturing, setCapturing] = useState(false);

  const takePicture = async () => {
    if (!cameraRef.current || capturing) return;
    setCapturing(true);

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
      base64: false,
    });

    setCapturing(false);

    if (photo) {
      router.push({
        pathname: "/spot/reaction",
        params: { photoUri: photo.uri },
      });
    }
  };

  if (!permission) return <View className="flex-1 bg-black" />;

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-8">
        <Text className="text-white text-center text-base mb-4">
          スポットの写真を撮るためにカメラへのアクセスが必要です
        </Text>
        <Pressable
          onPress={requestPermission}
          className="bg-purple-500 rounded-full px-6 py-3"
        >
          <Text className="text-white font-bold">カメラを許可する</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* カメラプレビュー */}
      <View className="flex-1 overflow-hidden">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
        />

        {/* 正方形フレームオーバーレイ */}
        <View className="absolute inset-0 items-center justify-center">
          <View className="w-72 h-72 border-2 border-white/50 rounded-2xl" />
        </View>

        {/* 閉じるボタン */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-14 left-5 w-10 h-10 bg-black/40 rounded-full items-center justify-center"
        >
          <X size={20} color="white" />
        </Pressable>

        {/* ヒントテキスト */}
        <View className="absolute bottom-28 left-0 right-0 items-center">
          <Text className="text-white/70 text-sm">スポットの写真を撮影</Text>
        </View>
      </View>

      {/* シャッターボタン */}
      <ShutterButton onPress={takePicture} />
    </View>
  );
}
