import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import P2PToggle from '@/components/P2P/P2PToggle';

interface StickyToggleLayoutProps {
  active: 'p2p' | 'bets';
  onChange: (active: 'p2p' | 'bets') => void;
  children: React.ReactNode[] | React.ReactNode;
}

/**
 * This layout allows a sticky P2PToggle bar
 * while keeping FlatList scroll behavior intact.
 */
export default function StickyToggleLayout({
  active,
  onChange,
  children,
}: StickyToggleLayoutProps) {
  // We expect the first child to be FlatList content
  // and we'll render the sticky toggle above it.
  return (
    <View style={styles.container}>
      <FlatList
        data={['header', 'content']}
        renderItem={({ item }) => {
          if (item === 'header') {
            return (
              <View style={styles.stickyHeader}>
                <P2PToggle active={active} onChange={onChange} />
              </View>
            );
          }
          return <>{children}</>;
        }}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123456',
  },
  stickyHeader: {
    backgroundColor: '#003C6F',
    paddingVertical: 16,
    paddingHorizontal: 12,
    zIndex: 10,
    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  contentContainer: {
    paddingBottom: 56,
  },
});
