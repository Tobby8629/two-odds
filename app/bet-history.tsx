import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { flex, flexNoJustify } from '@/constants/style'
import { ThemedText } from '@/components/ThemedText'
import BetHeader from '@/components/Reuseables/BetHeader'
import { router } from 'expo-router'
import { useBetHistory } from '@/store/useStore'

const betHistory = () => {
  const {height} = Dimensions.get("window")
  const { bets } = useBetHistory()
  const navigate = (id: number) => router.push({
    pathname: "/(bet-history)/betslip/[id]",
    params: { id: String(id) },
  });
    return (
      <View className=' bg-[#003c6f] h-screen'>
        <BetHeader 
          left={
            <View className='h-10 w-10 justify-center items-center rounded-full bg-sec'>
              <Text className='text-xl font-bold text-white '>{bets.length}</Text>
            </View>
          }
          middle={ <ThemedText>Open Bets</ThemedText>}
          Right={
          <View className={`${flexNoJustify} gap-2 `}>
            <ThemedText className={`!text-[#cbc9c9] text-lg`}>$20.00</ThemedText>
            <View className=" w-7 h-7 rounded-full p-2 bg-[#cbc9c9]"/>
          </View>
          }
        />
        <ScrollView>
          {bets.map((e,i)=>(
            <Pressable key={Number(i)} onPress={()=> navigate(e?.id)}>
              <ThemedText>{e.id}</ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </View>
  )
}

export default betHistory

const styles = StyleSheet.create({})