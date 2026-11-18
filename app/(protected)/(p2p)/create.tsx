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
import Head from "@/components/Home/Head";
import { DEMO_MODE, SIMULATE } from "@/constants/demo";
import { previewMatches } from "@/constants/previewMatches";
import { useBetDraftStore } from "@/store/useBetDraftStore";
import { Match, MarketOutcome } from "@/types/sports.types";

const FIELD_WIDTH = 358;

/** Shown before a match is picked, so the layout reads the same. */
const PLACEHOLDER_PREDICTIONS = [
  "Team A to Win",
  "Team B to Win",
  "Draw",
];

/** Predictions arrive in several shapes depending on the market. */
const outcomeLabel = (match: Match, outcome: MarketOutcome) => {
  const p = (outcome.prediction ?? {}) as Record<string, unknown>;

  const side = (t: unknown) =>
    t === "home" ? match.homeTeam : t === "away" ? match.awayTeam : String(t);

  if (p.winner !== undefined) {
    if (p.winner === "draw") return "Draw";
    return side(p.winner) + " to Win";
  }

  if (p.line !== undefined && p.type !== undefined) {
    const who = p.team !== undefined ? side(p.team) + " " : "";
    return who + String(p.type).replace(/^./, (c) => c.toUpperCase()) + " " + p.line;
  }

  if (p.line !== undefined && p.team !== undefined) {
    const line = Number(p.line);
    return side(p.team) + " " + (line > 0 ? "+" : "") + line;
  }

  const first = Object.values(p)[0];
  return first !== undefined ? String(first) : "Outcome";
};

/** Human labels for the market headings. */
const marketLabel = (betType: string) =>
  betType
    .toLowerCase()
    .split("_")
    .map((w) => w.replace(/^./, (c) => c.toUpperCase()))
    .join(" ");

export default function CreateP2PBetScreen() {
  const [sportId, setSportId] = useState("");
  const [match, setMatch] = useState<Match | null>(null);
  const [outcomeIndex, setOutcomeIndex] = useState<number | null>(null);
  const [stake, setStake] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: matches, isPending: loadingMatches } = useMatches({
    status: "UPCOMING",
    limit: 50,
  });

  const setDraft = useBetDraftStore((state) => state.setDraft);

  /*
   * Only 14 of 20 matches carry MATCH_WINNER, so fall back to the first
   * market the provider actually sent rather than showing nothing.
   */
  const market = useMemo(() => {
    const markets = match?.markets ?? [];

    return (
      markets.find((m) => m.betType === "MATCH_WINNER") ?? markets[0]
    );
  }, [match]);

  const visibleMatches = useMemo(() => {
    const source = DEMO_MODE ? previewMatches : matches ?? [];
    const filtered = sportId ? source.filter((m) => m.league?.sport?.id === sportId) : source;

    /*
     * Simulation: the sports API has few matches with odds, so the local
     * fixtures are always offered as well, so a bet can always be built.
     */
    if (SIMULATE.p2p && !DEMO_MODE) {
      const known = new Set(filtered.map((m) => m.id));
      return [...previewMatches.filter((m) => !known.has(m.id)), ...filtered];
    }

    return filtered;
  }, [matches, sportId]);

  const hasOdds = Boolean(match && market && market.outcomes.length);

  const selectedOutcome =
    outcomeIndex !== null ? market?.outcomes?.[outcomeIndex] : undefined;

  const canSubmit = Boolean(match && selectedOutcome) && Number(stake) > 0;

  const handleCreate = () => {
    if (!match || !selectedOutcome) {
      setError("Choose a match and a prediction first");
      return;
    }

    if (!(Number(stake) > 0)) {
      setError("Enter a stake");
      return;
    }

    setError(null);

    /* Posting happens on the review screen, after the user confirms. */
    setDraft({
      match,
      outcome: selectedOutcome,
      outcomeLabel: outcomeLabel(match, selectedOutcome),
      betType: market!.betType,
      stake: Number(stake),
    });

    router.push("/(p2p)/review");
  };

  return (
    <View style={styles.screen}>
      <Head compact />

      <Layout header="Create P2P Bet" topInset={false}>

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
            selectSport={sportId}
            handlePress={(next) => {
              setSportId(next === sportId ? "" : next);
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
              style={styles.matchText}
            >
              {match ? match.homeTeam + " vs " + match.awayTeam : "Choose Match"}
            </Text>
            <Ionicons name="chevron-expand" size={18} color="#B9CBD9" />
          </Pressable>

          <Text style={styles.sectionLabel}>
            Your Prediction
            {hasOdds ? "  ·  " + marketLabel(market!.betType) : ""}
          </Text>

          {hasOdds ? (
            market!.outcomes.map((outcome, i) => (
              <Pressable
                key={i}
                onPress={() => setOutcomeIndex(i)}
                style={[
                  styles.field,
                  styles.fieldBordered,
                  styles.row,
                  outcomeIndex === i ? styles.fieldSelected : null,
                ]}
              >
                <Text numberOfLines={1} style={styles.optionText}>
                  {outcomeLabel(match!, outcome)}
                </Text>

                <View style={styles.rowEnd}>
                  <Text style={styles.odds}>{outcome.price?.toFixed(2)}</Text>
                  <View
                    style={[
                      styles.radio,
                      outcomeIndex === i ? styles.radioOn : null,
                    ]}
                  >
                    {outcomeIndex === i ? (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    ) : null}
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <>
              {/* Inert rows so the layout reads the same before odds load. */}
              {PLACEHOLDER_PREDICTIONS.map((label: string) => (
                <Pressable
                  key={label}
                  onPress={() => setPickerOpen(true)}
                  style={[styles.field, styles.fieldBordered, styles.row]}
                >
                  <Text numberOfLines={1} style={styles.optionText}>
                    {label}
                  </Text>
                  <View style={styles.radio} />
                </Pressable>
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
            placeholderTextColor="#9CA6BA"
            style={[styles.field, styles.input]}
          />

          <Pressable
            onPress={handleCreate}
            disabled={!canSubmit}
            style={[
              styles.action,
              { backgroundColor: canSubmit ? "#E59A0B" : "#7C93A6" },
            ]}
          >
            <Text style={styles.actionText}>Create Bet</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={pickerOpen} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setPickerOpen(false)}>
          <View style={styles.sheet}>
            {loadingMatches && !SIMULATE.p2p ? (
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#003C6F" },
  page: { paddingHorizontal: 16, paddingBottom: 40 },
  /* Figma: "Your Prediction" Inter Bold 18/22.5 ls -0.27 white. */
  sectionLabel: {
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 22.5,
    letterSpacing: -0.27,
    marginTop: 18,
    marginBottom: 10,
  },
  field: {
    width: "100%",
    maxWidth: FIELD_WIDTH,
    minWidth: 160,
    height: 56,
    /* Figma "Options": 358x56, radius 12, #021C32 at 70%. */
    borderRadius: 12,
    backgroundColor: "rgba(2,28,50,0.7)",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  /* The prediction rows show an outline in the design; its colour is not read yet. */
  fieldBordered: { borderWidth: 1, borderColor: "#000000" },
  /* The design's selected state is not read yet; amber matches the radio. */
  fieldSelected: { borderColor: "#E59A0B", backgroundColor: "rgba(229,154,11,0.12)" },
  matchText: { color: "#FFFFFF", fontFamily: "Inter_400Regular", fontSize: 16, lineHeight: 24, flex: 1, marginRight: 8 },
  optionText: { color: "#FFFFFF", fontFamily: "Inter_500Medium", fontSize: 14, lineHeight: 21, flex: 1, marginRight: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowEnd: { flexDirection: "row", alignItems: "center" },
  value: { color: "#FFFFFF", fontSize: 14, flex: 1, marginRight: 8 },
  placeholder: { color: "#B9CBD9", fontSize: 14, flex: 1 },
  /* Figma "Input": 358x52, radius 12, #012645; placeholder Inter Regular 16 #9CA6BA. */
  input: { height: 52, backgroundColor: "#012645", color: "#FFFFFF", fontFamily: "Inter_400Regular", fontSize: 16 },
  odds: { color: "#FFA500", fontSize: 12, marginRight: 10 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B9CBD9",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: { borderColor: "#FFA500", backgroundColor: "#FFA500" },
  hint: { color: "#B9CBD9", fontSize: 12, marginBottom: 12 },
  
  
  
  
  action: {
    width: "100%",
    maxWidth: 480,
    minWidth: 84,
    height: 48,
    /* Figma "Create Bet": 358x48, radius 12, padding 20, #E59A0B. */
    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  actionText: {
    color: "#000000",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.24,
    fontFamily: "Inter_700Bold",
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
