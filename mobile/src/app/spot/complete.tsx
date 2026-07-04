import { View, Text, Image } from "react-native";
import { useEffect, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Animated } from "react-native";
import { Footprints } from "lucide-react-native";

export default function CompleteScreen() {
  const { photoUri, reaction } = useLocalSearchParams<{
    photoUri: string;
    reaction: string;
  }>();

  const stampScale = useRef(new Animated.Value(3)).current;
  const stampOpacity = useRef(new Animated.Value(0)).current;
  const photoScale = useRef(new Animated.Value(1)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 写真が少し潰れる
    const squish = Animated.sequence([
      Animated.delay(300),
      Animated.timing(photoScale, {
        toValue: 0.92,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(photoScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    // 足あとが上から落ちてくる
    const stamp = Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(stampOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(stampScale, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
    ]);

    Animated.parallel([squish, stamp]).start();

    // 2秒後にフェードアウトして地図に戻る
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        router.dismissAll();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View className="flex-1 bg-white items-center justify-center px-8" style={{ opacity: screenOpacity }}>
      {/* 写真 + 足あとスタンプ */}
      <Animated.View style={{ transform: [{ scale: photoScale }] }}>
        <View className="w-72 h-72 rounded-3xl overflow-hidden bg-gray-100 relative">
          {photoUri ? (
            <Image source={{ uri: photoUri }} className="w-full h-full" />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-400">写真</Text>
            </View>
          )}
          {/* 足あとオーバーレイ */}
          <Animated.View
            className="absolute inset-0 items-center justify-center"
            style={{
              opacity: stampOpacity,
              transform: [{ scale: stampScale }, { rotate: "-15deg" }],
            }}
          >
            <View className="w-40 h-40 bg-black/60 rounded-full items-center justify-center">
              <Footprints size={80} color="white" />
            </View>
          </Animated.View>
        </View>
      </Animated.View>

      {/* テキスト */}
      <Text className="text-2xl font-black text-gray-900 mt-6 mb-2">足あとを残しました！</Text>
      {reaction ? (
        <View className="bg-purple-100 rounded-full px-4 py-2">
          <Text className="text-sm font-medium text-purple-700">{reaction}</Text>
        </View>
      ) : null}
    </Animated.View>
  );
}
