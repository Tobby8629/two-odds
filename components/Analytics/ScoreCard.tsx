import React from "react";
import { Text, View } from "react-native";
import { MatchAnalytics } from "@/constants/mockAnalytics";
import { A } from "./theme";

/* The API sends no crests, so a white circle stands in for each team. */
const Crest = () => (
  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF" }} />
);

const ScoreCard = ({ data }: { data: MatchAnalytics }) => (
  <View
    style={{
      marginHorizontal: 20,
      borderRadius: 20,
      backgroundColor: A.card,
      paddingVertical: 16,
      paddingHorizontal: 20,
      alignItems: "center",
    }}
  >
    <View
      style={{ borderRadius: 10, backgroundColor: A.row, paddingHorizontal: 10, paddingVertical: 3 }}
    >
      <Text style={{ color: A.muted, fontSize: 10 }}>{data.status}</Text>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12, width: "100%" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Crest />
        <Text style={{ color: A.text, fontSize: 12, marginTop: 6 }}>{data.home.name}</Text>
      </View>

      <Text style={{ color: A.text, fontSize: 32, fontWeight: "700", paddingHorizontal: 12 }}>
        {data.homeScore} - {data.awayScore}
      </Text>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Crest />
        <Text style={{ color: A.text, fontSize: 12, marginTop: 6 }}>{data.away.name}</Text>
      </View>
    </View>
  </View>
);

export default ScoreCard;
