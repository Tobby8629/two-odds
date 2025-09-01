import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { betProps, MatchProps } from '@/interface'
import { flex, flexNoJustify } from '@/constants/style'
import Ball from '@/assets/SVGs/sport/ball'
import { ThemedText } from '../ThemedText'
import Won from '@/assets/SVGs/bets/Won'
import Lost from '@/assets/SVGs/bets/Lost'
import OddsChange from '@/assets/SVGs/bets/OddsChange'

interface Open {
  e: MatchProps,
  i: number,
  bet: betProps
}

const ViewBet = ({e,i,bet}: Open) => {
  return (
    <>
      <View className={` ${flex} py-5 px-3 ${i+1 === bet.games.length ? "" : "border-b-[.5px] border-gray-400"} `}>
        <View>
        <View className={`${flexNoJustify} gap-1`}>
          <Ball />
          <ThemedText className='!text-black text-xl font-medium'>{e.selected}</ThemedText>
        </View>
        <ThemedText className='!text-black text-lg font-medium mb-1'>{e.match}</ThemedText>
        </View>
        { 
          e.live ? 
          <View className={`${flexNoJustify} gap-[5px]`}>
            <ThemedText className='!bg-red-500 text-xs p-1 rounded-[4px] '>Live 30`</ThemedText>
            <View>
              <ThemedText className='text-center !text-sec'>0 - 0</ThemedText>
              <ThemedText className='text-center !text-black'> 1st Half</ThemedText>
            </View>
          </View> :
          <ThemedText className='!text-black capitalize'>{e.time}</ThemedText>
        }
        <View className={`${flexNoJustify} gap-2 items-center`}>
          <View className={`${flexNoJustify} gap-1 items-center`}>
            <ThemedText className='!text-black text-lg font-medium mb-1'>
              {e.odds}
            </ThemedText>
            {e.live ? <OddsChange className='ml-3' /> : null}
          </View>
          <>
            {
              e.status === "pending" ? 
              <View className='w-[13px] h-[13px] rounded-full border-[1px] border-black bg-transparent'></View> :
              e.status === "won" ? 
               <Won /> :
               <Lost />
            }
          </>
        </View>
      </View>
      
    </>
  )
}

export default ViewBet

const styles = StyleSheet.create({})