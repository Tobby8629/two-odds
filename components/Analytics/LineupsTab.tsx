import React from "react";
import { Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import {
  KeyPlayer,
  MatchAnalytics,
  PitchPlayer,
  SubPlayer,
  TeamLineup,
} from "@/constants/mockAnalytics";

/*
 * Figma lineups frame (393 wide, #003C6F). Read from the design: pitch
 * section 358 wide / radius 24 / 2px white 10% border / padding 24 / gap 24 /
 * #1A3A2A; row pill 358x44 / radius 48 / padding 12 / #1E293B at 50%.
 * Circle fills are matched by eye - confirm in Figma.
 */
const C = {
  pitch: "#1A3A2A",
  row: "rgba(30,41,59,0.5)",
  slate: "#64748B",
  slateLight: "#94A3B8",
  white: "#FFFFFF",
  subName: "#F1F5F9",
  homeCircle: "#1D4ED8",
  awayCircle: "#F25555",
  homeKeeper: "#EAB308",
  awayKeeper: "#FB923C",
  homeLabel: "#0D59F2",
  awayLabel: "#E5484D",
  goal: "#22C55E",
  subOut: "#EF4444",
  subIn: "#10B981",
} as const;

const F = {
  medium: "Manrope_500Medium",
  semi: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
  extra: "Manrope_800ExtraBold",
} as const;

const Dot = ({ player, color, keeper }: { player: PitchPlayer; color: string; keeper: string }) => (
  <View style={{ alignItems: "center", width: 64 }}>
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: C.white,
        backgroundColor: player.keeper ? keeper : color,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <Text style={{ color: C.white, fontSize: 10, lineHeight: 15, fontFamily: F.bold, textAlign: "center" }}>
        {player.number}
      </Text>
    </View>
    <Text
      numberOfLines={1}
      style={{
        color: C.white,
        fontSize: 8,
        lineHeight: 12,
        fontFamily: F.bold,
        marginTop: 4,
        paddingHorizontal: 4,
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.35)",
      }}
    >
      {player.label}
    </Text>
  </View>
);

const Line = ({ players, color, keeper }: { players: PitchPlayer[]; color: string; keeper: string }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 24 }}>
    {players.map((pl) => (
      <Dot key={pl.number} player={pl} color={color} keeper={keeper} />
    ))}
  </View>
);

/* Two white 5% to clear washes (top to bottom, left to right), as in the design. */
const PitchShading = () => (
  <Svg style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }} width="100%" height="100%">
    <Defs>
      <LinearGradient id="wash-v" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.05} />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient id="wash-h" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.05} />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#wash-v)" />
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#wash-h)" />
  </Svg>
);

/* Home is drawn top to bottom with its keeper first; away is mirrored below the centre line. */
const Pitch = ({ data }: { data: MatchAnalytics }) => {
  const home = data.lineups.home.lines;
  const away = [...data.lineups.away.lines].reverse();

  return (
    <View
      style={{
        marginHorizontal: 17,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: C.pitch,
        paddingVertical: 24,
        gap: 24,
        overflow: "hidden",
      }}
    >
      <PitchShading />

      {home.map((line, i) => (
        <Line key={`h${i}`} players={line} color={C.homeCircle} keeper={C.homeKeeper} />
      ))}

      {/* Horizontal divider (354x2, 1px white 20%) with the 80px centre circle. */}
      <View style={{ alignItems: "center", justifyContent: "center", height: 2 }}>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)",
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)",
          }}
        />
      </View>

      {away.map((line, i) => (
        <Line key={`a${i}`} players={line} color={C.awayCircle} keeper={C.awayKeeper} />
      ))}
    </View>
  );
};

/* No crests come from the API, so a small white disc stands in. */
const Heading = ({ team }: { team: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 24, marginBottom: 12, paddingHorizontal: 20 }}>
    <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: C.white, marginRight: 8 }} />
    <Text
      style={{
        color: C.slate,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        fontFamily: F.extra,
      }}
    >
      {team} Starting XI
    </Text>
  </View>
);

const Row = ({ player }: { player: KeyPlayer }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 44,
      padding: 12,
      borderRadius: 48,
      backgroundColor: C.row,
      marginBottom: 8,
      marginHorizontal: 17,
      overflow: "hidden",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      <Text style={{ width: 28, color: C.slateLight, fontSize: 12, lineHeight: 16, fontFamily: F.bold }}>
        {player.number}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: player.scored ? C.homeLabel : C.white,
          fontSize: 14,
          lineHeight: 20,
          fontFamily: F.semi,
          flexShrink: 1,
        }}
      >
        {player.name}
      </Text>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {player.scored && (
        <FontAwesome6 name="futbol" size={14} color={C.goal} style={{ marginRight: 8 }} />
      )}
      {player.sub && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome6
            name={player.sub.direction === "out" ? "arrow-down" : "arrow-up"}
            size={10}
            color={player.sub.direction === "out" ? C.subOut : C.subIn}
          />
          <Text
            style={{
              color: player.sub.direction === "out" ? C.subOut : C.subIn,
              fontSize: 10,
              lineHeight: 15,
              fontFamily: F.bold,
              marginLeft: 4,
            }}
          >
            {player.sub.minute}'
          </Text>
        </View>
      )}
      {!!player.position && (
        <Text
          style={{
            color: C.slate,
            fontSize: 10,
            lineHeight: 15,
            fontFamily: F.bold,
            textTransform: "uppercase",
          }}
        >
          {player.position}
        </Text>
      )}
    </View>
  </View>
);

const SubColumn = ({ title, color, subs }: { title: string; color: string; subs: SubPlayer[] }) => (
  <View style={{ flex: 1 }}>
    <Text
      style={{
        color,
        opacity: 0.7,
        fontSize: 10,
        lineHeight: 15,
        fontFamily: F.bold,
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {title}
    </Text>
    {subs.map((s) => (
      <View
        key={s.number}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.1)",
        }}
      >
        <Text style={{ color: C.subName, fontSize: 12, lineHeight: 16, fontFamily: F.medium }}>{s.name}</Text>
        <Text style={{ color: C.slate, fontSize: 12, lineHeight: 16, fontFamily: F.medium }}>{s.number}</Text>
      </View>
    ))}
  </View>
);

const Roster = ({ team, lineup }: { team: string; lineup: TeamLineup }) => (
  <View>
    <Heading team={team} />
    {lineup.keyPlayers.map((pl) => (
      <Row key={pl.number} player={pl} />
    ))}
  </View>
);

const LineupsTab = ({ data }: { data: MatchAnalytics }) => (
  <View>
    <Pitch data={data} />

    <Roster team={data.home.name} lineup={data.lineups.home} />
    <Roster team={data.away.name} lineup={data.lineups.away} />

    <Text
      style={{
        color: C.slate,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        fontFamily: F.extra,
        marginTop: 28,
        marginBottom: 12,
        paddingHorizontal: 20,
      }}
    >
      Substitutes
    </Text>
    <View style={{ flexDirection: "row", gap: 24, paddingHorizontal: 20 }}>
      <SubColumn title={data.home.name} color={C.homeLabel} subs={data.lineups.home.substitutes} />
      <SubColumn title={data.away.name} color={C.awayLabel} subs={data.lineups.away.substitutes} />
    </View>
  </View>
);

export default LineupsTab;
