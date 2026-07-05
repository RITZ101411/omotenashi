import { View } from "react-native";
import { Stack, usePathname, useRouter } from "expo-router";
import "../../global.css";
import { StatusBar } from "expo-status-bar";
import { FloatingFooter } from "../components/FloatingFooter";

const HIDE_FOOTER_ROUTES = ["/spot/camera", "/spot/reaction", "/spot/complete", "/components-demo"];

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const showFooter = !HIDE_FOOTER_ROUTES.includes(pathname) && !pathname.startsWith("/spot/");

  const activeTab = pathname === "/mypage" ? "mypage" : pathname === "/post" ? "post" : "map";

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="post" />
        <Stack.Screen name="mypage" />
        <Stack.Screen
          name="spot/[id]"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="spot/camera" options={{ animation: "slide_from_bottom", animationDuration: 200 }} />
        <Stack.Screen name="spot/reaction" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="spot/complete" options={{ animation: "none" }} />
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
