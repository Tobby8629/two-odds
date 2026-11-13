import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loading from "@/components/Reuseables/Loading";
import { matchTitle, predictionTitle, americanOdds } from "@/components/P2P/betLabels";
import { useBet } from "@/hooks/useBets";
import { useAuthStore } from "@/store/useAuthStore";
import { formatCurrency, potentialReturn } from "@/constants/functions";

/*
 * Figma "Bet Status" frame (393x938, #003C6F). Read from the design: header
 * title Poppins ExtraBold 14/20 ls 1.4 uppercase #94A3B8; "Settlement Complete"
 * Manrope Bold 12/16 ls 1.2 uppercase #E59A0B; "YOU WON!" Manrope ExtraBold
 * 48/48 ls -2.4 white; subtitle Manrope Medium 16/24 #94A3B8; payout Poppins
 * ExtraBold 48/60 #E59A0B; "Total payout received" Manrope Medium 14/20 ls 1.4
 * uppercase #94A3B8; summary card 356 wide, radius 24, padding 20, gap 16,
 * #0F172A 50%, 1px #1E293B (sport image 40px at 60% opacity; fixture Manrope
 * Bold 14/20 #F1F5F9); Withdraw label Manrope ExtraBold 16/24 ls 1.6 uppercase
 * #122210 with a 15.82px icon; Bet Again Manrope Bold 16/24 #CBD5E1.
 * Not read yet: the settlement pill's fill, the card's kicker / ODDS / row
 * styles, the two buttons' frames and the header's right icon.
 */
const F = {
  medium: "Manrope_500Medium",
  semi: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
  extra: "Manrope_800ExtraBold",
} as const;

const Line = ({ label, value }: { label: string; value: string }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <Text style={{ color: "#94A3B8", fontFamily: F.medium, fontSize: 12, lineHeight: 16 }}>{label}</Text>
    <Text style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 12, lineHeight: 16 }}>{value}</Text>
  </View>
);

export default function BetStatusScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const me = useAuthStore((state) => state.user?.id);
  const { data: bet, isPending } = useBet(id);

  const currency = (bet?.currency as "NGN" | "USDT") ?? "NGN";
  const stake = Number(bet?.stake ?? 0);
  const payout = potentialReturn(stake, bet?.odds) ?? 0;
  const opponent =
    (bet?.creatorId === me ? bet?.taker : bet?.creator)?.username ?? "Opponent";
  const subtitle = [bet?.match?.league].filter(Boolean).join(" • ");

  return (
    <View style={{ flex: 1, backgroundColor: "#003C6F" }}>
      <View style={{ paddingTop: insets.top, backgroundColor: "#012A4D" }}>
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
            onPress={() => router.replace("/(p2p)/my-bets")}
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
              fontFamily: "PoppinsBold",
              fontSize: 14,
              lineHeight: 20,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            Bet Status
          </Text>

          <View style={{ width: 40 }} />
        </View>
      </View>

      {isPending || !bet ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Loading inline size={56} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingTop: 32, paddingBottom: 40 + insets.bottom }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 16,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "rgba(229,154,11,0.3)",
              backgroundColor: "rgba(229,154,11,0.1)",
            }}
          >
            <Text
              style={{
                color: "#E59A0B",
                fontFamily: F.bold,
                fontSize: 12,
                lineHeight: 16,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              Settlement Complete
            </Text>
          </View>

          <Text
            style={{
              color: "#FFFFFF",
              fontFamily: F.extra,
              fontSize: 48,
              lineHeight: 48,
              letterSpacing: -2.4,
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            You Won!
          </Text>

          <Text
            style={{
              color: "#94A3B8",
              fontFamily: F.medium,
              fontSize: 16,
              lineHeight: 24,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Peer-to-Peer Match Result
          </Text>

          <Text
            style={{
              color: "#E59A0B",
              fontFamily: "PoppinsExtraBold",
              fontSize: 48,
              lineHeight: 60,
              textAlign: "center",
              marginTop: 16,
              textShadowColor: "rgba(229,154,11,0.5)",
              textShadowRadius: 20,
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {formatCurrency(payout, currency)}
          </Text>

          <Text
            style={{
              color: "#94A3B8",
              fontFamily: F.medium,
              fontSize: 14,
              lineHeight: 20,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Total Payout Received
          </Text>

          {/* Summary */}
          <View
            style={{
              width: "92%",
              maxWidth: 356,
              marginTop: 32,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: "#1E293B",
              backgroundColor: "rgba(15,23,42,0.5)",
              padding: 20,
              gap: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.6,
                  }}
                >
                  <Ionicons name="football" size={18} color="#F1F5F9" />
                </View>
                <View style={{ marginLeft: 12, flex: 1 }}>
                  {subtitle ? (
                    <Text numberOfLines={1} style={{ color: "#64748B", fontFamily: F.medium, fontSize: 10, lineHeight: 15, textTransform: "uppercase" }}>
                      {subtitle}
                    </Text>
                  ) : null}
                  <Text numberOfLines={1} style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 14, lineHeight: 20 }}>
                    {matchTitle(bet)}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "#64748B", fontFamily: F.medium, fontSize: 10, lineHeight: 15, textTransform: "uppercase" }}>
                  Odds
                </Text>
                <Text style={{ color: "#E59A0B", fontFamily: F.bold, fontSize: 12, lineHeight: 16 }}>
                  {americanOdds(bet.odds)}
                </Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <Line label="Your Selection" value={predictionTitle(bet).replace(/ to Win$/, "")} />
              <Line label="Initial Stake" value={formatCurrency(stake, currency)} />
              <Line label="Opponent Matched" value={`@${opponent}`} />
            </View>
          </View>

          {/* Actions */}
          <Pressable
            onPress={() => router.push("/(transactions)/withdraw")}
            style={{
              width: "92%",
              maxWidth: 356,
              marginTop: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 16,
              borderRadius: 12,
              backgroundColor: "#E59A0B",
            }}
          >
            <Ionicons name="wallet-outline" size={15.82} color="#122210" />
            <Text
              style={{
                color: "#122210",
                fontFamily: F.extra,
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              Withdraw Winnings
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={{
              width: "92%",
              maxWidth: 356,
              marginTop: 12,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#1E293B",
            }}
          >
            <Text style={{ color: "#CBD5E1", fontFamily: F.bold, fontSize: 16, lineHeight: 24 }}>Bet Again</Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}
