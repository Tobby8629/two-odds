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
}

const Main = ({bet}: mainProps) => {
  if (!bet) return <Text>No bet found</Text>;

  return (
    <ScrollView className='p-5 pb-10' showsVerticalScrollIndicator={false}>
      <View className='border-b-[1px] border-gray-400'>  
        <FlexContent lh={`Bet ID Number: ${bet?.id}`} rh={(bet.date)}/>
        <FlexContent lh="No of Events" rh={`${bet.games.length} of ${bet.games.length} completed`} />
        <FlexContent lh='Bet Type' rh={bet.betType} />
        <FlexContent lh="Status" rh={"won"} />
        <FlexContent lh="Odds" rh={"15.90"} />
      </View>
      <View className='my-5'>
        <View className={`${flex} mb-2`}>
          <ThemedText className='font-sansitaBoldItalic text-xl'>Total Stake:</ThemedText>
          <ThemedText className='font-sansitaBoldItalic text-xl'>${bet.stake}</ThemedText>
        </View>
        <View className={`${flex} mb-2`}>
          <ThemedText className='font-sansitaBoldItalic text-xl'>Total Winning:</ThemedText>
          <ThemedText className='font-sansitaBoldItalic text-xl !text-sec'>${bet.potentialWin}</ThemedText>
        </View>
      </View>
      <View>
        {bet.games.map((e: MatchProps )=>(
          <View key={e.id} className={`${flex} bg-light-blue rounded-md mb-3 p-3`}>
            <View>
              <View className={`${flexNoJustify} gap-2`}>
                <Ball />
                {/* <ThemedText className='!text-black font-sansitaBoldItalic text-[18px]'>{e.selected}</ThemedText> */}
              </View>
              <ThemedText className='my-3 !text-black'>{e.match}</ThemedText>
            </View>
            <View className=' items-center'>
              <ThemedText className='!text-sec mb-2'>3 - 2</ThemedText>
              <ThemedText className='!text-black'>{e.time}</ThemedText>
            </View>
            <View className={`${flexNoJustify} gap-2 `}>
              <ThemedText className='!text-black'>{e.odds}</ThemedText>
              {e.status === "won" ? 
                <Won /> :
                <Lost />
              }
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Main

const styles = StyleSheet.create({})

export const FlexContent = ({rh, lh, text1, text2, className}: flxCont) => {
  const status = rh === "won"
  return (
    <View className={`${flex} ${className} mb-3`}>
      <ThemedText className={`${text1} text-lg`}>{lh}</ThemedText>
      {lh === "Status" ? 
      <ThemedText className={`${status ? "!text-sec" : "!text-red-500"} capitalize text-lg`}>{rh}</ThemedText>:
      <ThemedText className={`${text2} capitalize text-lg`}>{rh}</ThemedText> 
      } 
    </View>
  )
}