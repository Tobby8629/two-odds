import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { betProps, MatchProps } from '@/interface'
import Ball from '@/assets/SVGs/sport/ball'
import Won from '@/assets/SVGs/bets/Won'
import Lost from '@/assets/SVGs/bets/Lost'
import OddsChange from '@/assets/SVGs/bets/OddsChange'

interface Open {
  e: MatchProps,
  i: number,
  bet: betProps
}

/*
 * One leg of an open bet. Figma: market 16 white, fixture 12 white, "Live 85'"
 * 8 white on red, legs separated by a 1px #DFDFDF rule.
 */
const ViewBet = ({e, i, bet}: Open) => {
  const last = i + 1 === bet.games.length

  return (
    <View style={[styles.leg, last ? null : styles.rule]}>
      <View style={{ flex: 1 }}>
        <View style={styles.titleRow}>
          <Ball />
          <Text style={styles.market}>{e.selected as unknown as string}</Text>
        </View>
        <Text style={styles.fixture}>{e.match}</Text>
      </View>

      {e.live ? (
        <View style={styles.liveBlock}>
          <Text style={styles.liveBadge}>Live 30'</Text>
          <View>
            <Text style={styles.score}>0 - 0</Text>
            <Text style={styles.half}>1st Half</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.time}>{e.time}</Text>
      )}

      <View style={styles.oddsRow}>
        <Text style={styles.odds}>{e.odds}</Text>
        {e.live ? <OddsChange className='ml-3' /> : null}
        {e.status === 'pending' ? (
          <View style={styles.pending} />
        ) : e.status === 'won' ? (
          <Won />
        ) : (
          <Lost />
        )}
      </View>
    </View>
  )
}

export default ViewBet

const styles = StyleSheet.create({
  leg: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, gap: 8 },
  rule: { borderBottomWidth: 1, borderBottomColor: '#DFDFDF' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  market: { color: '#FFFFFF', fontSize: 16 },
  fixture: { color: '#FFFFFF', fontSize: 12 },
  liveBlock: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  liveBadge: { minWidth: 33, height: 14, color: '#FFFFFF', fontSize: 8, lineHeight: 14, textAlign: 'center', backgroundColor: '#FF1414', borderRadius: 3, overflow: 'hidden' },
  score: { color: '#FFFFFF', fontSize: 10, textAlign: 'center' },
  half: { color: '#FFFFFF', fontSize: 8, textAlign: 'center' },
  time: { color: '#FFFFFF', fontSize: 12, textTransform: 'capitalize' },
  oddsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  odds: { color: '#FFFFFF', fontSize: 14 },
  pending: { width: 13, height: 13, borderRadius: 7, borderWidth: 1, borderColor: '#FFFFFF' },
})
