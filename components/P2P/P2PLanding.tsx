import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import Head from '@/components/Home/Head';
import P2PToggle from './P2PToggle';
import LiveMatchCard from './LiveMatchCard';
import VsMark from '@/assets/SVGs/icons/VsMark';
import Loading from '@/components/Reuseables/Loading';
import { useP2PStore } from '@/store/useP2PStore';
import { useTabStore } from '@/store/useTabStore';
import { useLiveMatches } from '@/hooks/useMatches';
import { RelativePathString, router } from 'expo-router';
import { StyleSheet } from 'react-native';

const PLAYER_ONE = require('@/assets/images/p2pPlayerOne.png');
const PLAYER_TWO = require('@/assets/images/p2pPlayerTwo.png');

export default function P2PLanding() {
  const { setScreen } = useP2PStore();
  const { activeTab, setActiveTab } = useTabStore();

  const { data: matches, isPending, isError, refetch, isRefetching } =
    useLiveMatches();

  const liveMatches = matches ?? [];

  return (
    <FlatList
      style={styles.list}
      data={liveMatches}
      keyExtractor={(m) => m.id}
      renderItem={({ item }) => (
        <View className="items-center mb-4">
          <LiveMatchCard match={item} />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      onRefresh={refetch}
      refreshing={isRefetching}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <P2PToggle active={activeTab} onChange={setActiveTab} />

          <Head />

          {/* Players facing off */}
          <View className="flex-row items-center justify-center mt-6 mb-4">
            <Image source={PLAYER_ONE} style={{ width: 82, height: 83, borderRadius: 20 }} />

            <View className="mx-2">
              <VsMark width={89} height={72} />
            </View>

            <Image source={PLAYER_TWO} style={{ width: 96, height: 82, borderRadius: 20 }} />
          </View>

          <Text
            className="text-white font-poppinsBold text-center"
            style={{ fontSize: 18, lineHeight: 18 }}
          >
            PTP Bets
          </Text>
          <Text
            className="text-[#B9CBD9] font-poppins text-center mt-2"
            style={{ fontSize: 14, lineHeight: 24 }}
          >
            Create or join bets
          </Text>
          <Text
            className="text-[#B9CBD9] font-poppins text-center"
            style={{ fontSize: 14, lineHeight: 24 }}
          >
            Bet against friends or the community
          </Text>

          <View className="flex-row items-center justify-center gap-4 mt-4 mb-6">
            <Pressable
              onPress={() => setScreen('searching')}
              className="bg-sec items-center justify-center"
              style={styles.actionButton}
            >
              <Text className="text-black text-sm font-semibold">Lobby</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(p2p)/create' as RelativePathString)}
              className="bg-sec items-center justify-center"
              style={styles.actionButton}
            >
              <Text className="text-black text-sm font-semibold">Create Bet</Text>
            </Pressable>
          </View>

          <View className="flex-row items-center px-5 mb-4">
            <Text className="text-white text-lg font-semibold mr-2">
              Live Matches
            </Text>
            <View className="w-2 h-2 rounded-full bg-[#E53935]" />
          </View>

          {isPending && (
            <View className="py-10">
              <Loading inline size={56} />
            </View>
          )}
        </View>
      }
      ListEmptyComponent={
        isPending ? null : (
          <Text className="text-[#B9CBD9] text-center px-8 mt-4">
            {isError
              ? 'Could not load live matches. Pull down to try again.'
              : 'No live matches right now.'}
          </Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: 93,
    height: 30,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#000000",
  },
  list: {
    flex: 1,
    backgroundColor: "#123456",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#123456",
    paddingTop: 56,
    paddingBottom: 40,
  },
});
