// components/gameInterfaces/BasketBall/OverUnderTab.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Match, MatchProps } from '@/interface';
// import OverUnderGameCard from './OverUnderGameCard';
import { Ionicons } from '@expo/vector-icons';
import MatchCard from '../Reuseables/MatchCard';
import useBetslip from '@/store/useStore';

interface OverUnderTabProps {
  matches: MatchProps[];
}

const OverUnderTab: React.FC<OverUnderTabProps> = ({ matches }) => {
  const { selectGame } = useBetslip()
  return (
    <View style={{ flex: 1 }}>
      {/* Header Bar */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Matches</Text>

          <View style={styles.headerRight}>

            {/* Goals text with chevron-down icon */}
            <View style={styles.goalsWrapper}>
              <Text style={styles.goalsText}>Goals</Text>
              <Ionicons name="chevron-down" size={12} color="#FFFFFF" />
            </View>

            <Text style={styles.numberText}>Over</Text>
            <Text style={styles.numberText}>Under</Text>
          </View>
        </View>
      </View>

      {/* Scrollable List */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {matches.map((item, idx) => (
          <MatchCard match={item} selectGame={selectGame} selectedMarket={} />
        ))}
      </ScrollView>
    </View>
  );
};

export default OverUnderTab;

const styles = StyleSheet.create({
  headerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#DFDFDFCC',
    paddingBottom: 10,
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 32,
  },
  header: {
    width: '100%',
    height: 37,
    backgroundColor: '#1F5079',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },

  headerRight: {
    flexDirection: 'row',
    gap: 15,
    marginRight: 10,
    alignItems: 'center',
  },

  numberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },

  goalsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },

  goalsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});
