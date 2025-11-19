// components/gameInterfaces/BasketBall/HandicapGameCard.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Match } from '@/interface';
import LineSelector from './LineSelector';

interface HandicapGameCardProps {
  match: Match;
}

const HandicapGameCard: React.FC<HandicapGameCardProps> = ({ match }) => {
  const [selectedLine, setSelectedLine] = useState<string | null>(
    match.odds?.handicap?.[0]?.line || null
  );
  const [showLineSelector, setShowLineSelector] = useState(false);
  const [selectedBet, setSelectedBet] = useState<'home' | 'away' | null>(null);

  const currentLineData = match.odds?.handicap?.find(
    (item) => item.line === selectedLine
  );

  return (
    <>
      <View style={styles.card}>
        {/* Match Date */}
        <Text style={styles.date}>
          {match.date} {match.time}
        </Text>

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

          {/* Odds */}
          <View style={styles.oddsContainer}>
            {/* Line Selector */}
            <Pressable
              style={styles.lineButton}
              onPress={() => setShowLineSelector(true)}
            >
              <Text style={styles.lineButtonText}>
                {selectedLine || 'Select'}
              </Text>
            </Pressable>

            {/* Home Button */}
            <Pressable
              style={[
                styles.oddsButton,
                selectedBet === 'home' && styles.activeOdd,
              ]}
              onPress={() => setSelectedBet('home')}
            >
              <Text
                style={[
                  styles.oddsText,
                  selectedBet === 'home' && styles.activeText,
                ]}
              >
                {currentLineData?.home || '-'}
              </Text>
            </Pressable>

            {/* Away Button */}
            <Pressable
              style={[
                styles.oddsButton,
                selectedBet === 'away' && styles.activeOdd,
              ]}
              onPress={() => setSelectedBet('away')}
            >
              <Text
                style={[
                  styles.oddsText,
                  selectedBet === 'away' && styles.activeText,
                ]}
              >
                {currentLineData?.away || '-'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Line Selector Modal */}
      <LineSelector
        visible={showLineSelector}
        lines={match.odds?.handicap || []}
        selectedLine={selectedLine}
        onSelect={setSelectedLine}
        onClose={() => setShowLineSelector(false)}
      />
    </>
  );
};

export default HandicapGameCard;

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
    flexDirection: 'row',
    gap: 6,
  },
  lineButton: {
    paddingVertical: 4,
    width: 45,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 9,
    backgroundColor: '#ABB2FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  oddsButton: {
    paddingVertical: 4,
    width: 45,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 9,
    backgroundColor: '#ABB2FA',
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

