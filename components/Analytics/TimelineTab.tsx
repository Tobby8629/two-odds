import React from "react";
import { Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Svg, { Line } from "react-native-svg";
import { MatchAnalytics, TimelineItem } from "@/constants/mockAnalytics";

/*
 * Figma timeline frame (393 wide, #003C6F): newest on top, oldest at the
 * bottom. Home events sit left of a dotted centre line and away events right,
 * each with its own marker on the line. Read from the design: GOAL! Manrope
 * ExtraBold 12 (#0D59F2 home, white away); minute Bold 12 #94A3B8; title
 * ExtraBold 14/20 #F1F5F9; detail Regular 10/15 #64748B; pill text Bold 10.
 * Marker sizes and the line / pill colours are matched by eye - confirm in
 * Figma.
 */
const C = {
  blue: "#0D59F2",
  minute: "#94A3B8",
  title: "#F1F5F9",
  detail: "#64748B",
  line: "#2F6FDB",
  pillBg: "rgba(30,41,59,0.5)",
  pillBorder: "rgba(255,255,255,0.1)",
  green: "#10B981",
  red: "#EF4444",
  dot: "#1E293B",
  dotBorder: "#475569",
  awayGoal: "#334155",
  yellow: "#F5C518",
} as const;

const F = {
  regular: "Manrope_400Regular",
  bold: "Manrope_700Bold",
  extra: "Manrope_800ExtraBold",
} as const;

const MARKER = 28;

type EventItem = Extract<TimelineItem, { kind: "event" }>;

const Marker = ({ item }: { item: EventItem }) => {
  if (item.type === "goal") {
    const home = item.side === "home";
    return (
      <View
        style={{
          width: MARKER,
          height: MARKER,
          borderRadius: MARKER / 2,
          backgroundColor: home ? C.blue : C.awayGoal,
          borderWidth: 2,
          borderColor: home ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome6 name="futbol" size={13} color="#FFFFFF" />
      </View>
    );
  }

  if (item.type === "sub") {
    return (
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: C.dot,
          borderWidth: 1,
          borderColor: C.green,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome6 name="arrows-rotate" size={8} color={C.green} />
      </View>
    );
  }

  return (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: C.dot,
        borderWidth: 1,
        borderColor: C.dotBorder,
      }}
    />
  );
};

const Icon = ({ item }: { item: EventItem }) => {
  if (item.type === "yellow") {
    return <View style={{ width: 10, height: 14, borderRadius: 2, backgroundColor: C.yellow, marginLeft: 6 }} />;
  }
  if (item.type === "red") {
    return <View style={{ width: 10, height: 14, borderRadius: 2, backgroundColor: C.red, marginLeft: 6 }} />;
  }
  if (item.type === "attack") {
    return <FontAwesome6 name="bolt" size={11} color={C.red} style={{ marginLeft: 6 }} />;
  }
  return null;
};

/* Home text is right-aligned against the line; away text is left-aligned. */
const EventText = ({ item }: { item: EventItem }) => {
  const home = item.side === "home";
  const goal = item.type === "goal";

  const goalLabel = goal ? (
    <Text style={{ color: home ? C.blue : "#FFFFFF", fontSize: 12, lineHeight: 16, fontFamily: F.extra }}>
      GOAL!
    </Text>
  ) : null;

  const minute = (
    <Text style={{ color: C.minute, fontSize: 12, lineHeight: 16, fontFamily: F.bold }}>{item.minute}</Text>
  );

  return (
    <View style={{ alignItems: home ? "flex-end" : "flex-start" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {home ? goalLabel : minute}
        {home ? minute : goalLabel}
        {!goal && <Icon item={item} />}
      </View>

      <Text
        style={{
          color: C.title,
          fontSize: 14,
          lineHeight: 20,
          fontFamily: F.extra,
          textAlign: home ? "right" : "left",
        }}
      >
        {item.title}
      </Text>

      {item.type === "sub" ? (
        <>
          <Text style={{ color: C.green, fontSize: 10, lineHeight: 15, fontFamily: F.regular }}>
            In: {item.playerIn}
          </Text>
          <Text style={{ color: C.detail, fontSize: 10, lineHeight: 15, fontFamily: F.regular }}>
            Out: {item.playerOut}
          </Text>
        </>
      ) : item.detail ? (
        <Text style={{ color: C.detail, fontSize: 10, lineHeight: 15, fontFamily: F.regular, textAlign: home ? "right" : "left" }}>
          {item.detail}
        </Text>
      ) : null}
    </View>
  );
};

const EventRow = ({ item }: { item: EventItem }) => {
  const home = item.side === "home";
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 28 }}>
      <View style={{ flex: 1, paddingRight: 18, alignItems: "flex-end" }}>
        {home ? <EventText item={item} /> : null}
      </View>

      <View style={{ width: MARKER, alignItems: "center" }}>
        <Marker item={item} />
      </View>

      <View style={{ flex: 1, paddingLeft: 18, alignItems: "flex-start" }}>
        {!home ? <EventText item={item} /> : null}
      </View>
    </View>
  );
};

const Pill = ({ label, live }: { label: string; live?: boolean }) => (
  <View style={{ alignItems: "center", marginBottom: 28 }}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 24,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: live ? C.green : C.pillBorder,
        backgroundColor: live ? C.green : C.pillBg,
      }}
    >
      {live && (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFFFFF", marginRight: 6 }} />
      )}
      <Text
        style={{
          color: live ? "#FFFFFF" : C.minute,
          fontSize: 10,
          lineHeight: 15,
          fontFamily: F.bold,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
    </View>
  </View>
);

const TimelineTab = ({ data }: { data: MatchAnalytics }) => {
  /* Stored oldest first; the design reads newest first. */
  const items = [...data.timeline].reverse();

  return (
    <View style={{ paddingHorizontal: 17 }}>
      {/* Dotted centre line behind every row and marker. */}
      <Svg
        pointerEvents="none"
        style={{ position: "absolute", top: 0, bottom: 0, left: 17, right: 17 }}
        width="100%"
        height="100%"
      >
        <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={C.line} strokeWidth={1.5} strokeDasharray="2 4" />
      </Svg>

      {data.liveMinute !== null && <Pill label={`Live ${data.liveMinute}'`} live />}

      {items.map((item, i) =>
        item.kind === "pill" ? (
          <Pill key={i} label={item.label} />
        ) : (
          <EventRow key={i} item={item} />
        )
      )}
    </View>
  );
};

export default TimelineTab;
