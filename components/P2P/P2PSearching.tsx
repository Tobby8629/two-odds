import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RelativePathString, router } from 'expo-router';
import Head from '@/components/Home/Head';
import UserAvatar from '@/components/Reuseables/UserAvatar';
import { useP2PStore } from '@/store/useP2PStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useProfile } from '@/hooks/useProfile';

/**
 * The backend has no matchmaking: a bet is posted open and sits in the market
 * until someone takes it. This screen is the waiting state for that, not a
 * queue - there is nothing to poll until the bet flips OPEN to MATCHED.
 */
export default function P2PSearching() {
  const { setScreen } = useP2PStore();
  const avatarId = useProfileStore((state) => state.avatarId);
  const { data: profile } = useProfile();

  return (
    <View style={styles.screen}>
      <Head />

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>ACTIVE LOBBY</Text>

        <Text style={styles.title}>Finding Opponent</Text>

        <Text style={styles.subtitle}>
          Waiting for a player to accept your stake...
        </Text>

        {/* Avatar with its glow ring and the search badge */}
        <View style={styles.avatarWrap}>
          <View style={styles.glowOuter}>
            <View style={styles.glowInner}>
              <UserAvatar
                uri={profile?.avatarUrl}
                avatarId={avatarId}
                size={120}
              />
            </View>
          </View>

          <View style={styles.searchBadge}>
            <Ionicons name="search" size={18} color="#0A3A5C" />
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/(p2p)/create' as RelativePathString)}
          style={styles.createPill}
        >
          <View style={styles.pillDot} />
          <Text style={styles.pillText}>CREATE YOUR OWN BETS</Text>
        </Pressable>

        <Pressable onPress={() => setScreen('landing')} style={styles.cancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#123456', paddingTop: 56 },
  body: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  kicker: {
    color: '#FFFFFF',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 12,
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'PoppinsBold',
    fontSize: 22,
    marginTop: 10,
  },
  subtitle: {
    color: '#B9CBD9',
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 19.5,
    marginTop: 6,
    textAlign: 'center',
  },
  avatarWrap: { marginTop: 48, marginBottom: 48 },
  glowOuter: {
    width: 168,
    height: 168,
    borderRadius: 84,
    backgroundColor: '#1B4C74',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowInner: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: '#2E6F9E',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  searchBadge: {
    position: 'absolute',
    right: 6,
    bottom: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#0C3A63',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  pillText: {
    color: '#FFFFFF',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  cancel: {
    width: 110,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  cancelText: {
    color: '#000000',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
  },
});
