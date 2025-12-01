// components/gameInterfaces/BasketBall/OverUnderGameCard.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Match, MatchProps } from '@/interface';
import LineSelector from './LineSelector';

interface OverUnderGameCardProps {
  match: MatchProps;
}

const OverUnderGameCard: React.FC<OverUnderGameCardProps> = ({ match }) => {
  const [selectedLine, setSelectedLine] = useState<string | null>(
    match.odds?.overUnder?.[0]?.line || null
  );
  const [showLineSelector, setShowLineSelector] = useState(false);
  const [selectedBet, setSelectedBet] = useState<'over' | 'under' | null>(null);

  const currentLineData = match.odds?.overUnder?.find(
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

          {/* Odds buttons */}
          <View style={styles.oddsContainer}>
            {/* Line Selector Button */}
            <Pressable
              style={styles.lineButton}
              onPress={() => setShowLineSelector(true)}
            >
              <Text style={styles.lineButtonText}>
                {selectedLine || 'Select'}
              </Text>
            </Pressable>

            {/* Over Button */}
            <Pressable
              style={[
                styles.oddsButton,
                selectedBet === 'over' && styles.activeOdd,
              ]}
              onPress={() => setSelectedBet('over')}
            >
              <Text
                style={[
                  styles.oddsText,
                  selectedBet === 'over' && styles.activeText,
                ]}
              >
                {currentLineData?.over || '-'}
              </Text>
            </Pressable>

            {/* Under Button */}
            <Pressable
              style={[
                styles.oddsButton,
                selectedBet === 'under' && styles.activeOdd,
              ]}
              onPress={() => setSelectedBet('under')}
            >
              <Text
                style={[
                  styles.oddsText,
                  selectedBet === 'under' && styles.activeText,
                ]}
              >
                {currentLineData?.under || '-'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Line Selector Modal */}
      <LineSelector
        visible={showLineSelector}
        lines={match.odds?.overUnder || []}
        selectedLine={selectedLine}
        onSelect={setSelectedLine}
        onClose={() => setShowLineSelector(false)}
      />
    </>
  );
};

export default OverUnderGameCard;

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
