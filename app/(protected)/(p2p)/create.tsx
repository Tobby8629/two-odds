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
import { useMatches, useSports } from "@/hooks/useMatches";
import { useCreateCustomBet } from "@/hooks/useBets";
import { Match, MarketOutcome } from "@/types/sports.types";

const FIELD_WIDTH = 358;

/** Turns { winner: "home" } into a readable row label. */
const outcomeLabel = (match: Match, outcome: MarketOutcome) => {
  const value = String(Object.values(outcome.prediction ?? {})[0] ?? "");

  if (value === "home") return match.homeTeam + " to Win";
  if (value === "away") return match.awayTeam + " to Win";
  if (value === "draw") return "Draw";

  return value || "Outcome";
};

export default function CreateP2PBetScreen() {
  const [sportId, setSportId] = useState<string | undefined>();
  const [match, setMatch] = useState<Match | null>(null);
  const [outcomeIndex, setOutcomeIndex] = useState<number | null>(null);
  const [stake, setStake] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: sports } = useSports();
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
    if (!matches) return [];
    if (!sportId) return matches;

    return matches.filter((m) => m.league?.sport?.id === sportId);
  }, [matches, sportId]);

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
          <Text style={styles.sectionLabel}>Select Sport</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 8 }}
          >
            {(sports ?? []).map((sport) => {
              const active = sport.id === sportId;

              return (
                <Pressable
                  key={sport.id}
                  onPress={() => {
                    setSportId(active ? undefined : sport.id);
                    setMatch(null);
                    setOutcomeIndex(null);
                  }}
                  style={[styles.sportChip, active ? styles.sportChipOn : null]}
                >
                  <Text
                    numberOfLines={1}
                    style={active ? styles.sportTextOn : styles.sportText}
                  >
                    {sport.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

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

          {!match ? (
            <Text style={styles.hint}>Choose a match to see its odds.</Text>
          ) : !market || !market.outcomes.length ? (
            <Text style={styles.hint}>
              Odds have not synced for this match yet.
            </Text>
          ) : (
            market.outcomes.map((outcome, i) => (
              <Pressable
                key={i}
                onPress={() => setOutcomeIndex(i)}
                style={[styles.field, styles.row]}
              >
                <Text numberOfLines={1} style={styles.value}>
                  {outcomeLabel(match, outcome)}
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
    width: FIELD_WIDTH,
    maxWidth: "100%",
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
  sportChip: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#012645",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    paddingHorizontal: 4,
  },
  sportChipOn: { backgroundColor: "#FFA500" },
  sportText: { color: "#B9CBD9", fontSize: 9, textAlign: "center" },
  sportTextOn: { color: "#000000", fontSize: 9, textAlign: "center" },
  action: {
    width: FIELD_WIDTH,
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
