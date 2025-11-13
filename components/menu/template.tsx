import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ThemedText } from '../ThemedText'
import { FontAwesome6 } from '@expo/vector-icons'

interface TEMPLATE<T> {
  subHeader: 2,
  header1?: "popular leagues" | "All leagues"
  header2?: "popular leagues" | "All leagues"
  firstArr: T[]
  secArr?: T[]
  sport: ReactNode 
}

export function LeagueTemplate<T> ({ sport, header1, header2, firstArr,  secArr, subHeader}: TEMPLATE<T>) {
  return (
    <View>
        <View className='bg-pry-light py-3 px-6 flex-row items-center justify-between'>
          <ThemedText className='capitalize text-lg font-medium'>{header1}</ThemedText>
          <View className='flex-row gap-1'>
            {sport}
            <ThemedText>All live</ThemedText>
          </View>
        </View>
        <View className='px-6'>
          {firstArr.map((item, idx) => (
            <View 
            key={idx} 
            className={`py-5 ${idx === firstArr.length - 1 ? "" : "border-b"} border-gray-400 flex-row items-center justify-between`}
            >
              <ThemedText>{item.country}</ThemedText>
              <FontAwesome6 name="angle-right" color={"white"} />
            </View>
          ))}
        </View>
        {secArr && 
          <>
            <View className='bg-pry-light py-3 px-6 flex-row items-center justify-between'>
              <ThemedText className='capitalize text-lg font-medium'>{header2}</ThemedText>
            </View>
            <View className='px-6'>
              {secArr.map((item, idx) => (
                <View 
                key={idx} 
                className={`py-5 ${idx === secArr.length - 1 ? "" : "border-b"} border-gray-400 flex-row items-center justify-between`}
                >
                  <ThemedText>{item.country}</ThemedText>
                  <FontAwesome6 name="angle-right" color={"white"} />
                </View>
              ))}
            </View>
            </>
          }
    </View>
  )
}



const styles = StyleSheet.create({})

