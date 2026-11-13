import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { flex, flexNoJustify } from '@/constants/style'
import { betProps, MatchProps } from '@/interface'
import Ball from '@/assets/SVGs/sport/ball'
import Won from '@/assets/SVGs/bets/Won'
import Lost from '@/assets/SVGs/bets/Lost'

interface mainProps {
  bet?: betProps
}

interface flxCont {
  rh: string
  lh: string
  className?: string
  text1?: string
  text2?: string
  small?: boolean
}

/*
 * Figma "Ticket Details" (iPhone 16 - 432). Read from the design: screen
 * #003C6F; rows 16 white; "Total Stake:" / "Total Winning:" Sansita One 16
 * #E3F2FD at 90% (the app's registered Sansita is the bold italic), losing winnings Sansita One 18 #FF1414; legs card 353 wide,
 * radius 10, #012747; leg market 16, fixture 12 white; score 14 #FFA500; odds
 * 14 white. Status text 14, "Won" #FFC107 (read), lost red #FF1414 (seen, not
 * read). Not read: the winning total for a win, the stake value's style and the
 * leg date size.
 */
const Main = ({bet}: mainProps) => {
  if (!bet) return <Text>No bet found</Text>;

  const lost = bet.status === "lost";
  const totalOdds = bet.games.reduce((acc: number, g: MatchProps) => acc * (Number(g.odds) || 1), 1);
  const settled = bet.games.filter((g: MatchProps) => g.status !== "pending").length;

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
        <FlexContent small lh={`Bet id Number: ${bet.id}`} rh={bet.date} />
        <FlexContent small lh="No of Events" rh={`${settled} of ${bet.games.length} Completed`} />
        <FlexContent small lh="Bet Type" rh={bet.betType} />
        <FlexContent small lh="Status" rh={bet.status} />
        <FlexContent small lh="Odds" rh={totalOdds.toFixed(2)} />
      </View>

      <View style={{ marginVertical: 20, gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'rgba(227,242,253,0.9)', fontFamily: 'SansitaOneBoldItalic', fontSize: 16 }}>Total Stake:</Text>
          <Text style={{ color: 'rgba(227,242,253,0.9)', fontFamily: 'SansitaOneBoldItalic', fontSize: 16 }}>${bet.stake}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'rgba(227,242,253,0.9)', fontFamily: 'SansitaOneBoldItalic', fontSize: 16 }}>Total Winning:</Text>
          <Text style={{ color: lost ? '#FF1414' : '#FFA500', fontFamily: 'SansitaOneBoldItalic', fontSize: 18 }}>
            ${lost ? '0.00' : bet.potentialWin}
          </Text>
        </View>
      </View>

      <View style={{ width: '100%', maxWidth: 353, alignSelf: 'center', borderRadius: 10, backgroundColor: '#012747', padding: 20, gap: 24 }}>
        {bet.games.map((e: MatchProps) => (
          <View key={e.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ball />
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{e.selected as unknown as string}</Text>
              </View>
              <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 4 }}>{e.match}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#FFA500', fontSize: 14 }}>{e.status === 'pending' ? '-' : e.result || '0-0'}</Text>
              <Text style={{ color: '#FFFFFF', fontSize: 8 }}>{e.time}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14 }}>{e.odds}</Text>
              {e.status === 'won' ? <Won /> : e.status === 'pending' ? <View style={{ width: 13, height: 13, borderRadius: 7, borderWidth: 1, borderColor: '#FFFFFF' }} /> : <Lost />}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Main

const styles = StyleSheet.create({})

export const FlexContent = ({rh, lh, text1, text2, className, small}: flxCont) => {
  const sz = small ? "text-base" : "text-lg"
  const status = rh === "won"
  return (
    <View className={`${flex} ${className} mb-3`}>
      <ThemedText className={`${text1} ${sz}`}>{lh}</ThemedText>
      {lh === "Status" ?
      <Text style={{ color: status ? '#FFC107' : rh === "pending" ? '#FFFFFF' : '#FF1414', fontSize: small ? 14 : 18, textTransform: 'capitalize' }}>{rh}</Text>:
      <ThemedText className={`${text2} capitalize ${sz}`}>{rh}</ThemedText>
      }
    </View>
  )
}
