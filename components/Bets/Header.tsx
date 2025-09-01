import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import { FontAwesome } from '@expo/vector-icons'
import { betProps, MatchProps } from '@/interface'
import { flexNoJustify } from '@/constants/style'

interface HeaderProps {
  select: (id: number) => void,
  bet: betProps,
  selected: number | null
}

const Header = ({select, bet, selected}: HeaderProps) => {
  const hasLiveGame = bet?.games?.some((game: MatchProps) => game.live === true);
  return (
    <Pressable onPress={()=>select(bet?.id)}>
      <View className='flex-row border-b-[.5px] border-sec py-2 justify-between items-center'>
        <ThemedText className='!text-black capitalize'>
          {bet.betType} | {bet.date}
        </ThemedText>
        <View className={`${flexNoJustify}`}>
          {hasLiveGame ? 
           <ThemedText className='!text-sec font-medium bg-[#d1d5db6d] px-2 py-1'>Live</ThemedText> : null
          }
          <Pressable onPress={()=>select(bet?.id)} className='px-2'>
            <FontAwesome name={selected=== bet?.id ? "angle-up" : 'angle-down'} size={15} color={"#FFA500"}/>
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}

export default Header

const styles = StyleSheet.create({})