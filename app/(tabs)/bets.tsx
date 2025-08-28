import { StyleSheet, Text, View, ScrollView, Dimensions, Pressable } from 'react-native'
import React from 'react'
import EmptyState from '@/components/Reuseables/EmptyState'
import { ThemedText } from '@/components/ThemedText'
import { flex, flexNoJustify } from '@/constants/style'
import EachBet from '@/components/Bets/EachBet'
import {bets as matchBets} from '@/constants/data'

const bets = () => {
  
  const {height} = Dimensions.get("window")
  return (
    <View  
        style={{
        height: height - 70,
        backgroundColor: "#003c6f",
      }} className=' bg-[#003c6f]'
    >
    <View className={`${flex} fixed top-0 pt-14 pb-7 px-7 left-0 right-0 z-10 bg-pry-light`}>
        <View className='h-10 w-10 justify-center items-center rounded-full bg-sec'>
          <Text className='text-xl font-bold text-white '>{bets.length}</Text>
        </View>
        <ThemedText>Open Bets</ThemedText>
        <View className={`${flexNoJustify} gap-2 `}>
          <ThemedText className={`!text-[#cbc9c9] text-lg`}>$20.00</ThemedText>
          <View className=" w-7 h-7 rounded-full p-2 bg-[#cbc9c9]"/>
        </View>
      </View>
    <ScrollView>
      {matchBets.length <= 0 ? <EmptyState className='!mt-[50%] ' text='No Open Bets' /> : 
      <>
        <EachBet />
      </>
      }
    </ScrollView>
    </View>
  )
}

export default bets

const styles = StyleSheet.create({})