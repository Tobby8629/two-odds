import React, { useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyBetCard from "@/components/P2P/MyBetCard";
import AlertBanner from "@/components/Reuseables/AlertBanner";
import Loading from "@/components/Reuseables/Loading";
import { useCancelBet, useMyBetHistory, useMyBets, useSimulateSettle } from "@/hooks/useBets";
import { SIMULATE } from "@/constants/demo";
import { useAuthStore } from "@/store/useAuthStore";
import { Bet } from "@/types/bets.types";

/*
 * Figma "My P2P Bets" frames (393 wide, #003C6F). Read from the design: title
 * Poppins Bold 20/28 ls -0.5 #F1F5F9; active tab 116x40, radius 8, padding
 * 10, #E59A0B, label Manrope Bold 14/20 #0F172A; inactive label Bold 14/20
 * #94A3B8; Open heading Poppins Bold 12/16 ls 1.8 uppercase white; Matched
 * heading Poppins Bold 14/20 ls 1.4 uppercase. Not read: the header bar's
 * right icon, the tab strip's background, the History heading, and the
 * Matched / History card layouts (see MyBetCard).
 */
type MyBetsTab = "open" | "matched" | "history";

const TABS: { key: MyBetsTab; label: string }[] = [
  { key: "open", label: "Open Bets" },
  { key: "matched", label: "Matched" },
  { key: "history", label: "History" },
];

export default function MyP2PBetsScreen() {
  const insets = useSafeAreaInsets();
  const me = useAuthStore((state) => state.user?.id);

  const [activeTab, setActiveTab] = useState<MyBetsTab>("open");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const open = useMyBets({ category: "CUSTOM", status: "OPEN" });
  const matched = useMyBets({ category: "CUSTOM", status: "MATCHED" });
  const history = useMyBetHistory();

  const { mutateAsync: cancelBet, isPending: isCancelling } = useCancelBet();
  const { mutateAsync: settle } = useSimulateSettle();

  /* Dev only: no endpoint settles a bet yet, so a matched bet can be settled by hand. */
  const handleSimulate = async (bet: Bet, win: boolean) => {
    setActionError(null);
    try {
      await settle({ id: bet.id, win });
      if (win) router.push({ pathname: "/(p2p)/result/[id]", params: { id: bet.id } } as never);
      else setActiveTab("history");
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Could not settle this bet.");
    }
  };

  /* Each tab maps to its own source, so only the active one is read. */
  const active =
    activeTab === "open"
      ? {
          bets: open.data?.bets ?? [],
          isPending: open.isPending,
          isError: open.isError,
          refetch: open.refetch,
          isRefetching: open.isRefetching,
        }
      : activeTab === "matched"
        ? {
            bets: matched.data?.bets ?? [],
            isPending: matched.isPending,
            isError: matched.isError,
            refetch: matched.refetch,
            isRefetching: matched.isRefetching,
          }
        : {
            bets: history.bets,
            isPending: history.isPending,
            isError: history.isError,
            refetch: history.refetch,
            isRefetching: false,
          };

  const handleCancel = async (bet: Bet) => {
    setActionError(null);
    setBusyId(bet.id);

    try {
      await cancelBet(bet.id);
    } catch {
      setActionError("Could not cancel this bet. It may already have been taken.");
    } finally {
      setBusyId(null);
    }
  };

  const heading =
    activeTab === "open"
      ? `Unmatched Requests (${active.bets.length})`
      : activeTab === "matched"
        ? `Matched Bets In Progress (${active.bets.length})`
        : `Past Bets (${active.bets.length})`;

  const headingStyle =
    activeTab === "open" || activeTab === "history"
      ? { fontSize: 12, lineHeight: 16, letterSpacing: 1.8 }
      : { fontSize: 14, lineHeight: 20, letterSpacing: 1.4 };

  const emptyCopy =
    activeTab === "open"
      ? "You have no open bets. Any bet you post stays here until another player takes it."
      : activeTab === "matched"
        ? "No matched bets yet. Once someone takes one of your open bets it moves here."
        : "No settled bets yet.";

  return (
    <View style={{ flex: 1, backgroundColor: "#003C6F" }}>
      {/* Header */}
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

          <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 8 }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={{
                color: "#F1F5F9",
                fontFamily: "PoppinsBold",
                fontSize: 20,
                lineHeight: 28,
                letterSpacing: -0.5,
              }}
            >
              My P2P Bets
            </Text>
          </View>

          <View style={{ width: 40, alignItems: "flex-end", justifyContent: "center" }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="wallet" size={14} color="#012A4D" />
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginHorizontal: 18,
          marginTop: 16,
          padding: 4,
          borderRadius: 12,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isActive ? "#E59A0B" : "transparent",
              }}
            >
              <Text
                style={{
                  color: isActive ? "#0F172A" : "#94A3B8",
                  fontFamily: "Manrope_700Bold",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {actionError ? <AlertBanner message={actionError} /> : null}

      {active.isPending ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Loading inline size={72} />
        </View>
      ) : active.isError ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
          <Text style={{ color: "#F1F5F9", fontFamily: "Manrope_500Medium", textAlign: "center", marginBottom: 16 }}>
            Could not load your bets.
          </Text>
          <Pressable
            onPress={() => active.refetch()}
            style={{ backgroundColor: "#E59A0B", borderRadius: 8, paddingHorizontal: 24, paddingVertical: 10 }}
          >
            <Text style={{ color: "#0F172A", fontFamily: "Manrope_700Bold", fontSize: 14 }}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 + insets.bottom }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={active.isRefetching}
              onRefresh={() => active.refetch()}
              tintColor="#E59A0B"
            />
          }
        >
          <Text
            style={[
              {
                color: "#FFFFFF",
                fontFamily: "PoppinsBold",
                textTransform: "uppercase",
                marginHorizontal: 18,
                marginBottom: 16,
              },
              headingStyle,
            ]}
          >
            {heading}
          </Text>

          {active.bets.length === 0 ? (
            <Text
              style={{
                color: "#94A3B8",
                fontFamily: "Manrope_500Medium",
                fontSize: 12,
                lineHeight: 16,
                textAlign: "center",
                marginTop: 24,
                paddingHorizontal: 32,
              }}
            >
              {emptyCopy}
            </Text>
          ) : (
            active.bets.map((bet) => (
              <MyBetCard
                key={bet.id}
                bet={bet}
                meId={me}
                /* Only an open bet can be withdrawn from the market. */
                onCancel={activeTab === "open" ? handleCancel : undefined}
                busy={isCancelling && busyId === bet.id}
                onSimulate={SIMULATE.p2p && activeTab === "matched" ? handleSimulate : undefined}
                onPress={
                  bet.status === "SETTLED_WIN"
                    ? (b) => router.push({ pathname: "/(p2p)/result/[id]", params: { id: b.id } } as never)
                    : undefined
                }
              />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
