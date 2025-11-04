import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Logo from '@/assets/SVGs/Logo';
import Head from '@/components/Home/Head';
import P2PLandingButton from '@/components/P2P/P2PLandingButton';
import { useP2PStore } from '@/store/useP2PStore';

export default function P2PLanding() {
    const { setScreen} = useP2PStore();
    const handleFindPlayers = () => {
        setScreen('searching');
    };
    const handleLearnMore = () => {
        console.log('Learn More pressed')
    };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      className="bg-pry"
      showsVerticalScrollIndicator={false}
    >
      <Head />

      <View className="items-center justify-center px-6 mb-8 mt-8">

        <Logo width={75} height={75} />

        <Text className="text-white text-lg text-center mt-8 mb-2">
          Player To Player Bets
        </Text>

        <Text className="text-white text-3xl text-center mb-8">
          Connect. Bet. Win.
        </Text>

        <Image
          source={require('../../assets/images/user.png')}
          className="w-62 h-62 rounded-full mb-8"
          resizeMode="contain"
        />

        <Text className="text-white/80 text-center text-base leading-7 px-4 mb-8">
          Connect with other players, set your stakes, and place bets directly with each other.
        </Text>

        <View className="flex-row justify-center items-center mb-10 space-x-4">
          <P2PLandingButton
            text="Find Players"
            onPress={handleFindPlayers} 
          />
          <P2PLandingButton
            text="Learn More"
            onPress={handleLearnMore}
            showArrow
          />
        </View>

        <Text className="text-white text-2xl text-center mt-6">
          Why Choose 2Odds P2P?
        </Text>

      </View>
    </ScrollView>
  );
}