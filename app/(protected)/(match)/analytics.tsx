import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loading from "@/components/Reuseables/Loading";
import ScoreCard from "@/components/Analytics/ScoreCard";
import StatsTab from "@/components/Analytics/StatsTab";
import LineupsTab from "@/components/Analytics/LineupsTab";
import TimelineTab from "@/components/Analytics/TimelineTab";
import { A } from "@/components/Analytics/theme";
import { useMatchAnalytics } from "@/hooks/useMatchAnalytics";

const TABS = ["Stats", "Lineups", "Timeline"] as const;
type Tab = (typeof TABS)[number];

const MatchAnalytics = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending } = useMatchAnalytics(String(id ?? ""));
  const [tab, setTab] = useState<Tab>("Stats");

  return (
    <View style={{ flex: 1, backgroundColor: A.screen }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 14,
          paddingTop: insets.top + 8,
          backgroundColor: "#1F5079",
        }}
      >
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <FontAwesome6 name="angle-left" size={22} color="white" />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center", marginRight: 22 }}>
          <Text style={{ color: A.muted, fontSize: 10, textTransform: "uppercase" }}>
            {data?.league ?? ""}
          </Text>
          <Text style={{ color: A.text, fontSize: 14, fontWeight: "600" }}>
            {data ? `${data.home.name} vs ${data.away.name}` : "Match analytics"}
          </Text>
        </View>
      </View>

      {isPending ? (
        <View style={{ paddingVertical: 60 }}>
          <Loading inline size={56} />
        </View>
      ) : !data ? (
        <Text style={{ color: A.muted, textAlign: "center", marginTop: 60 }}>
          Analytics are not available for this match yet.
        </Text>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 32 }}
          showsVerticalScrollIndicator={false}
        >
          <ScoreCard data={data} />

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginVertical: 18,
              borderRadius: 18,
              backgroundColor: A.card,
              padding: 3,
            }}
          >
            {TABS.map((t) => (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 6,
                  borderRadius: 15,
                  backgroundColor: tab === t ? A.amber : "transparent",
                }}
              >
                <Text style={{ color: tab === t ? "#000000" : A.text, fontSize: 12, fontWeight: "600" }}>
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>

          {tab === "Stats" && <StatsTab data={data} />}
          {tab === "Lineups" && <LineupsTab data={data} />}
          {tab === "Timeline" && <TimelineTab data={data} />}
        </ScrollView>
      )}
    </View>
  );
};

export default MatchAnalytics;
