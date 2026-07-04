import { Stack } from "expo-router";
import "../../global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="post" />
        <Stack.Screen name="mypage" />
        <Stack.Screen name="spot/[id]" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="spot/camera" options={{ presentation: "fullScreenModal" }} />
        <Stack.Screen name="spot/reaction" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="spot/complete" options={{ animation: "fade" }} />
        <Stack.Screen name="components-demo" />
      </Stack>
    </React.Fragment>
  );
}
