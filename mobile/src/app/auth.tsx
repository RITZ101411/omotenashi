import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Footprints } from "lucide-react-native";
import { supabase } from "../lib/supabase";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert("ログインエラー", error.message);
  }

  async function handleSignUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert("登録エラー", error.message);
    } else {
      Alert.alert("登録完了", "アカウントが作成されました。");
    }
  }

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      {/* ロゴ */}
      <View className="items-center mb-10">
        <View className="w-20 h-20 bg-purple-100 rounded-full items-center justify-center mb-4">
          <Footprints size={40} color="#7c3aed" />
        </View>
        <Text className="text-3xl font-black text-gray-900">表無し</Text>
        <Text className="text-sm text-gray-400 mt-1">裏スポットを歩こう</Text>
      </View>

      {/* 入力フォーム */}
      <View className="gap-4 mb-6">
        <TextInput
          className="bg-gray-50 rounded-2xl px-5 py-4 text-base text-gray-900"
          placeholder="メールアドレス"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          className="bg-gray-50 rounded-2xl px-5 py-4 text-base text-gray-900"
          placeholder="パスワード"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
        />
      </View>

      {/* メインボタン */}
      <TouchableOpacity
        className="bg-gray-900 rounded-3xl py-4 mb-4"
        onPress={isSignUp ? handleSignUp : handleSignIn}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-black text-base">
            {isSignUp ? "アカウント作成" : "ログイン"}
          </Text>
        )}
      </TouchableOpacity>

      {/* 切り替え */}
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} activeOpacity={0.6}>
        <Text className="text-center text-sm text-gray-400">
          {isSignUp ? "アカウントをお持ちの方は" : "アカウントをお持ちでない方は"}
          <Text className="text-purple-600 font-bold">
            {isSignUp ? " ログイン" : " 新規登録"}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
