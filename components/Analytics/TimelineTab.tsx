import React from "react";
import { Text, View } from "react-native";
import { MatchAnalytics, TimelineEvent } from "@/constants/mockAnalytics";
import { A } from "./theme";

const ICON: Record<TimelineEvent["type"], string> = {
  goal: "⚽",
  yellow: "🟨",
  red: "🟥",
  sub: "🔁",
};

const Event = ({ event }: { event: TimelineEvent }) => {
  const left = event.side === "home";
  const body = (
    <View style={{ flex: 1, alignItems: left ? "flex-end" : "flex-start" }}>
      <Text style={{ color: A.text, fontSize: 12 }}>
        {ICON[event.type]} {event.player}
      </Text>
      {event.detail ? (
        <Text style={{ color: A.muted, fontSize: 10, marginTop: 2 }}>{event.detail}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 22 }}>
      {left ? body : <View style={{ flex: 1 }} />}

      <View
        style={{
          minWidth: 38,
          paddingVertical: 3,
          marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: event.type === "goal" ? A.amber : A.row,
          alignItems: "center",
        }}
      >
        <Text style={{ color: event.type === "goal" ? "#000000" : A.text, fontSize: 10 }}>
          {event.minute}'
        </Text>
      </View>

      {left ? <View style={{ flex: 1 }} /> : body}
    </View>
  );
};

const TimelineTab = ({ data }: { data: MatchAnalytics }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <View style={{ alignItems: "center", marginBottom: 18 }}>
      <View style={{ borderRadius: 10, backgroundColor: A.amber, paddingHorizontal: 12, paddingVertical: 3 }}>
        <Text style={{ color: "#000000", fontSize: 10 }}>Kick off</Text>
      </View>
    </View>

    {data.timeline.map((event, i) => (
      <Event key={i} event={event} />
    ))}

    <View style={{ alignItems: "center" }}>
      <View style={{ borderRadius: 10, backgroundColor: A.row, paddingHorizontal: 12, paddingVertical: 3 }}>
        <Text style={{ color: A.muted, fontSize: 10 }}>Full time</Text>
      </View>
    </View>
  </View>
);

export default TimelineTab;
