import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { X, Camera as CameraIcon, ImagePlus } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../providers/AuthProvider";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function PostDetailScreen() {
  const { lat, lng } = useLocalSearchParams<{ lat: string; lng: string }>();
  const { session } = useAuth();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [recommend, setRecommend] = useState("");

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled && res.assets?.[0]) setPhotoUri(res.assets[0].uri);
  };

  const pickFromLibrary = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled && res.assets?.[0]) setPhotoUri(res.assets[0].uri);
  };

  const submit = async () => {
    if (!session || !name) return;

    try {
      const res = await fetch(`${API_BASE_URL}/spots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          name,
          description: recommend || "裏スポット",
          photo_url: photoUri,
          lat: Number(lat),
          lng: Number(lng),
        }),
      });

      if (res.ok) {
        router.replace({
          pathname: "/post-complete",
          params: { photo: photoUri ?? "" },
        });
      }
    } catch (e) {
      console.error("Failed to create spot:", e);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingTop: 72 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* 写真（正方形の枠） */}
          <View className="w-full aspect-square rounded-2xl border border-black overflow-hidden bg-gray-50 items-center justify-center">
            {photoUri ? (
              <>
                <Image source={{ uri: photoUri }} className="w-full h-full" />
                <Pressable
                  onPress={pickFromLibrary}
                  className="absolute bottom-3 right-3 bg-white border border-black rounded-full px-3 py-1.5"
                >
                  <Text className="text-xs font-bold text-gray-900">変更</Text>
                </Pressable>
              </>
            ) : (
              <View className="flex-row gap-3 px-4">
                <Pressable
                  onPress={takePhoto}
                  className="flex-row items-center gap-1.5 h-11 px-4 rounded-full bg-purple-500 active:bg-purple-600"
                >
                  <CameraIcon size={18} color="white" />
                  <Text className="text-sm font-bold text-white">撮影する</Text>
                </Pressable>
                <Pressable
                  onPress={pickFromLibrary}
                  className="flex-row items-center gap-1.5 h-11 px-4 rounded-full bg-white border border-black active:bg-gray-100"
                >
                  <ImagePlus size={18} color="#111827" />
                  <Text className="text-sm font-bold text-gray-900">ライブラリ</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* スポット名 */}
          <Text className="text-sm font-bold text-gray-900 mt-6 mb-2">スポット名</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="例：裏路地の猫カフェ"
            placeholderTextColor="#9ca3af"
            className="border border-black rounded-xl px-4 h-12 text-base text-gray-900"
          />

          {/* おすすめポイント */}
          <Text className="text-sm font-bold text-gray-900 mt-5 mb-2">おすすめポイント</Text>
          <TextInput
            value={recommend}
            onChangeText={setRecommend}
            placeholder="この場所の魅力や、地元民ならではのポイントを書いてください"
            placeholderTextColor="#9ca3af"
            multiline
            style={{ minHeight: 180, textAlignVertical: "top" }}
            className="border border-black rounded-xl px-4 py-3 text-base text-gray-900"
          />
        </ScrollView>

        {/* 投稿バー（ピッカーの決定ボタンと同じ位置） */}
        <View className="bg-white border-t border-gray-200 px-5 pt-3 pb-8">
          <Pressable
            onPress={submit}
            className="h-14 rounded-full bg-purple-500 items-center justify-center active:bg-purple-600"
          >
            <Text className="text-base font-bold text-white">投稿する</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* 左上の閉じるボタン（白背景・黒アイコン・黒枠） */}
      <Pressable
        onPress={() => router.back()}
        className="absolute top-14 left-5 w-10 h-10 rounded-full bg-white border border-black items-center justify-center"
      >
        <X size={20} color="#111827" />
      </Pressable>
    </View>
  );
}
