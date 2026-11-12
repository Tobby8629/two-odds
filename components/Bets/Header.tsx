import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { betProps, MatchProps } from '@/interface'

interface HeaderProps {
  select: (id: number) => void,
  bet: betProps,
  selected: number | null
}

/* Figma: "Accumulator | 01 Dec 2025 6:30" white 14 over a 327x1 #DFDFDF line. */
const Header = ({select, bet, selected}: HeaderProps) => {
  const hasLiveGame = bet?.games?.some((game: MatchProps) => game.live === true);

  return (
    <Pressable onPress={() => select(bet?.id)}>
      <View style={styles.row}>
        <Text style={styles.title}>
          <Text style={{ textTransform: 'capitalize' }}>{bet.betType}</Text> | {bet.date}
        </Text>

        <View style={styles.end}>
          {hasLiveGame ? <Text style={styles.live}>Live</Text> : null}
          <FontAwesome name={selected === bet?.id ? 'angle-up' : 'angle-down'} size={16} color="#FFA500" />
        </View>
      </View>
      <View style={styles.rule} />
    </Pressable>
  )
}

export default Header

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8 },
  title: { color: '#FFFFFF', fontSize: 14 },
  end: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  live: { color: '#FFFFFF', fontSize: 8, backgroundColor: '#F00000', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2 },
  rule: { height: 1, backgroundColor: '#DFDFDF' },
})
