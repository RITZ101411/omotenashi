import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { SpotThumbnail } from "../components/SpotThumbnail";
import { SpotCard } from "../components/SpotCard";
import { ReactionPill } from "../components/ReactionPill";
import { ProgressBar } from "../components/ProgressBar";
import { ShutterButton } from "../components/ShutterButton";
import { FloatingFooter } from "../components/FloatingFooter";
import { mockSpots, reactions } from "../data/mock-spots";

export default function ComponentsDemo() {
  const [selectedReaction, setSelectedReaction] = useState(1);
  const [activeTab, setActiveTab] = useState<"map" | "post" | "mypage">("map");

  return (
    <ScrollView className="flex-1 bg-white pt-14 px-4">
      <Text className="text-xl font-bold mb-6">コンポーネント一覧</Text>

      <Section title="SpotThumbnail">
        <View className="flex-row gap-4 items-end">
          <View className="items-center">
            <SpotThumbnail photo_url={mockSpots[0].photo_url} name={mockSpots[0].name} state="normal" />
            <Text className="text-[10px] text-gray-400 mt-1">通常</Text>
          </View>
          <View className="items-center">
            <SpotThumbnail photo_url={mockSpots[1].photo_url} name={mockSpots[1].name} state="in-range" />
            <Text className="text-[10px] text-gray-400 mt-1">範囲内</Text>
          </View>
          <View className="items-center">
            <SpotThumbnail photo_url={mockSpots[2].photo_url} name={mockSpots[2].name} state="visited" />
            <Text className="text-[10px] text-gray-400 mt-1">足あと済</Text>
          </View>
        </View>
      </Section>

      <Section title="SpotCard">
        <View className="gap-2">
          <SpotCard spot={mockSpots[0]} onPress={() => {}} />
          <SpotCard spot={mockSpots[1]} onPress={() => {}} />
        </View>
      </Section>

      <Section title="ReactionPill">
        <View className="flex-row flex-wrap gap-2">
          {reactions.map((r, i) => (
            <ReactionPill
              key={r}
              label={r}
              selected={i === selectedReaction}
              onPress={() => setSelectedReaction(i)}
            />
          ))}
        </View>
      </Section>

      <Section title="ProgressBar">
        <ProgressBar percentage={68} subtitle="次の称号まで：あと32%" />
      </Section>

      <Section title="ShutterButton">
        <View className="bg-black rounded-xl py-2">
          <ShutterButton onPress={() => {}} />
        </View>
      </Section>

      <Section title="FloatingFooter">
        <View className="h-24 bg-gray-100 rounded-xl relative overflow-hidden">
          <FloatingFooter active={activeTab} onTabPress={setActiveTab} />
        </View>
      </Section>

      <View className="h-20" />
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-6 border border-gray-200 rounded-xl p-4">
      <Text className="text-sm font-bold text-gray-500 mb-3">{title}</Text>
      {children}
    </View>
  );
}
