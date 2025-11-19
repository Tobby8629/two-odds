// components/Tennis/TennisOverUnderTab.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Match } from '@/interface';
import OverUnderGameCard from '../BasketBall/OverUnderGameCard';
import { Ionicons } from '@expo/vector-icons';

interface TennisOverUnderTabProps {
  matches: Match[];
}

const TennisOverUnderTab: React.FC<TennisOverUnderTabProps> = ({ matches }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header Bar */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Matches</Text>

          <View style={styles.headerRight}>
            {/* Games text with chevron-down icon */}
            <View style={styles.gamesWrapper}>
              <Text style={styles.gamesText}>Games</Text>
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
          <OverUnderGameCard
            key={`${item.home}-${item.away}-${idx}`}
            match={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TennisOverUnderTab;

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
  gamesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  gamesText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
