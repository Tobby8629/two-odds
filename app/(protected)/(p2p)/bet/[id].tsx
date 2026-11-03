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
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "../../(settings)/Layout";
import Head from "@/components/Home/Head";
import Loading from "@/components/Reuseables/Loading";
import AlertBanner from "@/components/Reuseables/AlertBanner";
import UserAvatar from "@/components/Reuseables/UserAvatar";
import VsMark from "@/assets/SVGs/icons/VsMark";
import { useBet, useTakeBet } from "@/hooks/useBets";
import { usePublicProfile } from "@/hooks/useProfile";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import {
  apiErrorMessage,
  formatCurrency,
  potentialReturn,
} from "@/constants/functions";
import { DEMO_MODE } from "@/constants/demo";

/** Turns a prediction object into a readable line. */
const describe = (prediction?: Record<string, unknown>) => {
  const entries = Object.entries(prediction ?? {});

  if (!entries.length) return "Custom bet";

  return entries.map(([k, v]) => `${k}: ${String(v)}`).join(", ");
};

export default function BetDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const { data: bet, isPending, isError } = useBet(id);
  const { mutateAsync: takeBet, isPending: isJoining } = useTakeBet();
  const { data: balance } = useWalletBalance();

  /* Creator identity is public, so the opponent card is real data. */
  const creatorId = bet?.creatorId ?? bet?.userId;
  const { data: creator } = usePublicProfile(creatorId);

  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stake = Number(bet?.stake ?? 0);
  const payout = potentialReturn(stake, bet?.odds) ?? 0;
  const currency = (bet?.currency as "NGN" | "USDT") ?? "NGN";

  const handleJoin = async () => {
    setError(null);

    if (DEMO_MODE) {
      setJoined(true);
      return;
    }

    try {
      await takeBet(bet!.id);
      setJoined(true);
    } catch (e) {
      const message = apiErrorMessage(e, "Could not join this bet.");
      console.warn("Take bet failed:", message, e);
      setError(message);
    }
  };

  return (
    <View style={styles.screen}>
      <Head compact />

      <Layout header="Bet Details" topInset={false}>
        {error ? <AlertBanner message={error} /> : null}

        {isPending ? (
          <View style={styles.centered}>
            <Loading inline size={56} />
          </View>
        ) : isError || !bet ? (
          <View style={styles.centered}>
            <Text style={styles.hint}>Could not load this bet.</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={[
              styles.page,
              { paddingBottom: 48 + insets.bottom },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* Who posted it */}
            <View style={styles.creator}>
              <UserAvatar
                uri={creator?.avatarUrl}
                fallbackKey={creatorId ?? bet.id}
                size={64}
              />

              <Text style={styles.handle}>
                {creator?.username ? `@${creator.username}` : "Opponent"}
              </Text>

              {creator?.winRate !== undefined && (
                <View style={styles.winChip}>
                  <Text style={styles.winChipText}>
                    {Math.round(creator.winRate * 100)}% WIN RATE
                  </Text>
                </View>
              )}
            </View>

            {/* Fixture */}
            <View style={styles.card}>
              <View style={styles.fixtureRow}>
                <Text numberOfLines={1} style={styles.team}>
                  {bet.matchId ? "Home" : "Team A"}
                </Text>

                <VsMark width={40} height={31} color="#64748B" />

                <Text numberOfLines={1} style={styles.team}>
                  {bet.matchId ? "Away" : "Team B"}
                </Text>
              </View>
            </View>

            {/* Their call */}
            <View style={styles.card}>
              <Text style={styles.cardKicker}>
                {creator?.username
                  ? `${creator.username.toUpperCase()}'S PREDICTION`
                  : "PREDICTION"}
              </Text>

              <View style={styles.predictionRow}>
                <Text style={styles.prediction}>
                  {describe(bet.prediction)}
                </Text>

                <View style={styles.oddsChip}>
                  <Text style={styles.oddsChipText}>
                    {Number(bet.odds ?? 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Figures */}
            <View style={styles.figuresRow}>
              <View style={[styles.card, styles.figure]}>
                <Text style={styles.figureLabel}>STAKE REQUIRED</Text>
                <Text style={styles.figureValue}>
                  {formatCurrency(stake, currency)}
                </Text>
              </View>

              <View style={[styles.card, styles.figure]}>
                <Text style={styles.figureLabel}>EST. PAYOUT</Text>
                <Text style={styles.figureValue}>
                  {formatCurrency(payout, currency)}
                </Text>
              </View>
            </View>

            <Text style={styles.balance}>
              Your Balance: {formatCurrency(balance?.ngn?.balance, "NGN")}
            </Text>

            <Pressable
              onPress={handleJoin}
              disabled={isJoining}
              style={[styles.join, isJoining ? styles.joinBusy : null]}
            >
              {isJoining ? (
                <Loading inline size={24} />
              ) : (
                <Text style={styles.joinText}>
                  Join Bet • {formatCurrency(stake, currency)}
                </Text>
              )}
            </Pressable>
          </ScrollView>
        )}
      </Layout>

      {/* Joined */}
      <Modal visible={joined} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.tick}>
              <Ionicons name="checkmark" size={34} color="#0A3A5C" />
            </View>

            <Text style={styles.joinedTitle}>Bet Joined Successfully!</Text>
            <Text style={styles.joinedBody}>
              Your P2P match has been confirmed and is now active.
            </Text>

            <View style={styles.summary}>
              <View style={styles.matchedChip}>
                <Text style={styles.matchedChipText}>MATCH MATCHED</Text>
              </View>

              <Text style={styles.summaryPrediction}>
                Prediction: {describe(bet?.prediction)}
              </Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  {creator?.username ? `@${creator.username}` : "Opponent"}
                </Text>

                <View>
                  <Text style={styles.summaryLabel}>TOTAL POT</Text>
                  <Text style={styles.summaryValue}>
                    {formatCurrency(stake * 2, currency)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.deducted}>
              {formatCurrency(stake, currency)} deducted from wallet balance
            </Text>

            <Pressable
              onPress={() => {
                setJoined(false);
                router.replace("/(p2p)/my-bets");
              }}
              style={styles.primary}
            >
              <Text style={styles.primaryText}>View My Bets</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setJoined(false);
                router.back();
              }}
              style={styles.secondary}
            >
              <Text style={styles.secondaryText}>Back to P2P Market</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#003C6F" },
  page: { paddingHorizontal: 16, paddingTop: 16 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  hint: { color: "#B9CBD9", fontSize: 12, textAlign: "center" },
  creator: { alignItems: "center", marginBottom: 18 },
  handle: {
    color: "#FFFFFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    marginTop: 8,
  },
  winChip: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },
  winChipText: { color: "#000000", fontSize: 9, fontFamily: "PoppinsSemiBold" },
  card: {
    backgroundColor: "#012645",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  fixtureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: { color: "#FFFFFF", fontSize: 13, fontFamily: "PoppinsSemiBold", flex: 1, textAlign: "center" },
  cardKicker: { color: "#9FB6C9", fontSize: 9, letterSpacing: 0.8 },
  predictionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  prediction: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    flex: 1,
    marginRight: 10,
  },
  oddsChip: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  oddsChipText: { color: "#000000", fontSize: 10, fontFamily: "PoppinsSemiBold" },
  figuresRow: { flexDirection: "row", gap: 12 },
  figure: { flex: 1 },
  figureLabel: { color: "#9FB6C9", fontSize: 9, letterSpacing: 0.5 },
  figureValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginTop: 6,
  },
  balance: {
    color: "#B9CBD9",
    fontSize: 11,
    textAlign: "right",
    marginBottom: 10,
  },
  join: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
  },
  joinBusy: { opacity: 0.7 },
  joinText: { color: "#000000", fontSize: 15, fontFamily: "PoppinsSemiBold" },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  sheet: {
    backgroundColor: "#012645",
    borderRadius: 16,
    padding: 22,
    alignItems: "center",
  },
  tick: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  joinedTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
  joinedBody: {
    color: "#B9CBD9",
    fontFamily: "Poppins",
    fontSize: 12,
    lineHeight: 19.5,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  summary: {
    width: "100%",
    backgroundColor: "#0B2136",
    borderRadius: 10,
    padding: 14,
  },
  matchedChip: {
    alignSelf: "flex-start",
    backgroundColor: "#FFC107",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  matchedChipText: { color: "#000000", fontSize: 8, fontFamily: "PoppinsSemiBold" },
  summaryPrediction: { color: "#FFC107", fontSize: 12, marginTop: 8 },
  summaryRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10,
  },
  summaryLabel: { color: "#9FB6C9", fontSize: 10 },
  summaryValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PoppinsBold",
    textAlign: "right",
  },
  deducted: {
    color: "#B9CBD9",
    fontSize: 10,
    marginTop: 12,
    marginBottom: 16,
    textAlign: "center",
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
