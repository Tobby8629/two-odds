import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useBetHistory } from '@/store/useStore';
import { FontAwesome } from '@expo/vector-icons';
import ViewBet from './ViewBet';
import Header from './Header';

/*
 * Figma "Open Bets" accumulator card. Read from the design: card 347 wide,
 * radius 10, fill #012747; inner width 327 (padding 10); dividers 1px #DFDFDF;
 * body text white (Microsoft Sans Serif in the file, so the phone's system
 * font is used); "Potential Winning:" / "Stake:" 14 white with amber #FFA500
 * values; Cash Out 327x45, radius 5, padding 10, #ABB2FA; "Accept cash out
 * changes" 10 white. Not read: the Cash Out label size (20 used), the live
 * badge fill (red) and the checkbox's checked colour (amber).
 */
const AMBER = '#FFA500';

const EachBet = () => {
  const { bets } = useBetHistory();
  const [cashoutChanges, setCashoutChanges] = useState<{ [key: number]: boolean }>({});
  /* Cards open expanded, as in the design; the chevron collapses one. */
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});

  const toggleCashout = (id: number) =>
    setCashoutChanges((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleCollapsed = (id: number) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <View style={styles.container}>
      {bets.map((bet) => {
        const isCollapsed = !!collapsed[bet.id];

        return (
          <View key={bet.id} style={styles.card}>
            <Header
              select={toggleCollapsed}
              selected={isCollapsed ? null : bet.id}
              bet={bet}
            />

            {isCollapsed ? (
              <View style={{ gap: 4 }}>
                {bet.games.slice(0, 2).map((e) => (
                  <Text key={e.id} style={styles.fixture}>{e.match}</Text>
                ))}
              </View>
            ) : (
              <View>
                {bet.games.map((e, i) => (
                  <ViewBet e={e} i={i} bet={bet} key={i} />
                ))}
              </View>
            )}

            <View style={{ gap: 10 }}>
              <Text style={styles.line}>
                Potential Winning: <Text style={styles.amber}>${bet.potentialWin}</Text>
              </Text>
              <Text style={styles.line}>
                Stake: <Text style={styles.amber}>${bet.stake}</Text>
              </Text>
            </View>

            <Pressable
              disabled={bet.cashout <= 0}
              onPress={() => console.log('cashout loading')}
              style={styles.cashout}
            >
              <Text style={styles.cashoutText}>Cash Out ${bet.cashout}</Text>
            </Pressable>

            <Pressable onPress={() => toggleCashout(bet.id)} style={styles.checkRow}>
              <View
                style={[
                  styles.box,
                  cashoutChanges[bet.id] ? { backgroundColor: AMBER, borderColor: AMBER } : null,
                ]}
              >
                {cashoutChanges[bet.id] ? <FontAwesome name="check" size={10} color="#012747" /> : null}
              </View>
              <Text style={styles.checkText}>Accept cash out changes</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default EachBet;

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center' },
  card: {
    width: '100%',
    maxWidth: 347,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#012747',
    gap: 24,
  },
  fixture: { color: '#FFFFFF', fontSize: 12 },
  line: { color: '#FFFFFF', fontSize: 14 },
  amber: { color: AMBER, fontSize: 14 },
  cashout: {
    height: 45,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ABB2FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashoutText: { color: '#000000', fontSize: 20 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: -12 },
  box: {
    width: 17,
    height: 17,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: { color: '#FFFFFF', fontSize: 10 },
});
