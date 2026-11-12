import React, { useState } from "react";
import { Pressable, ScrollView, Share, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loading from "@/components/Reuseables/Loading";
import AlertBanner from "@/components/Reuseables/AlertBanner";
import UserAvatar from "@/components/Reuseables/UserAvatar";
import BetJoined from "@/components/P2P/BetJoined";
import {
  americanOdds,
  betRef,
  firstName,
  kickoffLabel,
  matchTitle,
  predictionLabel,
  predictionTitle,
} from "@/components/P2P/betLabels";
import { useBet, useTakeBet } from "@/hooks/useBets";
import { usePublicProfile } from "@/hooks/useProfile";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useAuthStore } from "@/store/useAuthStore";
import { apiErrorMessage, formatCurrency, potentialReturn } from "@/constants/functions";
import { DEMO_MODE } from "@/constants/demo";

/*
 * Figma "Bet Details" frame (393 wide, #003C6F). Read from the design:
 * - header bar 393x56 #012A4D; back button 40px white 10%; title Manrope Bold
 *   14/20 ls 1.4 uppercase #94A3B8
 * - creator avatar 80px with a 2px ring; name Manrope Bold 18/28 #F1F5F9;
 *   win-rate chip padding 4/12 radius full #E59A0B 10%, text Bold 10/15
 *   uppercase #E59A0B
 * - match card 358 wide, radius 24, padding 20/20/12/20, gap 24, #00315A 70%,
 *   1px white 10%; team name Manrope Bold 14/20 #F1F5F9; VS Bold 12/16
 *   uppercase #94A3B8 over a 32x2 #E59A0B rule; league / time Medium 12/16
 *   #94A3B8; venue Regular 10/15 ls -0.5 uppercase #94A3B8
 * - prediction card 358 wide, radius 24, padding 20, gap 8, #003460 70%, 1px
 *   white 10%; kicker Bold 10/15 ls 1 uppercase #94A3B8; title ExtraBold 20/28
 *   #F1F5F9; odds chip radius 16 padding 4/12 #E59A0B, text ExtraBold 14/20
 *   #101422; quote Regular 14/20 #94A3B8
 * - stake box (radius 24, padding 20, gap 4, white 5%, 1px white 10%) and
 *   payout box (#01192D 60%, 1px #010101); labels Bold 10/15 ls 1 uppercase
 *   (#94A3B8 / white); amounts ExtraBold 24/32 white
 * - viewers: 32px avatars with a 2px #122210 ring, "+12" Bold 10/15 #F1F5F9,
 *   text Medium 12/16 #94A3B8
 * - sticky bar padding 16/16/32 on #003C6F; "Your Balance" SemiBold 12/16
 *   #64748B and amount SemiBold 12/16 white; button radius 24, padding 16,
 *   #E59A0B, glow #3CF320 30% (y 8, blur 30), label ExtraBold 18/28 ls -0.45
 *   uppercase #000000
 * Not read from Figma: the share button (mirrored from the back button), the
 * creator ring colour, the verified badge size, the viewer "+12" fill, the
 * sticky bar's top-border colour and the gaps between creator rows.
 */
const F = {
  regular: "Manrope_400Regular",
  medium: "Manrope_500Medium",
  semi: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
  extra: "Manrope_800ExtraBold",
} as const;

const Crest = () => (
  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF" }} />
);

export default function BetDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const me = useAuthStore((state) => state.user?.id);

  const { data: bet, isPending, isError } = useBet(id);
  const { mutateAsync: takeBet, isPending: isJoining } = useTakeBet();
  const { data: balance } = useWalletBalance();

  const creatorId = bet?.creatorId ?? bet?.userId;
  const { data: profile } = usePublicProfile(creatorId);

  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stake = Number(bet?.stake ?? 0);
  const payout = potentialReturn(stake, bet?.odds) ?? 0;
  const currency = (bet?.currency as "NGN" | "USDT") ?? "NGN";

  const username = profile?.username ?? bet?.creator?.username;
  const winRate = profile?.winRate ?? bet?.creator?.winRate;
  const handle = username ? `@${username}` : "Opponent";

  const mine = Boolean(me) && creatorId === me;
  const open = (bet?.status ?? "OPEN") === "OPEN";
  const canJoin = open && !mine && !isJoining;

  const walletBalance = formatCurrency(
    Number(currency === "USDT" ? balance?.usdt?.balance ?? 0 : balance?.ngn?.balance ?? 0),
    currency
  );

  const handleJoin = async () => {
    if (!canJoin || !bet) return;
    setError(null);

    if (DEMO_MODE) {
      setJoined(true);
      return;
    }

    try {
      await takeBet(bet.id);
      setJoined(true);
    } catch (e) {
      setError(apiErrorMessage(e, "Could not join this bet."));
    }
  };

  const joinLabel = mine
    ? "This is your bet"
    : !open
      ? "No longer available"
      : `Join Bet • ${formatCurrency(stake, currency)}`;

  return (
    <View style={{ flex: 1, backgroundColor: "#003C6F" }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: "#012A4D",
        }}
      >
        <View
          style={{
            height: 56,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 17,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel="Back"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.1)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </Pressable>

          <Text
            style={{
              color: "#94A3B8",
              fontFamily: F.bold,
              fontSize: 14,
              lineHeight: 20,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            Bet Details
          </Text>

          <Pressable
            onPress={() => bet && Share.share({ message: `${matchTitle(bet)} - ${predictionLabel(bet)}` })}
            accessibilityLabel="Share"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.1)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {error ? <AlertBanner message={error} /> : null}

      {isPending ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Loading inline size={56} />
        </View>
      ) : isError || !bet ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32 }}>
          <Text style={{ color: "#94A3B8", fontFamily: F.medium, fontSize: 12 }}>
            Could not load this bet.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingTop: 34, paddingBottom: 220 + insets.bottom }}
            showsVerticalScrollIndicator={false}
          >
            {/* Creator */}
            <View style={{ alignItems: "center" }}>
              <View>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderWidth: 2,
                    borderColor: "#E59A0B",
                    overflow: "hidden",
                  }}
                >
                  <UserAvatar uri={profile?.avatarUrl} fallbackKey={creatorId ?? bet.id} size={76} />
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: -4,
                    bottom: -4,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: "#E59A0B",
                    borderWidth: 2,
                    borderColor: "#003C6F",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="checkmark" size={11} color="#121022" />
                </View>
              </View>

              <Text style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 18, lineHeight: 28, marginTop: 8 }}>
                {handle}
              </Text>

              {winRate !== undefined && (
                <View
                  style={{
                    marginTop: 4,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    borderRadius: 999,
                    backgroundColor: "rgba(229,154,11,0.1)",
                  }}
                >
                  <Text
                    style={{
                      color: "#E59A0B",
                      fontFamily: F.bold,
                      fontSize: 10,
                      lineHeight: 15,
                      textTransform: "uppercase",
                    }}
                  >
                    {Math.round(winRate * 100)}% Win Rate
                  </Text>
                </View>
              )}
            </View>

            {/* Fixture */}
            <View
              style={{
                marginTop: 37,
                marginHorizontal: 17,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(0,49,90,0.7)",
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: 12,
                gap: 24,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
                  <Crest />
                  <Text
                    numberOfLines={1}
                    style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 14, lineHeight: 20, textAlign: "center" }}
                  >
                    {bet.match?.homeTeam ?? "Team A"}
                  </Text>
                </View>

                <View style={{ alignItems: "center", gap: 8 }}>
                  <Text
                    style={{
                      color: "#94A3B8",
                      fontFamily: F.bold,
                      fontSize: 12,
                      lineHeight: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    VS
                  </Text>
                  <View style={{ width: 32, height: 2, borderRadius: 999, backgroundColor: "#E59A0B" }} />
                </View>

                <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
                  <Crest />
                  <Text
                    numberOfLines={1}
                    style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 14, lineHeight: 20, textAlign: "center" }}
                  >
                    {bet.match?.awayTeam ?? "Team B"}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#94A3B8", fontFamily: F.medium, fontSize: 12, lineHeight: 16, textAlign: "center" }}>
                  {[bet.match?.league, kickoffLabel(bet.match?.startTime)].filter(Boolean).join(" • ")}
                </Text>
                {bet.match?.venue ? (
                  <Text
                    style={{
                      color: "#94A3B8",
                      fontFamily: F.regular,
                      fontSize: 10,
                      lineHeight: 15,
                      letterSpacing: -0.5,
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    {bet.match.venue}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Prediction */}
            <View
              style={{
                marginTop: 41,
                marginHorizontal: 17,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(0,52,96,0.7)",
                padding: 20,
                gap: 8,
              }}
            >
              <Text
                style={{
                  color: "#94A3B8",
                  fontFamily: F.bold,
                  fontSize: 10,
                  lineHeight: 15,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {firstName(username)}'s Prediction
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <Text
                  numberOfLines={2}
                  style={{ flex: 1, color: "#F1F5F9", fontFamily: F.extra, fontSize: 20, lineHeight: 28 }}
                >
                  {predictionTitle(bet)}
                </Text>
                <View style={{ paddingVertical: 4, paddingHorizontal: 12, borderRadius: 16, backgroundColor: "#E59A0B" }}>
                  <Text style={{ color: "#101422", fontFamily: F.extra, fontSize: 14, lineHeight: 20 }}>
                    {americanOdds(bet.odds)}
                  </Text>
                </View>
              </View>

              {bet.commentary ? (
                <Text style={{ color: "#94A3B8", fontFamily: F.regular, fontSize: 14, lineHeight: 20 }}>
                  "{bet.commentary}"
                </Text>
              ) : null}
            </View>

            {/* Stake / payout */}
            <View style={{ flexDirection: "row", gap: 16, marginTop: 41, marginHorizontal: 17 }}>
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
                <Text
                  style={{
                    color: "#94A3B8",
                    fontFamily: F.bold,
                    fontSize: 10,
                    lineHeight: 15,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Stake Required
                </Text>
                <Text style={{ color: "#FFFFFF", fontFamily: F.extra, fontSize: 24, lineHeight: 32 }}>
                  {formatCurrency(stake, currency)}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  borderRadius: 24,
                  borderWidth: 1,
                  borderColor: "#010101",
                  backgroundColor: "rgba(1,25,45,0.6)",
                  padding: 20,
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: F.bold,
                    fontSize: 10,
                    lineHeight: 15,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Est. Payout
                </Text>
                <Text style={{ color: "#FFFFFF", fontFamily: F.extra, fontSize: 24, lineHeight: 32 }}>
                  {formatCurrency(payout, currency)}
                </Text>
              </View>
            </View>

            {/* Viewers */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 32, gap: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <View
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: "#122210",
                      overflow: "hidden",
                      marginLeft: i === 0 ? 0 : -8,
                    }}
                  >
                    <UserAvatar fallbackKey={`${bet.id}-viewer-${i}`} size={28} />
                  </View>
                ))}
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: "#122210",
                    backgroundColor: "#1E293B",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: -8,
                  }}
                >
                  <Text style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 10, lineHeight: 15 }}>
                    +{Math.max((bet.viewers ?? 15) - 3, 0)}
                  </Text>
                </View>
              </View>

              <Text style={{ color: "#94A3B8", fontFamily: F.medium, fontSize: 12, lineHeight: 16 }}>
                {bet.viewers ?? 15} people already looked at this bet
              </Text>
            </View>
          </ScrollView>

          {/* Sticky action bar */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#003C6F",
              borderTopWidth: 1,
              borderTopColor: "rgba(255,255,255,0.1)",
              paddingTop: 16,
              paddingHorizontal: 16,
              paddingBottom: Math.max(32, insets.bottom + 16),
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
              <Text style={{ color: "#64748B", fontFamily: F.semi, fontSize: 12, lineHeight: 16 }}>
                Your Balance
              </Text>
              <Text style={{ color: "#FFFFFF", fontFamily: F.semi, fontSize: 12, lineHeight: 16 }}>
                {walletBalance}
              </Text>
            </View>

            <Pressable
              onPress={handleJoin}
              disabled={!canJoin}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 16,
                borderRadius: 24,
                backgroundColor: canJoin ? "#E59A0B" : "#64748B",
                shadowColor: "#3CF320",
                shadowOpacity: canJoin ? 0.3 : 0,
                shadowRadius: 30,
                shadowOffset: { width: 0, height: 8 },
                elevation: canJoin ? 10 : 0,
              }}
            >
              {isJoining ? (
                <Loading inline size={28} />
              ) : (
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: F.extra,
                    fontSize: 18,
                    lineHeight: 28,
                    letterSpacing: -0.45,
                    textTransform: "uppercase",
                  }}
                >
                  {joinLabel}
                </Text>
              )}
            </Pressable>
          </View>
        </>
      )}

      <BetJoined
        visible={joined}
        title={matchTitle(bet)}
        prediction={predictionLabel(bet)}
        betRef={betRef(bet?.id)}
        opponent={handle}
        opponentKey={creatorId ?? bet?.id ?? "opponent"}
        avatarUri={profile?.avatarUrl}
        totalPot={formatCurrency(stake * 2, currency)}
        deducted={`${formatCurrency(stake, currency)} deducted from wallet balance`}
        onViewBets={() => {
          setJoined(false);
          router.replace("/(p2p)/my-bets");
        }}
        onBack={() => {
          setJoined(false);
          router.back();
        }}
      />
    </View>
  );
}
