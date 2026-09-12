import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Layout from "../(settings)/Layout";
import Loading from "@/components/Reuseables/Loading";
import Head from "@/components/Home/Head";
import AlertBanner from "@/components/Reuseables/AlertBanner";
import { useBetDraftStore } from "@/store/useBetDraftStore";
import { useCreateCustomBet } from "@/hooks/useBets";
import { formatCurrency, potentialReturn } from "@/constants/functions";

/**
 * PLACEHOLDER. The bets API exposes no fee fields at all, so this rate comes
 * from the mockup, not the backend. Replace it with the real figure once the
 * API returns one - it must not be presented as authoritative before then.
 */
const PLATFORM_FEE_RATE = 0.05;

export default function ReviewBetScreen() {
  const { match, outcome, outcomeLabel, betType, stake, clearDraft } =
    useBetDraftStore();

  const { mutateAsync: createBet, isPending } = useCreateCustomBet();

  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!match || !outcome) {
    return (
      <Layout header="Review Bet">
        <View style={styles.empty}>
          <Text style={styles.hint}>
            Nothing to review. Go back and build your bet.
          </Text>
        </View>
      </Layout>
    );
  }

  const toWin = potentialReturn(stake, outcome.price) ?? 0;
  const fee = stake * PLATFORM_FEE_RATE;
  const net = stake - fee;

  const handlePost = async () => {
    setError(null);

    try {
      await createBet({
        matchId: match.id,
        betType,
        prediction: outcome.prediction,
        odds: outcome.price,
        stake,
      });

      setCreated(true);
    } catch {
      setError("Could not post this bet. Check your balance and try again.");
    }
  };

  return (
    <Layout header="Review Bet">
      <Head compact />

      {error ? <AlertBanner message={error} /> : null}

      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        {/* Match banner */}
        <View style={styles.banner}>
          <Text style={styles.league}>
            {match.league?.name?.toUpperCase() ?? ""}
          </Text>
          <Text style={styles.fixture}>
            {match.homeTeam} vs {match.awayTeam}
          </Text>
        </View>

        <View style={[styles.card, styles.row]}>
          <View style={styles.rowStart}>
            <Ionicons name="football" size={16} color="#FFA500" />
            <Text style={styles.cardLabel}>Match Prediction</Text>
          </View>

          <View style={styles.chip}>
            <Text style={styles.chipText}>{outcomeLabel}</Text>
          </View>
        </View>

        <View style={styles.figuresRow}>
          <View style={[styles.card, styles.figure]}>
            <Text style={styles.figureLabel}>YOUR STAKE</Text>
            <Text style={styles.figureValue}>{formatCurrency(stake)}</Text>
          </View>

          <View style={[styles.card, styles.figure]}>
            <Text style={styles.figureLabel}>TO WIN</Text>
            <Text style={styles.figureValue}>{formatCurrency(toWin)}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>FEE BREAKDOWN</Text>

        <View style={styles.card}>
          <View style={[styles.row, styles.feeRow]}>
            <Text style={styles.feeLabel}>P2P Platform Fee (5%)</Text>
            <Text style={styles.feeValue}>- {formatCurrency(fee)}</Text>
          </View>

          <View style={[styles.row, styles.feeRow]}>
            <Text style={styles.feeLabel}>Network Processing</Text>
            <Text style={styles.feeFree}>FREE</Text>
          </View>

          <View style={styles.divider} />

          <View style={[styles.row, styles.feeRow]}>
            <Text style={styles.netLabel}>Net Post Amount</Text>
            <Text style={styles.netValue}>{formatCurrency(net)}</Text>
          </View>
        </View>

        <View style={[styles.card, styles.rowStart, styles.notice]}>
          <Ionicons name="information-circle" size={16} color="#6FA8DC" />
          <Text style={styles.noticeText}>
            Your bet will be listed on the P2P market. It will be active once
            another player accepts the counter-bet.
          </Text>
        </View>

        <Pressable
          onPress={handlePost}
          disabled={isPending}
          style={[styles.action, isPending ? styles.actionBusy : null]}
        >
          {isPending ? (
            <Loading inline size={24} />
          ) : (
            <Text style={styles.actionText}>Post Bet to P2P Market</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.editLink}>
          <Text style={styles.editText}>Go Back &amp; Edit</Text>
        </Pressable>
      </ScrollView>

      {/* Bet created */}
      <Modal visible={created} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.tick}>
              <Ionicons name="checkmark" size={34} color="#FFC107" />
            </View>

            <Text style={styles.createdTitle}>Bet Created!</Text>
            <Text style={styles.createdBody}>
              Your peer-to-peer bet is now live. We&apos;ll notify you once
              it&apos;s matched by another player.
            </Text>

            <Pressable
              onPress={() => {
                clearDraft();
                setCreated(false);
                router.replace("/(p2p)/my-bets");
              }}
              style={styles.primary}
            >
              <Text style={styles.primaryText}>View Bet Status</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                clearDraft();
                setCreated(false);
                router.replace("/(protected)/(tabs)");
              }}
              style={styles.secondary}
            >
              <Text style={styles.secondaryText}>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: 16, paddingBottom: 40, paddingTop: 12 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  banner: {
    height: 120,
    borderRadius: 12,
    backgroundColor: "#0B2136",
    justifyContent: "flex-end",
    padding: 14,
    marginBottom: 12,
  },
  league: { color: "#B9CBD9", fontSize: 9, letterSpacing: 1 },
  fixture: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#012645",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowStart: { flexDirection: "row", alignItems: "center" },
  cardLabel: { color: "#FFFFFF", fontSize: 13, marginLeft: 8 },
  chip: {
    backgroundColor: "#FFC107",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  chipText: { color: "#000000", fontSize: 10, fontFamily: "PoppinsSemiBold" },
  figuresRow: { flexDirection: "row", gap: 12 },
  figure: { flex: 1 },
  figureLabel: { color: "#9FB6C9", fontSize: 9, letterSpacing: 0.5 },
  figureValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "PoppinsBold",
    marginTop: 6,
  },
  sectionLabel: {
    color: "#9FB6C9",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
  },
  feeRow: { paddingVertical: 6 },
  feeLabel: { color: "#B9CBD9", fontSize: 12 },
  feeValue: { color: "#FFFFFF", fontSize: 12 },
  feeFree: { color: "#4CAF50", fontSize: 12, fontFamily: "PoppinsSemiBold" },
  divider: { height: 1, backgroundColor: "#1F5079", marginVertical: 4 },
  netLabel: { color: "#FFFFFF", fontSize: 13, fontFamily: "PoppinsSemiBold" },
  netValue: { color: "#FFC107", fontSize: 13, fontFamily: "PoppinsSemiBold" },
  notice: { alignItems: "flex-start" },
  noticeText: {
    color: "#B9CBD9",
    fontFamily: "Poppins",
    fontSize: 12,
    lineHeight: 19.5,
    marginLeft: 8,
    flex: 1,
  },
  action: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  actionBusy: { opacity: 0.7 },
  actionText: { color: "#000000", fontSize: 15, fontFamily: "PoppinsSemiBold" },
  editLink: { alignItems: "center", marginTop: 12 },
  editText: { color: "#B9CBD9", fontSize: 12 },
  hint: { color: "#B9CBD9", fontSize: 12, textAlign: "center" },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  sheet: {
    backgroundColor: "#012645",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  tick: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  createdTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
  createdBody: {
    color: "#B9CBD9",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  primary: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { color: "#000000", fontSize: 14, fontFamily: "PoppinsSemiBold" },
  secondary: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    backgroundColor: "#0B2136",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  secondaryText: { color: "#FFFFFF", fontSize: 14 },
});
