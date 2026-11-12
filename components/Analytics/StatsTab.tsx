import React from "react";
import { Text, View } from "react-native";
import { MatchAnalytics } from "@/constants/mockAnalytics";
import { A } from "./theme";

const Split = ({ home, away }: { home: number; away: number }) => {
  const total = home + away || 1;
  return (
    <View style={{ flexDirection: "row", height: 6, borderRadius: 3, overflow: "hidden" }}>
      <View style={{ flex: home / total, backgroundColor: A.homeBar }} />
      <View style={{ flex: away / total, backgroundColor: A.amber }} />
    </View>
  );
};

const StatsTab = ({ data }: { data: MatchAnalytics }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
      <Text style={{ color: A.homeBar, fontSize: 16, fontWeight: "700" }}>{data.possession.home}%</Text>
      <Text style={{ color: A.muted, fontSize: 12 }}>Possession</Text>
      <Text style={{ color: A.amber, fontSize: 16, fontWeight: "700" }}>{data.possession.away}%</Text>
    </View>
    <Split home={data.possession.home} away={data.possession.away} />

    {data.stats.map((row) => (
      <View key={row.label} style={{ marginTop: 18 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
          <Text style={{ color: A.text, fontSize: 12 }}>{row.home}</Text>
          <Text style={{ color: A.muted, fontSize: 12 }}>{row.label}</Text>
          <Text style={{ color: A.text, fontSize: 12 }}>{row.away}</Text>
        </View>
        <Split home={row.home} away={row.away} />
      </View>
    ))}

    <Text style={{ color: A.muted, fontSize: 12, textAlign: "center", marginTop: 28 }}>Discipline</Text>
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
      <CardCount yellow={data.cards.homeYellow} red={data.cards.homeRed} />
      <CardCount yellow={data.cards.awayYellow} red={data.cards.awayRed} />
    </View>
  </View>
);

const Card = ({ color, n }: { color: string; n: number }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12 }}>
    <View style={{ width: 10, height: 14, borderRadius: 2, backgroundColor: color, marginRight: 4 }} />
    <Text style={{ color: A.text, fontSize: 12 }}>{n}</Text>
  </View>
);

const CardCount = ({ yellow, red }: { yellow: number; red: number }) => (
  <View style={{ flexDirection: "row" }}>
    <Card color="#F5C518" n={yellow} />
    <Card color="#E5484D" n={red} />
  </View>
);

export default StatsTab;
