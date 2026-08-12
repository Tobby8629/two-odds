import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { avatarForKey } from "@/constants/avatars";
import { formatCurrency, potentialReturn } from "@/constants/functions";
import { Bet } from "@/types/bets.types";

export interface P2PBetCardProps {
  bet: Bet;
  /** Omitted for the user's own bets, which cannot be taken. */
  onTake?: (bet: Bet) => void;
  onCancel?: (bet: Bet) => void;
  isBusy?: boolean;
}

const STATUS_COLOURS: Record<string, string> = {
  OPEN: "#E59A0B",
  MATCHED: "#1c5789",
  SETTLED_WIN: "#2E7D32",
  SETTLED_LOSS: "#9E9E9E",
  CANCELLED: "#9E9E9E",
  EXPIRED: "#9E9E9E",
  CASHED_OUT: "#2E7D32",
};

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Waiting for Opponent",
  MATCHED: "Matched",
  SETTLED_WIN: "Won",
  SETTLED_LOSS: "Lost",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
  CASHED_OUT: "Cashed Out",
};

/** Turns { winner: "home" } into "Winner: home" without inventing labels. */
const describePrediction = (bet: Bet) => {
  const entries = Object.entries(bet.prediction ?? {});

  if (!entries.length) return bet.betType ?? "Custom bet";

  return entries
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(", ");
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-1">
    <Text className="text-xs text-[#595959]">{label}</Text>
    <Text className="text-sm text-black font-semibold">{value}</Text>
  </View>
);

const P2PBetCard: React.FC<P2PBetCardProps> = ({
  bet,
  onTake,
  onCancel,
  isBusy,
}) => {
  /*
   * The backend exposes no counterparty identity and no way to look another
   * user up, so the avatar is derived from the bet id purely so each card has
   * a stable face. It is not a claim about who created the bet.
   */
  const Avatar = avatarForKey(bet.creatorId ?? bet.id).component;

  const status = bet.status ?? "OPEN";
  const badgeColour = STATUS_COLOURS[status] ?? "#9E9E9E";
  const currency = (bet.currency as "NGN" | "USDT") ?? "NGN";

  const toWin = potentialReturn(bet.stake, bet.odds);

  return (
    <View
      className="bg-light-blue w-[330px] max-w-[360px] rounded-2xl shadow-md p-4 mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Header: avatar, prediction, status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1 mr-2">
          <Avatar width={40} height={40} />

          <View className="ml-2 flex-1">
            <Text
              numberOfLines={1}
              className="text-black text-base font-semibold"
            >
              {describePrediction(bet)}
            </Text>
            <Text numberOfLines={1} className="text-xs text-[#595959]">
              {bet.betType ?? "CUSTOM"}
            </Text>
          </View>
        </View>

        <View
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: badgeColour }}
        >
          <Text className="text-white text-[10px] font-semibold">
            {STATUS_LABELS[status] ?? status}
          </Text>
        </View>
      </View>

      {/* Figures */}
      <View className="flex-row justify-between mb-4">
        <Metric
          label="Stake"
          value={formatCurrency(bet.stake, currency)}
        />
        <Metric label="Odds" value={String(bet.odds ?? "-")} />
        <Metric
          label="To Win"
          value={toWin !== null ? formatCurrency(toWin, currency) : "-"}
        />
      </View>

      {(onTake || onCancel) && (
        <TouchableOpacity
          disabled={isBusy}
          onPress={() => (onTake ? onTake(bet) : onCancel?.(bet))}
          className="rounded-lg py-3 items-center"
          style={{
            backgroundColor: onTake ? "#E59A0B" : "#9E9E9E",
            opacity: isBusy ? 0.6 : 1,
          }}
        >
          {isBusy ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">
              {onTake ? "Join Bet" : "Cancel Bet"}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default P2PBetCard;
