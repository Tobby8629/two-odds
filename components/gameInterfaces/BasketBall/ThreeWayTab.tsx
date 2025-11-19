// components/gameInterfaces/BasketBall/ThreeWayTab.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Match } from '@/interface';
import ThreeWayGameCard from './ThreeWayGameCard';

interface ThreeWayTabProps {
  matches: Match[];
}

const ThreeWayTab: React.FC<ThreeWayTabProps> = ({ matches }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header Bar */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Matches</Text>

          <View style={styles.headerRight}>
            <Text style={styles.numberText}>1</Text>
            <Text style={styles.numberText}>X</Text>
            <Text style={styles.numberText}>2</Text>
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
          <ThreeWayGameCard
            key={`${item.home}-${item.away}-${idx}`}
            match={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ThreeWayTab;

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
    paddingHorizontal: 30,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    gap: 35, 
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});
