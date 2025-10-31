import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Logo from '@/assets/SVGs/Logo';  
import Head from '@/components/Home/Head';    

export default function P2PLanding() {
  return (
    <View className="flex-1 bg-pry">
      <Head />

      <View className="items-center justify-center px-6 mt-8">
        <Logo width={100} height={100} />

        <Text className="text-white text-xl font-semibold text-center mt-8 mb-3">
          Player To Player Bets
        </Text>

        <Text className="text-white text-3xl font-semibold text-center mb-10">
          Connect. Bet. Win.
        </Text>

        <Image
          source={require('../../assets/images/user.png')}
          className="w-28 h-28 rounded-full mb-8"
          resizeMode="contain"
        />

        <Text className="text-white/80 text-center text-base leading-7 px-4 mb-10">
          Connect with other players, set your stakes, and place bets directly with each other.
        </Text>

        {/* --- INLINE BUTTONS (NO GAP) --- */}
        <View className="flex-row justify-center items-center mb-0">
          <TouchableOpacity
            className="bg-sec rounded-lg w-[117px] h-[43px] justify-center items-center"
            activeOpacity={0.8}
            onPress={() => console.log('Find Players')}
          >
            <Text className="text-pry text-base font-semibold">Find Players</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border-2 border-white/50 rounded-lg w-[117px] h-[43px] justify-center items-center ml-2"
            activeOpacity={0.7}
            onPress={() => console.log('Learn More')}
          >
            <Text className="text-white text-base font-semibold">Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* --- WHY CHOOSE SECTION --- */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => console.log('Why Choose 2Odds P2P')}
          className="mt-4"
        >
          <Text className="text-white/70 text-base font-semibold underline">
            Why Choose 2Odds P2P?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
