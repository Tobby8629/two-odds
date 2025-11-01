import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useP2PStore } from '@/store/useP2PStore';
import Head from '@/components/Home/Head';
import Button from '@/components/Reuseables/Button';
import RadarAnimation from '@/components/Reuseables/Animations/RadarAnimation';


export default function P2PSearching() {
  const { setScreen } = useP2PStore();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchAgain = () => {
    if (!isSearching) setIsSearching(true);
  };

  return (
    <ScrollView
      className="bg-pry"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Head />

      {/* Title */}
      <View className="itemcenter justify-center mt-8 mb-8">
        <Text className="text-white text-3xl text-center">
          Waiting to Connect
        </Text>
      </View>

      {/* Radar Animation */}
      <RadarAnimation isSearching={isSearching} />

      {/* Button */}
      <Button
        text={isSearching ? 'Searching...' : 'Search for Player'}
        onPress={handleSearchAgain}
      />
    </ScrollView>
  );
}
