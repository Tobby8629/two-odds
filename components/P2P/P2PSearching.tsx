import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Animated, Easing } from 'react-native';
import { useP2PStore } from '@/store/useP2PStore';
import { useProfileStore } from '@/store/useProfileStore';
import { AVATARS } from '@/constants/avatars';
import Head from '@/components/Home/Head';
import Button from '@/components/Reuseables/Button';
import RadarAnimation from '@/components/Reuseables/Animations/RadarAnimation';

export default function P2PSearching() {
  const { setScreen, fetchBets } = useP2PStore();
  const { profile } = useProfileStore();
  const [isSearching, setIsSearching] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Get user's selected avatar or default to first avatar
  const selectedAvatar =
    AVATARS.find((item) => item.id === profile?.avatar) || AVATARS[0];
  const AvatarComponent = selectedAvatar.component;

  const handleSearchAgain = () => {
    if (!isSearching) {
      setIsSearching(true);

      // Start fade out after 3 seconds and fetch bets
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(async () => {
          await fetchBets(); // loads mock bets and moves to "list"
          fadeAnim.setValue(1); // reset animation
        });
      }, 3000);
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
          <Text className="text-white font-normal text-3xl text-center">
            Gaming Lobby
          </Text>
        </Animated.View>

        {/* Radar Animation with Avatar in Center */}
        <RadarAnimation 
          isSearching={isSearching} 
          centerAvatar={<AvatarComponent width={75} height={75} />}
        />

        {/* Button */}
        <Button
          text={isSearching ? 'Searching...' : 'Search for Player'}
          onPress={handleSearchAgain}
        />
      </ScrollView>
    </View>
  );
}