import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { flex } from '@/constants/style'
import { betProps } from '@/interface'

interface mainProps {
  bet?: betProps
}

interface flxCont {
  rh: string
  lh: string
}

const Main = ({bet}: mainProps) => {
  if (!bet) return <Text>No bet found</Text>;

  return (
    <ScrollView className='m-5'>
      <View className='border-b-[1px] border-gray-400'>  
        <FlexContent lh={`Bet ID Number: ${bet?.id}`} rh={(bet.date)}/>
        <FlexContent lh="No of Events" rh={`${bet.games.length} of ${bet.games.length} completed`} />
        <FlexContent lh='Bet Type' rh={bet.betType} />
        <FlexContent lh="Status" rh={"lost"} />
        <FlexContent lh="Odds" rh={"15.90"} />
      </View>
    </ScrollView>
  )
}

export default Main

const styles = StyleSheet.create({})

const FlexContent = ({rh, lh}: flxCont) => {
  const status = rh === "winning"
  console.log(status)
  return (
    <View className={`${flex} mb-3`}>
      <ThemedText className=' text-lg'>{lh}</ThemedText>
      {lh === "Status" ? 
      <ThemedText className={`${status ? "!text-sec" : "!text-red-500"} capitalize text-lg`}>{rh}</ThemedText>:
      <ThemedText className='capitalize text-lg'>{rh}</ThemedText> 
      } 
    </View>
  )
}