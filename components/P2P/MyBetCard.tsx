import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Loading from "@/components/Reuseables/Loading";
import { formatCurrency, potentialReturn } from "@/constants/functions";
import { Bet } from "@/types/bets.types";
import { matchTitle, predictionTitle, shortWhen } from "./betLabels";

/*
 * Figma "My P2P Bets" card. Read from the design (Open Bets card): vertical,
 * radius 12, padding 20, gap 16, fill #003460, 1px white 8% border. Title
 * Manrope Bold 12/16 #F1F5F9; league Regular 10/15 #64748B; "MATCH DATE" Bold
 * 10/15 ls -0.5 uppercase #64748B; date SemiBold 12/16 #CBD5E1; row labels
 * Regular 14/20 #94A3B8; prediction Bold 14/20 #E59A0B; stake ExtraBold 14/20
 * #F1F5F9; potential win Bold 14/20 #E2E8F0; status dot 8px #E59A0B, status
 * text SemiBold 12/16 #E59A0B 80%; Cancel Bet hug 34, radius 8, 1px white 5%
 * border, padding 8/16, white 5% fill, text Bold 12/16 #94A3B8.
 * Not read yet (so approximated): the icon circle's fill, the divider colour,
 * and the whole Matched / History card variants (built from the Open card's
 * type and spacing, plus what the Matched frame shows: "YOUR PREDICTION",
 * "<pick> @ <odds>" and an "Opponent: <name>" row).
 */
const F = {
  regular: "Manrope_400Regular",
  semi: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
  extra: "Manrope_800ExtraBold",
} as const;

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <Text style={{ color: "#94A3B8", fontFamily: F.regular, fontSize: 14, lineHeight: 20 }}>{label}</Text>
    {children}
  </View>
);

const Divider = () => <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />;

interface Props {
  bet: Bet;
  meId?: string;
  onCancel?: (bet: Bet) => void;
  onPress?: (bet: Bet) => void;
  /** Dev-only: settle a matched bet as a win or a loss. */
  onSimulate?: (bet: Bet, win: boolean) => void;
  busy?: boolean;
}

const RESULT: Record<string, { label: string; colour: string }> = {
  SETTLED_WIN: { label: "Won", colour: "#10B981" },
  SETTLED_LOSS: { label: "Lost", colour: "#EF4444" },
  CANCELLED: { label: "Cancelled", colour: "#94A3B8" },
  EXPIRED: { label: "Expired", colour: "#94A3B8" },
  CASHED_OUT: { label: "Cashed out", colour: "#10B981" },
};

const MyBetCard = ({ bet, meId, onCancel, onPress, onSimulate, busy }: Props) => {
  const currency = (bet.currency as "NGN" | "USDT") ?? "NGN";
  const stake = Number(bet.stake ?? 0);
  const win = potentialReturn(stake, bet.odds) ?? 0;
  const status = bet.status ?? "OPEN";
  const isOpen = status === "OPEN";
  const isMatched = status === "MATCHED";

  const when = shortWhen(bet.match?.startTime);
  const subtitle = [bet.match?.league, isMatched ? when : ""].filter(Boolean).join(" • ");

  const opponent =
    (bet.creatorId === meId ? bet.taker : bet.creator)?.username ?? "Opponent";

  return (
    <Pressable
      onPress={() => onPress?.(bet)}
      disabled={!onPress}
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "#003460",
        padding: 20,
        gap: 16,
        marginHorizontal: 18,
        marginBottom: 16,
      }}
    >
      {/* Fixture */}
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
            }}
          >
            <Ionicons name="football" size={18} color="#F1F5F9" />
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text numberOfLines={1} style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 12, lineHeight: 16 }}>
              {matchTitle(bet)}
            </Text>
            {subtitle ? (
              <Text numberOfLines={1} style={{ color: "#64748B", fontFamily: F.regular, fontSize: 10, lineHeight: 15 }}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        {!isMatched && when ? (
          <View style={{ alignItems: "flex-end", marginLeft: 8 }}>
            <Text
              style={{
                color: "#64748B",
                fontFamily: F.bold,
                fontSize: 10,
                lineHeight: 15,
                letterSpacing: -0.5,
                textTransform: "uppercase",
              }}
            >
              Match Date
            </Text>
            <Text style={{ color: "#CBD5E1", fontFamily: F.semi, fontSize: 12, lineHeight: 16 }}>{when}</Text>
          </View>
        ) : null}
      </View>

      {isMatched ? (
        <>
          <View>
            <Text
              style={{
                color: "#64748B",
                fontFamily: F.bold,
                fontSize: 10,
                lineHeight: 15,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Your Prediction
            </Text>
            <Text style={{ color: "#E59A0B", fontFamily: F.bold, fontSize: 14, lineHeight: 20 }}>
              {predictionTitle(bet)} @ {Number(bet.odds ?? 0).toFixed(2)}
            </Text>
          </View>

          <Divider />

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "rgba(34,211,238,0.15)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="person-outline" size={14} color="#22D3EE" />
              </View>
              <Text
                numberOfLines={1}
                style={{ color: "#F1F5F9", fontFamily: F.semi, fontSize: 12, lineHeight: 16, marginLeft: 8, flex: 1 }}
              >
                Opponent: {opponent}
              </Text>
            </View>
            <Text style={{ color: "#10B981", fontFamily: F.bold, fontSize: 12, lineHeight: 16, marginLeft: 8 }}>
              Win {formatCurrency(win, currency)}
            </Text>
          </View>

          {onSimulate ? (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                onPress={() => onSimulate(bet, true)}
                style={{ flex: 1, height: 34, borderRadius: 8, borderWidth: 1, borderColor: "rgba(16,185,129,0.4)", alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: "#10B981", fontFamily: F.bold, fontSize: 12, lineHeight: 16 }}>
                  Test: settle as win
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onSimulate(bet, false)}
                style={{ flex: 1, height: 34, borderRadius: 8, borderWidth: 1, borderColor: "rgba(239,68,68,0.4)", alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: "#EF4444", fontFamily: F.bold, fontSize: 12, lineHeight: 16 }}>
                  Test: settle as loss
                </Text>
              </Pressable>
            </View>
          ) : null}
        </>
      ) : (
        <>
          <View style={{ gap: 12 }}>
            <Row label="Prediction">
              <Text numberOfLines={1} style={{ flexShrink: 1, textAlign: "right", color: "#E59A0B", fontFamily: F.bold, fontSize: 14, lineHeight: 20 }}>
                {predictionTitle(bet)}
              </Text>
            </Row>
            <Row label="Your Stake">
              <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6} style={{ flexShrink: 1, color: "#F1F5F9", fontFamily: F.extra, fontSize: 14, lineHeight: 20 }}>
                {formatCurrency(stake, currency)}
              </Text>
            </Row>
            <Row label="Potential Win">
              <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6} style={{ flexShrink: 1, color: "#E2E8F0", fontFamily: F.bold, fontSize: 14, lineHeight: 20 }}>
                {formatCurrency(win, currency)}
              </Text>
            </Row>
          </View>

          <Divider />

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            {isOpen ? (
              <>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#E59A0B" }} />
                  <Text style={{ color: "rgba(229,154,11,0.8)", fontFamily: F.semi, fontSize: 12, lineHeight: 16 }}>
                    Waiting for Opponent…
                  </Text>
                </View>

                {onCancel ? (
                  <Pressable
                    onPress={() => onCancel(bet)}
                    disabled={busy}
                    style={{
                      height: 34,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.05)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: busy ? 0.6 : 1,
                    }}
                  >
                    {busy ? (
                      <Loading inline size={20} />
                    ) : (
                      <Text style={{ color: "#94A3B8", fontFamily: F.bold, fontSize: 12, lineHeight: 16 }}>
                        Cancel Bet
                      </Text>
                    )}
                  </Pressable>
                ) : null}
              </>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: RESULT[status]?.colour ?? "#94A3B8",
                  }}
                />
                <Text
                  style={{
                    color: RESULT[status]?.colour ?? "#94A3B8",
                    fontFamily: F.semi,
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {RESULT[status]?.label ?? status}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </Pressable>
  );
};

export default MyBetCard;
