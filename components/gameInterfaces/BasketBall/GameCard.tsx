// components/gameInterfaces/BasketBall/GameCard.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Match } from '@/interface';

interface GameCardProps {
  match: Match;
}

const GameCard: React.FC<GameCardProps> = ({ match }) => {
  const [selected, setSelected] = useState<'home' | 'away' | null>(null);

  return (
    <View style={styles.card}>
      {/* Match Date */}
      <Text style={styles.date}>{match.date} {match.time}</Text>

      {/* Teams and Odds */}
      <View style={styles.row}>
        <View>
          {/* Home team */}
          <View style={styles.teamRow}>
            <View style={styles.dot} /> 
            <Text style={styles.teamText}>{match.home}</Text>
          </View>
          {/* Away team */}
          <View style={styles.teamRow}>
            <View style={styles.dot} /> 
            <Text style={styles.teamText}>{match.away}</Text>
          </View>
        </View>

        {/* Odds buttons */}
        <View style={styles.oddsContainer}>
          <Pressable
            style={[styles.oddsButton, selected === 'home' && styles.activeOdd]}
            onPress={() => setSelected('home')}
          >
            <Text style={[styles.oddsText, selected === 'home' && styles.activeText]}>
              {match.odds?.home ?? '-'}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.oddsButton, selected === 'away' && styles.activeOdd]}
            onPress={() => setSelected('away')}
          >
            <Text style={[styles.oddsText, selected === 'away' && styles.activeText]}>
              {match.odds?.away ?? '-'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  card: {
    width: 330,
    height: 94,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
    marginBottom: 12,
    padding: 10,
  },
  date: {
    fontSize: 10,
    color: '#000000',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#D9D9D9',
    marginRight: 6,
  },
  teamText: {
    fontSize: 14,
    color: '#000000',
  },
  oddsContainer: {
    flexDirection: 'row', // row for horizontal layout
    justifyContent: 'space-between',
  },
  oddsButton: {
    paddingVertical: 4,
    width: 45,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 9,
    backgroundColor: '#ABB2FA',
    marginRight: 6, 
  },
  activeOdd: {
    backgroundColor: '#FFA500',
  },
  oddsText: {
    color: '#000',
    fontSize: 14,
  },
  activeText: {
    color: '#000',
    fontWeight: '600',
  },
});
