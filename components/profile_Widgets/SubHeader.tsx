import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { flex, flexColumn } from '@/constants/style'
import BetHistory from '@/assets/SVGs/profile/Bet_History'
import Transactions from '@/assets/SVGs/profile/Transactions'
import { RelativePathString, router } from 'expo-router'


const SubHeader = () => {
  const profileHeader = [
    {
      name: "Bet History",
      icon: BetHistory,
      link: "/bet-history" as RelativePathString
    },
    {
      name: "Transactions",
      icon: Transactions,
      link: "/(transactions)/history" as RelativePathString
    },
    {
      name: "Rewards",
      icon: Transactions,
      link: "/(tabs)/rewards" as RelativePathString
    },
  ]

  return (
    <View className={`${flex} items-center justify-between px-16 pb-2 pt-6 border-b border-[#1F5079]`}>
      {profileHeader.map((e, i) => (
        <Pressable
          key={i}
          onPress={()=> router.push(e.link)}
          >
          <View className={`${flexColumn}`}>
            <e.icon />
            <Text className='text-white mt-2'>{e.name}</Text>
          </View>
          </Pressable>
        ))}
    </View>
  )
}

export default SubHeader

const styles = StyleSheet.create({})