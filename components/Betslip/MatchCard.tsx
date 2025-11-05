import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import useBetslip from '@/store/useStore'
import { flex, flexNoJustify } from '@/constants/style'
import GoldX from '@/assets/SVGs/icons/GoldX'
import Ball from '@/assets/SVGs/sport/ball'
import { ThemedText } from '../ThemedText'


const MatchCard = () => {
  const { selectedGames, removeMatch} = useBetslip()
  const oddsKey = {
  Home: "homeOdds",
  Draw: "drawOdds",
  Away: "awayOdds",
} as const;
  return (
    <ScrollView className='p-7'>
      {selectedGames.map((e, index)=>(
        <View key={index} className={`${flex} mb-5`}>
          <View className={`${flexNoJustify} gap-3 min-w-[80%]`}>
            <Pressable onPress={() => removeMatch(e.selected.id)}>
              <GoldX />
            </Pressable>
            <View className='gap-2'>
              <View className={`${flexNoJustify} gap-2`}>
                <Ball />
                <ThemedText className=' font-semibold !text-white text-2xl capitalize'>{e?.selected?.option}</ThemedText>
              </View>
              <ThemedText className=' font-medium text-lg'>{e.match}</ThemedText>
              <ThemedText className='capitalize pr-3'>{e.time}</ThemedText>
            </View>
          </View>
          <ThemedText>{e.selected ? e[oddsKey[e.selected.option]] : ""}</ThemedText>
        </View>
      ))}
    </ScrollView>
  )
}

export default MatchCard

const styles = StyleSheet.create({})