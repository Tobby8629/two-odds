import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Layout from "../(settings)/Layout";
import Loading from "@/components/Reuseables/Loading";
import AlertBanner from "@/components/Reuseables/AlertBanner";
import { useMatches } from "@/hooks/useMatches";
import Sport from "@/components/Home/Sport";
import { previewMatches } from "@/constants/previewMatches";
import { sports as SportName } from "@/interface";
import { useCreateCustomBet } from "@/hooks/useBets";
import { Match, MarketOutcome } from "@/types/sports.types";

const FIELD_WIDTH = 358;

/* Local sport names differ from the provider's, so match them loosely. */
const PLACEHOLDER_PREDICTIONS = [
  "Team A to Win",
  "Team B to Win",
  "Draw",
];

const SPORT_ALIASES: Record<string, string[]> = {
  football: ["football", "soccer"],
  basketball: ["basketball"],
  tennis: ["tennis"],
  volleyball: ["volleyball"],
  americafootball: ["american", "nfl"],
};

/** Turns { winner: "home" } into a readable row label. */
const outcomeLabel = (match: Match, outcome: MarketOutcome) => {
  const value = String(Object.values(outcome.prediction ?? {})[0] ?? "");

  if (value === "home") return match.homeTeam + " to Win";
  if (value === "away") return match.awayTeam + " to Win";
  if (value === "draw") return "Draw";

  return value || "Outcome";
};

export default function CreateP2PBetScreen() {
  const [sport, setSport] = useState<SportName | "">("");
  const [match, setMatch] = useState<Match | null>(null);
  const [outcomeIndex, setOutcomeIndex] = useState<number | null>(null);
  const [stake, setStake] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: matches, isPending: loadingMatches } = useMatches({
    status: "UPCOMING",
    limit: 50,
  });

  const { mutateAsync: createBet, isPending: isCreating } = useCreateCustomBet();

  /* Only MATCH_WINNER is offered, matching the three rows in the design. */
  const market = useMemo(
    () => match?.markets?.find((m) => m.betType === "MATCH_WINNER"),
    [match]
  );

  const visibleMatches = useMemo(() => {
    /* TEMP: local fixtures until the sports API returns matches. */
    const source = matches && matches.length ? matches : previewMatches;

    if (!sport) return source;

    const aliases = SPORT_ALIASES[sport] ?? [sport];

    return source.filter((m) => {
      const name = (m.league?.sport?.name ?? "").toLowerCase();
      return aliases.some((a) => name.includes(a));
    });
  }, [matches, sport]);

  const hasOdds = Boolean(match && market && market.outcomes.length);

  const selectedOutcome =
    outcomeIndex !== null ? market?.outcomes?.[outcomeIndex] : undefined;

  const canSubmit = Boolean(match && selectedOutcome) && Number(stake) > 0;

  const handleCreate = async () => {
    if (!match || !selectedOutcome) {
      setError("Choose a match and a prediction first");
      return;
    }

    if (!(Number(stake) > 0)) {
      setError("Enter a stake");
      return;
    }

    setError(null);

    try {
      await createBet({
        matchId: match.id,
        betType: "MATCH_WINNER",
        prediction: selectedOutcome.prediction,
        odds: selectedOutcome.price,
        stake: Number(stake),
      });

      router.replace("/(p2p)/my-bets");
    } catch {
      setError("Could not create this bet. Check your balance and try again.");
    }
  };

  return (
    <Layout header="Create P2P Bet">
      {error ? <AlertBanner message={error} /> : null}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.page}
          showsVerticalScrollIndicator={false}
        >
          <Sport
            title="Select Sport"
            selectSport={sport}
            handlePress={(next) => {
              setSport(next === sport ? "" : next);
              setMatch(null);
              setOutcomeIndex(null);
            }}
          />

          <Pressable
            onPress={() => setPickerOpen(true)}
            style={[styles.field, styles.row]}
          >
            <Text
              numberOfLines={1}
              style={match ? styles.value : styles.placeholder}
            >
              {match ? match.homeTeam + " vs " + match.awayTeam : "Choose Match"}
            </Text>
            <Ionicons name="chevron-expand" size={18} color="#B9CBD9" />
          </Pressable>

          <Text style={styles.sectionLabel}>Your Prediction</Text>

          {hasOdds ? (
            market!.outcomes.map((outcome, i) => (
              <Pressable
                key={i}
                onPress={() => setOutcomeIndex(i)}
                style={[styles.field, styles.row]}
              >
                <Text numberOfLines={1} style={styles.value}>
                  {outcomeLabel(match!, outcome)}
                </Text>

                <View style={styles.rowEnd}>
                  <Text style={styles.odds}>{outcome.price?.toFixed(2)}</Text>
                  <View
                    style={[
                      styles.radio,
                      outcomeIndex === i ? styles.radioOn : null,
                    ]}
                  />
                </View>
              </Pressable>
            ))
          ) : (
            <>
              {/* Inert rows so the layout reads the same before odds load. */}
              {PLACEHOLDER_PREDICTIONS.map((label) => (
                <View key={label} style={[styles.field, styles.row]}>
                  <Text numberOfLines={1} style={styles.placeholder}>
                    {label}
                  </Text>
                  <View style={styles.radio} />
                </View>
              ))}

              <Text style={styles.hint}>
                {match
                  ? "Odds have not synced for this match yet."
                  : "Choose a match to load its odds."}
              </Text>
            </>
          )}

          <Text style={styles.sectionLabel}>Stake</Text>

          <TextInput
            value={stake}
            onChangeText={(t) => setStake(t.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#7C93A6"
            style={[styles.field, styles.input]}
          />

          <Pressable
            onPress={handleCreate}
            disabled={!canSubmit || isCreating}
            style={[
              styles.action,
              { backgroundColor: canSubmit ? "#FFA500" : "#7C93A6" },
            ]}
          >
            {isCreating ? (
              <Loading inline size={24} />
            ) : (
              <Text style={styles.actionText}>Create Bet</Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={pickerOpen} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setPickerOpen(false)}>
          <View style={styles.sheet}>
            {loadingMatches ? (
              <View style={{ paddingVertical: 40 }}>
                <Loading inline size={56} />
              </View>
            ) : (
              <ScrollView>
                {visibleMatches.length === 0 ? (
                  <Text style={styles.hint}>No matches available.</Text>
                ) : (
                  visibleMatches.map((m) => (
                    <Pressable
                      key={m.id}
                      onPress={() => {
                        setMatch(m);
                        setOutcomeIndex(null);
                        setPickerOpen(false);
                      }}
                      style={styles.sheetRow}
                    >
                      <Text numberOfLines={1} style={styles.sheetTitle}>
                        {m.homeTeam} vs {m.awayTeam}
                      </Text>
                      <Text numberOfLines={1} style={styles.sheetSub}>
                        {m.league?.name ?? ""}
                      </Text>
                    </Pressable>
                  ))
                )}
              </ScrollView>
            )}
          </View>
        </Pressable>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionLabel: {
    color: "#FFFFFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  field: {
    width: "100%",
    maxWidth: FIELD_WIDTH,
    minWidth: 160,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#012645",
    borderWidth: 1,
    borderColor: "#1F5079",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowEnd: { flexDirection: "row", alignItems: "center" },
  value: { color: "#FFFFFF", fontSize: 14, flex: 1, marginRight: 8 },
  placeholder: { color: "#B9CBD9", fontSize: 14, flex: 1 },
  input: { color: "#FFFFFF", fontSize: 14 },
  odds: { color: "#FFA500", fontSize: 12, marginRight: 10 },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#B9CBD9",
  },
  radioOn: { borderColor: "#FFA500", backgroundColor: "#FFA500" },
  hint: { color: "#B9CBD9", fontSize: 12, marginBottom: 12 },
  
  
  
  
  action: {
    width: "100%",
    maxWidth: 480,
    minWidth: 84,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  actionText: {
    color: "#000000",
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  sheet: {
    backgroundColor: "#012645",
    borderRadius: 16,
    maxHeight: "70%",
    padding: 12,
  },
  sheetRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F5079",
  },
  sheetTitle: { color: "#FFFFFF", fontSize: 14, fontFamily: "PoppinsSemiBold" },
  sheetSub: { color: "#B9CBD9", fontSize: 11, marginTop: 2 },
});
