import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import WalletLogo from "@/assets/SVGs/WalletLogo";
import MoneyTransfer from "@/assets/SVGs/icons/MoneyTransfer";
import OpenEye from "@/assets/SVGs/OpenEye";
import Loading from "@/components/Reuseables/Loading";
import { flex, flexNoJustify } from "@/constants/style";
import { formatCurrency } from "@/constants/functions";
import { useProfile } from "@/hooks/useProfile";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { WalletCurrency } from "@/types/wallet.types";

interface WalletDropdownProps {
  visible: boolean;
  onClose: () => void;
}

const CURRENCY_LABELS: Record<WalletCurrency, string> = {
  NGN: "NGN",
  USDT: "USD",
};

const WalletDropdown = ({ visible, onClose }: WalletDropdownProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [currency, setCurrency] = useState<WalletCurrency>("NGN");

  const { data: profile } = useProfile();
  const { data: balance, isPending, isError } = useWalletBalance();

  const amount =
    currency === "NGN" ? balance?.ngn?.balance : balance?.usdt?.balance;

  const balanceLabel = isError
    ? "Unavailable"
    : formatCurrency(amount, currency);

  const go = (path: "/(transactions)/deposit" | "/(transactions)/withdraw") => {
    onClose();
    router.push(path);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Tapping anywhere outside dismisses the preview. */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Speech-bubble tail pointing back at the wallet icon. */}
        <View pointerEvents="none" style={styles.tail} />

        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View pointerEvents="none" style={styles.logo}>
            <WalletLogo width={150} height={148} opacity={0.9} />
          </View>

          <View style={styles.body}>
            <View className={`${flexNoJustify} gap-3`}>
              <Pressable
                onPress={() =>
                  setCurrency((c) => (c === "NGN" ? "USDT" : "NGN"))
                }
                className="flex-row items-center bg-white/10 rounded-md px-2 py-1"
              >
                <Text className="text-white text-xs mr-1">
                  {CURRENCY_LABELS[currency]}
                </Text>
                <Ionicons name="chevron-down" size={12} color="#FFFFFF" />
              </Pressable>

              <Pressable onPress={() => setShowBalance((v) => !v)}>
                {showBalance ? (
                  <OpenEye />
                ) : (
                  <FontAwesome5 name="eye-slash" size={16} color="white" />
                )}
              </Pressable>
            </View>

            <View className="mt-4 mb-4">
              {isPending ? (
                <Loading inline size={32} />
              ) : (
                <Text className="text-white text-3xl font-semibold">
                  {showBalance ? balanceLabel : "****"}
                </Text>
              )}
              <Text className="text-[#9FB6C9] text-[11px] mt-1">
                Total Balance
              </Text>
            </View>

            <View style={styles.divider} />

            <View className={`${flexNoJustify} gap-4 mt-4 mb-4`}>
              <Pressable
                onPress={() => go("/(transactions)/deposit")}
                style={[styles.pill, styles.pillFilled]}
              >
                <Text style={styles.pillTextDark}>Deposit</Text>
                <MoneyTransfer width={11} height={13} />
              </Pressable>

              <Pressable
                onPress={() => go("/(transactions)/withdraw")}
                style={[styles.pill, styles.pillOutlined]}
              >
                <Text style={styles.pillTextLight}>Withdrawal</Text>
                <MoneyTransfer width={11} height={13} />
              </Pressable>
            </View>
          </View>

          {/* Darker strip flush to the card edges. */}
          <View className={`${flex}`} style={styles.betIdBar}>
            <Text className="text-[#9FB6C9] text-[11px] italic">BET ID :</Text>
            <Text
              numberOfLines={1}
              className="text-[#9FB6C9] text-[11px] flex-1 text-right ml-3"
            >
              {profile?.displayName || profile?.username || ""}
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default WalletDropdown;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  card: {
    position: "absolute",
    top: 92,
    left: 16,
    right: 16,
    backgroundColor: "#001C34",
    borderRadius: 24,
    paddingTop: 16,
    overflow: "hidden",
  },
  body: {
    paddingHorizontal: 20,
  },
  logo: {
    position: "absolute",
    top: -6,
    right: -4,
  },
  tail: {
    position: "absolute",
    top: 78,
    right: 30,
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 14,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#001C34",
  },
  divider: {
    height: 1,
    marginTop: 4,
    backgroundColor: "#0B3253",
  },
  betIdBar: {
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pill: {
    width: 90,
    height: 25,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  pillFilled: {
    backgroundColor: "#FFC107",
  },
  pillOutlined: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  pillTextDark: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "600",
  },
  pillTextLight: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
});
