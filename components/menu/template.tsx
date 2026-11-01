import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ThemedText } from '../ThemedText'
import { FontAwesome6 } from '@expo/vector-icons'
import { Link, RelativePathString, router } from 'expo-router'
import { CountryLeagues } from '@/interface'
import { useSportCountries } from '@/hooks'
import { useSport } from '@/store/useStore'

interface TEMPLATE {
  // subHeader: 2,
  // header1?: "popular leagues" | "All leagues"
  // header2?: "popular leagues" | "All leagues"
  // firstArr: T[]
  // secArr?: T[]
  sport: ReactNode 
}

export function LeagueTemplate ({ sport}: TEMPLATE) {
  const update = (country: string) => {
    router.push({pathname:`/(menu)/Leagues/${country}` as RelativePathString})
  }

  const popular = (arry: CountryLeagues[]) => {
    const list = arry.filter((e)=> e.popular === true)
    return list
  }

  const regular = (arry: CountryLeagues[]) => {
    const list = arry.filter((e)=> e.popular === false)
    return list
  }

  const { data, isLoading } = useSportCountries()


  // const firstArr = popular(dataArry)
  // const secArr = regular(dataArry)
  return (
    <View className='flex-1'>
      {data &&
          <>
            <View className='bg-pry-light py-3 px-6 flex-row items-center justify-between'>
              <ThemedText className='capitalize text-lg font-medium'>All Leagues</ThemedText>
              <View className='flex-row gap-1'>
                {sport}
                <ThemedText>All live</ThemedText>
              </View>
            </View>
          
            <View className='px-6'>
              {data.data.map((item, idx) => (
                <Pressable
                onPress={()=>update(item)}
                key={idx} 
                className={`py-5 ${idx === data.data.length - 1 ? "" : "border-b"} border-gray-400 flex-row items-center justify-between`}
                >
                  <ThemedText>{item}</ThemedText>
                  <FontAwesome6 name="angle-right" color={"white"} />
                </Pressable>
              ))}
            </View>
          </>
        }
        {/* <View className='bg-pry-light py-3 px-6 flex-row items-center justify-between'>
          <ThemedText className='capitalize text-lg font-medium'>All Leagues</ThemedText>
        </View>
        <View className='px-6'>
          {data?.data.map((item, idx) => (
            <Pressable
            onPress={()=>update(item)}
            key={idx} 
            className={`py-5 ${idx === dataArry.length - 1 ? "" : "border-b"} border-gray-400 flex-row items-center justify-between`}
            >
              <ThemedText>{item}</ThemedText>
              <FontAwesome6 name="angle-right" color={"white"} />
            </Pressable>
          ))}
        </View> */}
    </View>
  )
}



const styles = StyleSheet.create({})

