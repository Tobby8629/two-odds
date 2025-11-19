// components/gameInterfaces/BasketBall/HandicapTab.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Match } from '@/interface';
import HandicapGameCard from './HandicapGameCard';
import { Ionicons } from '@expo/vector-icons';

interface HandicapTabProps {
  matches: Match[];
}

const HandicapTab: React.FC<HandicapTabProps> = ({ matches }) => {
  return (
    <View style={{ flex: 1 }}>

      {/* Header Bar */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Matches</Text>

          <View style={styles.headerRight}>

            {/* Handicap text with chevron-down icon */}
            <View style={styles.goalsWrapper}>
              <Text style={styles.goalsText}>Handicap</Text>
              <Ionicons name="chevron-down" size={12} color="#FFFFFF" />
            </View>

            {/* Numbers */}
            <Text style={styles.numberText}>1</Text>
            <Text style={[styles.numberText, styles.numberTextTwo]}>2</Text>
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
          <HandicapGameCard
            key={`${item.home}-${item.away}-${idx}`}
            match={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HandicapTab;

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
    gap: 10,
    marginRight: 80,
    alignItems: 'center',
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  // Extra style to move only the "2" slightly to the right
  numberTextTwo: {
    marginRight: -45,
    paddingLeft: 25,
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
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
