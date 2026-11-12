import React from "react";
import { Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { MatchAnalytics, TimelineItem } from "@/constants/mockAnalytics";

/*
 * Figma timeline frame (393 wide, #003C6F), values read from the design:
 * - centre line: "Vertical Divider", 2px wide, gradient #00FF88 into #1E293B
 * - goal marker: 32px, 4px #101622 border, #0D59F2 fill (home)
 * - dot marker: 16px, 2px #101622 border, #334155 fill
 * - LIVE pill: #00FF88, padding 4/12, 50% #00FF88 glow (blur 15)
 * - other pills: #1E293B, padding 4/16, 1px border, fully rounded
 * - text: GOAL! ExtraBold 12 (#0D59F2 home, white away); minute Bold 12
 *   #94A3B8; title ExtraBold 14/20 #F1F5F9; detail Regular 10/15 #64748B
 * Still matched by eye: the away-goal fill, pill border / text colours, the
 * pill and gradient stop positions.
 */
const C = {
  blue: "#0D59F2",
  minute: "#94A3B8",
  title: "#F1F5F9",
  detail: "#64748B",
  ring: "#101622",
  dot: "#334155",
  pill: "#1E293B",
  pillBorder: "#334155",
  live: "#00FF88",
  slate: "#1E293B",
  green: "#10B981",
  red: "#EF4444",
  yellow: "#F5C518",
} as const;

const F = {
  regular: "Manrope_400Regular",
  bold: "Manrope_700Bold",
  extra: "Manrope_800ExtraBold",
} as const;

/* Column the markers sit in; wide enough for the 32px goal marker. */
const MARKER_COL = 32;

type EventItem = Extract<TimelineItem, { kind: "event" }>;

const Marker = ({ item }: { item: EventItem }) => {
  if (item.type === "goal") {
    const home = item.side === "home";
    return (
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          borderWidth: 4,
          borderColor: C.ring,
          backgroundColor: home ? C.blue : C.dot,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome6 name="futbol" size={12} color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: C.ring,
        backgroundColor: C.dot,
      }}
    />
  );
};

/* Small glyph beside the minute for events that have one. */
const MinuteIcon = ({ item }: { item: EventItem }) => {
  if (item.type === "yellow") {
    return <View style={{ width: 10, height: 14, borderRadius: 2, backgroundColor: C.yellow }} />;
  }
  if (item.type === "red") {
    return <View style={{ width: 10, height: 14, borderRadius: 2, backgroundColor: C.red }} />;
  }
  if (item.type === "attack") {
    return <FontAwesome6 name="bolt" size={11} color={C.red} />;
  }
  if (item.type === "sub") {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          borderWidth: 1,
          borderColor: C.green,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome6 name="arrows-rotate" size={7} color={C.green} />
      </View>
    );
  }
  return null;
};

/* Home text is right-aligned against the line; away text is left-aligned. */
const EventText = ({ item }: { item: EventItem }) => {
  const home = item.side === "home";
  const goal = item.type === "goal";
  const align = home ? "right" : "left";

  const goalLabel = goal ? (
    <Text style={{ color: home ? C.blue : "#FFFFFF", fontSize: 12, lineHeight: 16, fontFamily: F.extra }}>
      GOAL!
    </Text>
  ) : null;

  const minute = (
    <Text style={{ color: C.minute, fontSize: 12, lineHeight: 16, fontFamily: F.bold }}>{item.minute}</Text>
  );

  const icon = <MinuteIcon item={item} />;

  /* Home reads "GOAL! 48'" / "(icon) 58'"; away reads "24' GOAL!" / "65' (icon)". */
  const lead = home ? (
    <>
      {goalLabel}
      {!goal && icon}
      {minute}
    </>
  ) : (
    <>
      {minute}
      {goalLabel}
      {!goal && icon}
    </>
  );

  return (
    <View style={{ alignItems: home ? "flex-end" : "flex-start" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>{lead}</View>

      <Text style={{ color: C.title, fontSize: 14, lineHeight: 20, fontFamily: F.extra, textAlign: align }}>
        {item.title}
      </Text>

      {item.type === "sub" ? (
        <>
          <Text style={{ color: C.green, fontSize: 10, lineHeight: 15, fontFamily: F.regular, textAlign: align }}>
            In: {item.playerIn}
          </Text>
          <Text style={{ color: C.detail, fontSize: 10, lineHeight: 15, fontFamily: F.regular, textAlign: align }}>
            Out: {item.playerOut}
          </Text>
        </>
      ) : item.detail ? (
        <Text style={{ color: C.detail, fontSize: 10, lineHeight: 15, fontFamily: F.regular, textAlign: align }}>
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
      <View style={{ flex: 1, paddingRight: 16, alignItems: "flex-end" }}>
        {home ? <EventText item={item} /> : null}
      </View>

      <View style={{ width: MARKER_COL, alignItems: "center" }}>
        <Marker item={item} />
      </View>

      <View style={{ flex: 1, paddingLeft: 16, alignItems: "flex-start" }}>
        {!home ? <EventText item={item} /> : null}
      </View>
    </View>
  );
};

const Pill = ({ label }: { label: string }) => (
  <View style={{ alignItems: "center", marginBottom: 28 }}>
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: C.pillBorder,
        backgroundColor: C.pill,
      }}
    >
      <Text style={{ color: C.minute, fontSize: 10, lineHeight: 15, fontFamily: F.bold, textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  </View>
);

/* Glowing green pill with a matching dot where the line starts. */
const LivePill = ({ minute }: { minute: number }) => (
  <View style={{ alignItems: "center", marginBottom: 20 }}>
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: C.live,
        shadowColor: C.live,
        shadowOpacity: 0.5,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
      }}
    >
      <Text style={{ color: C.ring, fontSize: 10, lineHeight: 15, fontFamily: F.extra, textTransform: "uppercase" }}>
        Live {minute}'
      </Text>
    </View>
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        marginTop: 8,
        backgroundColor: C.live,
        shadowColor: C.live,
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      }}
    />
  </View>
);

const TimelineTab = ({ data }: { data: MatchAnalytics }) => {
  /* Stored oldest first; the design reads newest first. */
  const items = [...data.timeline].reverse();

  return (
    <View style={{ paddingHorizontal: 17, paddingBottom: 24 }}>
      {/* Solid 2px line behind every row: bright green at the top fading into slate. */}
      <View style={{ position: "absolute", top: 0, bottom: 0, left: 17, right: 17, alignItems: "center" }} pointerEvents="none">
        <Svg width={2} height="100%">
          <Defs>
            <LinearGradient id="spine" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={C.live} />
              <Stop offset="0.08" stopColor={C.slate} />
              <Stop offset="1" stopColor={C.slate} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="2" height="100%" fill="url(#spine)" />
        </Svg>
      </View>

      {data.liveMinute !== null && <LivePill minute={data.liveMinute} />}

      {items.map((item, i) =>
        item.kind === "pill" ? <Pill key={i} label={item.label} /> : <EventRow key={i} item={item} />
      )}
    </View>
  );
};

export default TimelineTab;
