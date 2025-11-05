
import React from 'react';
import { View, ScrollView } from 'react-native';
import P2PToggle from '@/components/P2P/P2PToggle';

interface StickyToggleLayoutProps {
  active: 'p2p' | 'bets';
  onChange: (active: 'p2p' | 'bets') => void;
  children: React.ReactNode;
}

export default function StickyToggleLayout({
  active,
  onChange,
  children,
}: StickyToggleLayoutProps) {
  return (
    <View className="flex-1 bg-pry">
      {/* Sticky Toggle Bar */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: '#003C6F',
          paddingVertical: 8,
        }}
      >
        <P2PToggle active={active} onChange={onChange} />
      </View>

      {/* Scrollable content below */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50, // to keep space so toggle doesn’t overlap
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}