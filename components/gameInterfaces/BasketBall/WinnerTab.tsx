// components/gameInterfaces/BasketBall/WinnerTab.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Match } from '@/interface';
import GameCard from './GameCard';

interface WinnerTabProps {
  matches: Match[];
}

const WinnerTab: React.FC<WinnerTabProps> = ({ matches }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header Bar */}
      <View style={styles.stickyHeader}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Matches</Text>
          <View style={styles.headerRight}>
            <Text style={styles.numberText}>1</Text>
            <Text style={styles.numberText}>2</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Game Cards */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {matches.map((item, idx) => (
          <GameCard key={`${item.home}-${item.away}-${idx}`} match={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default WinnerTab;

const styles = StyleSheet.create({
  stickyHeader: {
    borderTopWidth: 1,
    borderTopColor: '#DFDFDFCC',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    width: '100%',
    height: 37,
    backgroundColor: '#1F5079',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 32,
    marginRight: 45,
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});