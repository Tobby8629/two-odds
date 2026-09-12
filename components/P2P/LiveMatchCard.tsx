import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Match } from "@/types/sports.types";
import VsMark from "@/assets/SVGs/icons/VsMark";

/** The API sends team names but no crests, so initials stand in. */
const initials = (team: string) =>
  team
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Team = ({ name }: { name: string }) => (
  <View className="items-center flex-1">
    <View className="w-12 h-12 rounded-xl bg-white/90 items-center justify-center">
      <Text className="text-[#001C34] font-bold">{initials(name)}</Text>
    </View>
    <Text numberOfLines={1} className="text-white text-xs font-semibold mt-2">
      {name}
    </Text>
  </View>
);

const LiveMatchCard = ({ match }: { match: Match }) => {
  const isLive = match.status === "LIVE";
  const hasScore =
    match.homeScore !== null && match.homeScore !== undefined;

  const kickoff = match.startTime
    ? new Date(match.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <View style={styles.card}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {isLive && <View style={styles.liveDot} />}
          <Text style={styles.liveText}>{isLive ? "LIVE" : kickoff}</Text>
        </View>

        {hasScore && (
          <View style={styles.scorePill}>
            <Text className="text-white text-xs font-semibold">
              {match.homeScore} - {match.awayScore}
            </Text>
          </View>
        )}
      </View>

      <Text numberOfLines={1} style={styles.league}>
        {match.league?.name ?? ""}
      </Text>

      <View className="flex-row items-center justify-between mt-3">
        <Team name={match.homeTeam} />

        <View style={{ width: 56, alignItems: "center" }}>
          <VsMark width={46} height={36} color="#64748B" />
        </View>

        <Team name={match.awayTeam} />
      </View>
    </View>
  );
};

export default LiveMatchCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 358,
    height: 185,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#1F5079",
    backgroundColor: "#001C34",
    padding: 20,
    justifyContent: "center",
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E53935",
    marginRight: 6,
  },
  liveText: {
    color: "#E53935",
    fontSize: 10,
    fontWeight: "700",
  },
  scorePill: {
    borderWidth: 1,
    borderColor: "#1F5079",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  league: {
    color: "#9FB6C9",
    fontSize: 9,
    letterSpacing: 0.5,
    marginTop: 4,
  },
});
