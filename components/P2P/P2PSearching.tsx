import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Animated, Easing } from 'react-native';
import { useP2PStore } from '@/store/useP2PStore';
import Head from '@/components/Home/Head';
import Button from '@/components/Reuseables/Button';
import RadarAnimation from '@/components/Reuseables/Animations/RadarAnimation';
import { useOpenBets } from '@/hooks/useBets';

/**
 * The backend has no matchmaking: there is no queue, no lobby and no
 * "searching" status. A P2P bet is posted open and sits in a public market
 * until someone takes it. So this screen loads that market rather than
 * pretending to pair two players up, and the radar covers the fetch.
 */
export default function P2PSearching() {
  const { setScreen } = useP2PStore();
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { refetch } = useOpenBets({ category: 'CUSTOM' });

  const handleSearchAgain = async () => {
    if (isSearching) return;

    setIsSearching(true);
    setError(null);

    try {
      const result = await refetch();

      if (result.isError) throw new Error('market unavailable');

      await new Promise<void>((resolve) => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => resolve());
      });

      fadeAnim.setValue(1);
      setScreen('list');
    } catch {
      setError('Could not reach the P2P market. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <View className="flex-1 mb-5 bg-pry" style={{ paddingVertical: 42 }}>
      <Head />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: 32,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            marginBottom: 32,
          }}
        >
          <Text className="text-white text-3xl text-center">
            {isSearching ? 'Finding Open Bets' : 'Waiting to Connect'}
          </Text>
        </Animated.View>

        {/* Radar Animation */}
        <RadarAnimation isSearching={isSearching} />

        {error && (
          <Text className="text-red-400 text-sm text-center px-8 mb-3">
            {error}
          </Text>
        )}

        {/* Button */}
        <Button
          text={isSearching ? 'Searching...' : 'Browse P2P Market'}
          onPress={handleSearchAgain}
        />
      </ScrollView>
    </View>
  );
}
