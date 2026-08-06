import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Layout from "../(settings)/Layout";
import P2PBetCard from "@/components/P2P/P2PBetCard";
import { useCancelBet, useMyBetHistory, useMyBets } from "@/hooks/useBets";
import { Bet } from "@/types/bets.types";

type MyBetsTab = "open" | "matched" | "history";

const TABS: { key: MyBetsTab; label: string }[] = [
  { key: "open", label: "Open Bets" },
  { key: "matched", label: "Matched" },
  { key: "history", label: "History" },
];

export default function MyP2PBetsScreen() {
  const [activeTab, setActiveTab] = useState<MyBetsTab>("open");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const open = useMyBets({ category: "CUSTOM", status: "OPEN" });
  const matched = useMyBets({ category: "CUSTOM", status: "MATCHED" });
  const history = useMyBetHistory();

  const { mutateAsync: cancelBet, isPending: isCancelling } = useCancelBet();

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
      setActionError(
        "Could not cancel this bet. It may already have been taken."
      );
    } finally {
      setBusyId(null);
    }
  };

  const emptyCopy =
    activeTab === "open"
      ? "You have no open bets. Any bet you post stays here until another player takes it."
      : activeTab === "matched"
        ? "No matched bets yet. Once someone takes one of your open bets it moves here."
        : "No settled bets yet.";

  return (
    <Layout header="My P2P Bets">
      {/* Tabs */}
      <View className="flex-row px-6 pt-5 pb-2">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              className={`flex-1 py-2 mx-1 rounded-lg items-center ${
                isActive ? "bg-sec" : "bg-p2p-active"
              }`}
            >
              <Text
                className={`text-sm ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/70"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {active.isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FFC107" />
        </View>
      ) : active.isError ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-white text-center mb-4">
            Could not load your bets.
          </Text>

          <Pressable
            onPress={() => active.refetch()}
            className="bg-sec rounded-xl px-8 py-3"
          >
            <Text className="text-white font-semibold">Try again</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={active.isRefetching}
              onRefresh={() => active.refetch()}
              tintColor="#FFC107"
            />
          }
        >
          {actionError && (
            <Text className="text-red-400 text-sm text-center px-8 mb-3">
              {actionError}
            </Text>
          )}

          {active.bets.length === 0 ? (
            <Text className="text-white text-center mt-10 px-8">
              {emptyCopy}
            </Text>
          ) : (
            active.bets.map((bet) => (
              <P2PBetCard
                key={bet.id}
                bet={bet}
                /* Only an open bet can be withdrawn from the market. */
                onCancel={activeTab === "open" ? handleCancel : undefined}
                isBusy={isCancelling && busyId === bet.id}
              />
            ))
          )}
        </ScrollView>
      )}
    </Layout>
  );
}
