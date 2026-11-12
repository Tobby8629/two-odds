import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RelativePathString, router } from 'expo-router';
import Head from '@/components/Home/Head';
import UserAvatar from '@/components/Reuseables/UserAvatar';
import { useP2PStore } from '@/store/useP2PStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useProfile } from '@/hooks/useProfile';
import { useOpenBets } from '@/hooks/useBets';
import { useAuthStore } from '@/store/useAuthStore';
import { SIMULATE } from '@/constants/demo';

/**
 * The backend has no matchmaking: a bet is posted open and sits in the market
 * until someone takes it. This screen is the waiting state for that, not a
 * queue - there is nothing to poll until the bet flips OPEN to MATCHED.
 */
export default function P2PSearching() {
  const insets = useSafeAreaInsets();
  const { setScreen } = useP2PStore();
  const avatarId = useProfileStore((state) => state.avatarId);
  const { data: profile } = useProfile();

  /*
   * Stand-in for opponent matching: after a short wait the first open bet that
   * is not the player's own is opened on its details screen, where they can
   * join. Replace with the real matching call once that endpoint exists.
   */
  const me = useAuthStore((state) => state.user?.id);
  const { data: market } = useOpenBets({ category: 'CUSTOM' });
  const candidate = (market?.bets ?? []).find((b) => b.creatorId !== me);

  React.useEffect(() => {
    if (!SIMULATE.p2p || !candidate) return;
    const t = setTimeout(() => {
      router.push({ pathname: '/(p2p)/bet/[id]', params: { id: candidate.id } } as never);
    }, 3500);
    return () => clearTimeout(t);
  }, [candidate?.id]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
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
            <Ionicons name="search" size={17.48} color="#0A0A1A" />
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
  screen: { flex: 1, backgroundColor: '#003C6F' },
  body: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  kicker: {
    color: '#FFFFFF',
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.45,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'PoppinsBold',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#94A3B8',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    textAlign: 'center',
  },
  avatarWrap: { marginTop: 48, marginBottom: 48 },
  glowOuter: {
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: 'rgba(227,242,253,0.1)',
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(227,242,253,0.2)',
    backgroundColor: 'rgba(227,242,253,0.1)',
    paddingHorizontal: 16,
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
    color: '#E3F2FD',
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  cancel: {
    width: 100,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#E59A0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  cancelText: {
    color: '#111818',
    fontFamily: 'Lexend_500Medium',
    fontSize: 14,
    lineHeight: 21,
  },
});
