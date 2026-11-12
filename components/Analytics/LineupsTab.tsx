import React from "react";
import { Text, View } from "react-native";
import { LineupPlayer, MatchAnalytics, TeamLineup } from "@/constants/mockAnalytics";
import { A } from "./theme";

const Dot = ({ player, color }: { player: LineupPlayer; color: string }) => (
  <View style={{ alignItems: "center", width: 60 }}>
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "700" }}>{player.number}</Text>
    </View>
    <Text numberOfLines={1} style={{ color: "#FFFFFF", fontSize: 8, marginTop: 2 }}>
      {player.name}
    </Text>
  </View>
);

/* Home attacks down the pitch, so its lines run top to bottom and the away side is mirrored. */
const Pitch = ({ data }: { data: MatchAnalytics }) => {
  const home = data.lineups.home.lines;
  const away = [...data.lineups.away.lines].reverse();

  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 12,
        backgroundColor: A.pitch,
        paddingVertical: 14,
        height: 380,
        justifyContent: "space-between",
      }}
    >
      {home.map((line, i) => (
        <View key={`h${i}`} style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {line.map((pl) => (
            <Dot key={pl.number} player={pl} color={A.homeBar} />
          ))}
        </View>
      ))}

      <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.4)" }} />

      {away.map((line, i) => (
        <View key={`a${i}`} style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {line.map((pl) => (
            <Dot key={pl.number} player={pl} color={A.awayDot} />
          ))}
        </View>
      ))}
    </View>
  );
};

const Marker = ({ note }: { note?: LineupPlayer["note"] }) => {
  if (!note) return null;
  if (note === "goal") return <Text style={{ fontSize: 10, marginLeft: 6 }}>⚽</Text>;
  return (
    <View
      style={{
        width: 8,
        height: 11,
        borderRadius: 2,
        marginLeft: 6,
        backgroundColor: note === "yellow" ? "#F5C518" : "#E5484D",
      }}
    />
  );
};

const Roster = ({ title, lineup }: { title: string; lineup: TeamLineup }) => {
  const starters = lineup.lines.flat();
  return (
    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
      <Text style={{ color: A.amber, fontSize: 12, marginBottom: 8 }}>
        {title} ({lineup.formation})
      </Text>
      {starters.map((pl) => (
        <Row key={pl.number} player={pl} />
      ))}
      <Text style={{ color: A.muted, fontSize: 11, marginVertical: 8 }}>Substitutes</Text>
      {lineup.substitutes.map((pl) => (
        <Row key={pl.number} player={pl} />
      ))}
    </View>
  );
};

const Row = ({ player }: { player: LineupPlayer }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: A.row,
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 7,
      marginBottom: 4,
    }}
  >
    <Text style={{ color: A.muted, fontSize: 11, width: 24 }}>{player.number}</Text>
    <Text style={{ color: A.text, fontSize: 12, flex: 1 }}>{player.name}</Text>
    <Marker note={player.note} />
  </View>
);

const LineupsTab = ({ data }: { data: MatchAnalytics }) => (
  <View>
    <Pitch data={data} />
    <Roster title={`${data.home.name} starting XI`} lineup={data.lineups.home} />
    <Roster title={`${data.away.name} starting XI`} lineup={data.lineups.away} />
  </View>
);

export default LineupsTab;
