import { View, ActivityIndicator } from "react-native";
import { Stack, usePathname, useRouter, Redirect } from "expo-router";
import "../../global.css";
import { StatusBar } from "expo-status-bar";
import { FloatingFooter } from "../components/FloatingFooter";
import { AuthProvider, useAuth } from "../providers/AuthProvider";

const HIDE_FOOTER_ROUTES = ["/post", "/post-detail", "/post-complete", "/spot/camera", "/spot/reaction", "/spot/complete", "/components-demo", "/auth", "/notifications", "/notification-detail"];

function RootLayoutInner() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session && pathname !== "/auth") {
    return <Redirect href="/auth" />;
  }

  if (session && pathname === "/auth") {
    return <Redirect href="/" />;
  }

  const showFooter = !HIDE_FOOTER_ROUTES.includes(pathname) && !pathname.startsWith("/spot/");
  const activeTab = pathname === "/mypage" ? "mypage" : pathname === "/post" ? "post" : "map";

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="index" />
        <Stack.Screen name="post" />
        <Stack.Screen name="post-detail" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="post-complete" />
        <Stack.Screen name="mypage" />
        <Stack.Screen
          name="spot/[id]"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="spot/camera" options={{ animation: "slide_from_bottom", animationDuration: 200 }} />
        <Stack.Screen name="spot/reaction" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="spot/complete" options={{ animation: "none" }} />
        <Stack.Screen name="notifications" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="components-demo" />
      </Stack>

      {showFooter && (
        <FloatingFooter
          active={activeTab}
          onTabPress={(tab) => {
            if (tab === "map") router.replace("/");
            if (tab === "post") router.replace("/post");
            if (tab === "mypage") router.replace("/mypage");
          }}
        />
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutInner />
    </AuthProvider>
  );
}
