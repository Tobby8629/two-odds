import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useBetslip from '@/store/useStore'
import { flex, flexNoJustify } from '@/constants/style'
import GoldX from '@/assets/SVGs/icons/GoldX'
import Ball from '@/assets/SVGs/sport/ball'
import { ThemedText } from '../ThemedText'

const MatchCard = () => {
  const { match, removeMatch} = useBetslip()
  return (
    <ScrollView className='p-7'>
      {match.map((e, index)=>(
        <View key={index} className={`${flex} mb-5`}>
          <View className={`${flexNoJustify} gap-3 min-w-[80%]`}>
            <Pressable onPress={() => removeMatch(e.id)}>
              <GoldX />
            </Pressable>
            <View className='gap-2'>
              <View className={`${flexNoJustify} gap-2`}>
                <Ball />
                <ThemedText className=' font-semibold text-2xl capitalize'>{e.selected}</ThemedText>
              </View>
              <ThemedText className=' font-medium text-lg'>{e.match}</ThemedText>
              <ThemedText className='capitalize pr-3'>{e.time}</ThemedText>
            </View>
          </View>
          <ThemedText>{e.odds}</ThemedText>
        </View>
      ))}
    </ScrollView>
  )
}

export default MatchCard

const styles = StyleSheet.create({})