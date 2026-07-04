import { Tabs } from "expo-router";
import React from "react";
import "../../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{ title: "地図" }}
        />
        <Tabs.Screen
          name="post"
          options={{ title: "投稿" }}
        />
        <Tabs.Screen
          name="mypage"
          options={{ title: "マイページ" }}
        />
        <Tabs.Screen
          name="spot/[id]"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="spot/camera"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="spot/reaction"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="spot/complete"
          options={{ href: null }}
        />
      </Tabs>
    </React.Fragment>
  );
}
