import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useP2PStore } from '@/store/useP2PStore';
import Head from '@/components/Home/Head';
import P2PBetCard from '@/components/P2P/P2PBetCard';

export default function P2PBetsList() {
  const { availableBets } = useP2PStore();
 
  return (
    
    <View className="flex- mt-2 pt-5 pb-5 mb-5 bg-pry">
        <Head />
      <View/>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 56,
          paddingHorizontal: 16,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {availableBets.length > 0 ? (
          availableBets.map((bet) => (
            <View
              key={bet.id}
              style={{
                marginBottom: 16,
                width: '100%',
                maxWidth: 360,
              }}
            >
              <P2PBetCard bet={bet} />
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <Text className="text-white/80 text-center">
              No players found — try searching later.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}