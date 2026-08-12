import React from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Head from "@/components/Home/Head";
import P2PBetCard from "./P2PBetCard";
import { useOpenBets, useTakeBet } from "@/hooks/useBets";
import { useAuthStore } from "@/store/useAuthStore";
import { Bet } from "@/types/bets.types";

const P2PBetsList = () => {
  const user = useAuthStore((state) => state.user);

  const {
    data,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useOpenBets({ category: "CUSTOM" });

  const { mutateAsync: takeBet, isPending: isTaking } = useTakeBet();

  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const bets = data?.bets ?? [];

  const handleTake = async (bet: Bet) => {
    setActionError(null);
    setBusyId(bet.id);

    try {
      await takeBet(bet.id);
    } catch {
      /*
       * The backend rejects taking your own bet, an already-matched bet, or
       * one you cannot cover; it does not say which, so the copy stays broad.
       */
      setActionError(
        "Could not join this bet. It may already be taken, or your balance may be too low."
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <View className="bg-pry flex-1" style={{ paddingVertical: 42 }}>
      <Head />

      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FFC107" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-white text-center mb-4">
            Could not load the P2P market.
          </Text>

          <Pressable
            onPress={() => refetch()}
            className="bg-sec rounded-xl px-8 py-3"
          >
            <Text className="text-white font-semibold">Try again</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#FFC107"
            />
          }
        >
          {actionError && (
            <Text className="text-red-400 text-sm text-center px-8 mb-3">
              {actionError}
            </Text>
          )}

          {bets.length === 0 ? (
            <Text className="text-white text-center mt-10 px-8">
              No open bets right now. Create one and it will be listed here
              until another player takes it.
            </Text>
          ) : (
            bets.map((bet) => {
              /*
               * Own bets cannot be taken, so they are offered a cancel action
               * instead. When the response carries no creator id this falls
               * back to offering take, and the backend rejects self-takes.
               */
              const isOwn =
                Boolean(user?.id) &&
                (bet.creatorId === user?.id || bet.userId === user?.id);

              return (
                <P2PBetCard
                  key={bet.id}
                  bet={bet}
                  onTake={isOwn ? undefined : handleTake}
                  isBusy={isTaking && busyId === bet.id}
                />
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default P2PBetsList;
