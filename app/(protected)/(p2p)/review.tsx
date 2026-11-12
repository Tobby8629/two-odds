import React, { useMemo, useState } from "react";
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
import { DEMO_MODE } from "@/constants/demo";
import Rocket from "@/assets/SVGs/icons/Rocket";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlertBanner from "@/components/Reuseables/AlertBanner";
import { useBetDraftStore } from "@/store/useBetDraftStore";
import { useCreateCustomBet } from "@/hooks/useBets";
import {
  apiErrorMessage,
  formatCurrency,
  potentialReturn,
} from "@/constants/functions";

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

  const insets = useSafeAreaInsets();
  const betId = useMemo(() => `#B-${Math.floor(1000 + Math.random() * 9000)}-01`, []);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!match || !outcome) {
    return (
      <View style={styles.screen}>
        <Head compact />

        <Layout header="Review Bet" topInset={false}>
          <View style={styles.empty}>
            <Text style={styles.hint}>
              Nothing to review. Go back and build your bet.
            </Text>
          </View>
        </Layout>
      </View>
    );
  }

  const toWin = potentialReturn(stake, outcome.price) ?? 0;
  const fee = stake * PLATFORM_FEE_RATE;
  const net = stake - fee;

  const handlePost = async () => {
    setError(null);

    if (DEMO_MODE) {
      setCreated(true);
      return;
    }

    try {
      await createBet({
        matchId: match.id,
        betType,
        prediction: outcome.prediction,
        odds: Number(outcome.price.toFixed(2)),
        stake,
      });

      setCreated(true);
    } catch (e) {
      /* The backend explains the refusal, so show that rather than a guess. */
      const message = apiErrorMessage(
        e,
        "Could not post this bet. Please try again."
      );

      console.warn("Create bet failed:", message, e);
      setError(message);
    }
  };

  return (
    <View style={styles.screen}>
      <Head compact />

      <ScrollView
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 40 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/*
         * Figma "Review Bet" frame (393 wide, #003C6F). Read from the design:
         * title Inter Bold 18/22.5 ls -0.27 white; ID Lexend SemiBold 14/20
         * #F1F5F9; league Lexend Bold 10/15 ls 0.5 uppercase #83BDC7; fixture
         * Lexend Bold 20/28 white; banner gradient black 80/20/0%; "Match
         * Prediction" Lexend Medium 14/20 #94A3B8; chip padding 4/12 radius
         * full #E59A0B with Lexend Bold 12/16 #0F2316; TO WIN box radius 24
         * padding 20 gap 4 #012645 with a 1px black border; labels Lexend
         * Medium 12/16 ls 0.3 uppercase white; amounts Lexend Bold 24/32;
         * fee card radius 24 padding 20 gap 12 #003460 with a 1px white 5%
         * border; fee label Regular 14/20 #94A3B8, values Medium 14/20 white;
         * divider 300x1 white 10%; net row Bold 14/20 (white / #E59A0B);
         * notice Lexend Regular 12/19.5 #BFDBFE 80%; post button radius 24
         * padding 16 gap 8 #E59A0B with a #06F957 30% glow (blur 20), label
         * Lexend Bold 18/28 #000000; edit link Lexend Medium 14/20 #94A3B8.
         * Not read: the banner card's own radius / fill, the stake box's fill,
         * the section label colour and the notice box's frame.
         */}
        <View style={{ alignItems: "center", paddingHorizontal: 24 }}>
          <Text style={{ color: "#FFFFFF", fontFamily: "Inter_700Bold", fontSize: 18, lineHeight: 22.5, letterSpacing: -0.27 }}>
            Review Bet
          </Text>
          <Text style={{ color: "#F1F5F9", fontFamily: "Lexend_600SemiBold", fontSize: 14, lineHeight: 20, marginTop: 4 }}>
            ID: {betId}
          </Text>
        </View>

        {error ? <AlertBanner message={error} /> : null}

        {/* Fixture and call */}
        <View
          style={{
            marginTop: 16,
            marginHorizontal: 24,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "rgba(0,52,96,0.7)",
          }}
        >
          <View style={{ height: 160, justifyContent: "flex-end", backgroundColor: "#0B2A4A", padding: 20 }}>
            <View
              pointerEvents="none"
              style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0, backgroundColor: "rgba(0,0,0,0.5)" }}
            />
            <Text
              style={{
                color: "#83BDC7",
                fontFamily: "Lexend_700Bold",
                fontSize: 10,
                lineHeight: 15,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {match.league?.name ?? ""}
            </Text>
            <Text style={{ color: "#FFFFFF", fontFamily: "Lexend_700Bold", fontSize: 20, lineHeight: 28 }}>
              {match.homeTeam} vs {match.awayTeam}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Ionicons name="football" size={18} color="#E59A0B" />
              <Text style={{ color: "#94A3B8", fontFamily: "Lexend_500Medium", fontSize: 14, lineHeight: 20, marginLeft: 8 }}>
                Match Prediction
              </Text>
            </View>

            <View style={{ paddingVertical: 4, paddingHorizontal: 12, borderRadius: 999, backgroundColor: "#E59A0B", maxWidth: "55%" }}>
              <Text numberOfLines={1} style={{ color: "#0F2316", fontFamily: "Lexend_700Bold", fontSize: 12, lineHeight: 16 }}>
                {outcomeLabel}
              </Text>
            </View>
          </View>
        </View>

        {/* Stake and payout */}
        <View style={{ flexDirection: "row", gap: 16, marginTop: 16, marginHorizontal: 24 }}>
          <View
            style={{
              flex: 1,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: 20,
              gap: 4,
            }}
          >
            <Text style={{ color: "#94A3B8", fontFamily: "Lexend_500Medium", fontSize: 12, lineHeight: 16, letterSpacing: 0.3, textTransform: "uppercase" }}>
              Your Stake
            </Text>
            <Text style={{ color: "#FFFFFF", fontFamily: "Lexend_700Bold", fontSize: 24, lineHeight: 32 }}>
              {formatCurrency(stake)}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: "#000000",
              backgroundColor: "#012645",
              padding: 20,
              gap: 4,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontFamily: "Lexend_500Medium", fontSize: 12, lineHeight: 16, letterSpacing: 0.3, textTransform: "uppercase" }}>
              To Win
            </Text>
            <Text style={{ color: "#FFFFFF", fontFamily: "Lexend_700Bold", fontSize: 24, lineHeight: 32 }}>
              {formatCurrency(toWin)}
            </Text>
          </View>
        </View>

        {/* Fees */}
        <Text
          style={{
            color: "#94A3B8",
            fontFamily: "Lexend_700Bold",
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginTop: 24,
            marginHorizontal: 24,
          }}
        >
          Fee Breakdown
        </Text>

        <View
          style={{
            marginTop: 12,
            marginHorizontal: 24,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.05)",
            backgroundColor: "#003460",
            padding: 20,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#94A3B8", fontFamily: "Lexend_400Regular", fontSize: 14, lineHeight: 20 }}>
              P2P Platform Fee ({Math.round(PLATFORM_FEE_RATE * 100)}%)
            </Text>
            <Text style={{ color: "#FFFFFF", fontFamily: "Lexend_500Medium", fontSize: 14, lineHeight: 20 }}>
              - {formatCurrency(fee)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#94A3B8", fontFamily: "Lexend_400Regular", fontSize: 14, lineHeight: 20 }}>
              Network Processing
            </Text>
            <Text style={{ color: "#FFFFFF", fontFamily: "Lexend_500Medium", fontSize: 14, lineHeight: 20 }}>FREE</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#FFFFFF", fontFamily: "Lexend_700Bold", fontSize: 14, lineHeight: 20 }}>
              Net Post Amount
            </Text>
            <Text style={{ color: "#E59A0B", fontFamily: "Lexend_700Bold", fontSize: 14, lineHeight: 20 }}>
              {formatCurrency(net)}
            </Text>
          </View>
        </View>

        {/* Notice */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginTop: 16,
            marginHorizontal: 24,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: "rgba(191,219,254,0.2)",
            backgroundColor: "rgba(59,130,246,0.1)",
            padding: 16,
          }}
        >
          <Ionicons name="information-circle-outline" size={18} color="#BFDBFE" />
          <Text style={{ flex: 1, color: "rgba(191,219,254,0.8)", fontFamily: "Lexend_400Regular", fontSize: 12, lineHeight: 19.5 }}>
            Your bet will be listed on the P2P market. It will be active once another player accepts the counter-bet.
          </Text>
        </View>

        {/* Actions */}
        <Pressable
          onPress={handlePost}
          disabled={isPending}
          style={{
            marginTop: 32,
            marginHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingVertical: 16,
            borderRadius: 24,
            backgroundColor: "#E59A0B",
            shadowColor: "#06F957",
            shadowOpacity: 0.3,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 0 },
            elevation: 8,
            opacity: isPending ? 0.7 : 1,
          }}
        >
          {isPending ? (
            <Loading inline size={28} />
          ) : (
            <>
              <Text style={{ color: "#000000", fontFamily: "Lexend_700Bold", fontSize: 18, lineHeight: 28 }}>
                Post Bet to P2P Market
              </Text>
              <Rocket width={22} height={22} />
            </>
          )}
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 20 }}
        >
          <Ionicons name="pencil" size={14} color="#94A3B8" />
          <Text style={{ color: "#94A3B8", fontFamily: "Lexend_500Medium", fontSize: 14, lineHeight: 20 }}>
            Go Back & Edit
          </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#003C6F" },
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
  feeFree: { color: "#FFFFFF", fontSize: 12, fontFamily: "PoppinsSemiBold" },
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
  editLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingVertical: 12,
  },
  editText: { color: "#FFFFFF", fontSize: 12, marginLeft: 6 },
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
