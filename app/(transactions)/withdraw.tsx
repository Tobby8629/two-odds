import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BetHeader from '@/components/Reuseables/BetHeader'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { flexNoJustify } from '@/constants/style'
import { router } from 'expo-router'
import Dropdown, { ItemProp } from '@/components/Reuseables/dropdown'

const withdraw = () => {
  const dropdown = [
    {
      title: "USDT",
      value: "usdt",
      icon:""
    },
    {
      title: "Naira",
      value: "naira",
      icon:""
    },
    {
      title: "Solana",
      value: "sol",
      icon:""
    }

  ]
  const [select, setSelect] = useState<ItemProp>(dropdown[0])
  return (
    <View className=' bg-[#003c6f] h-screen'>
      <BetHeader
          left={
            <Pressable onPress={()=> router.back()}>
              <FontAwesome6 name="angle-left" size={24} color="white" />
            </Pressable>
          }
          middle={
            <ThemedText className='text-2xl text-center '>Withdrawal</ThemedText>
          }
          Right ={
            <View className={`${flexNoJustify} gap-2`}>
              <ThemedText className={`!text-[#cbc9c9] text-xl`}>$20.00</ThemedText>
              <View className='w-[20px] h-[20px] bg-white rounded-full items-center justify-center'></View>
            </View>
          }
      />
      <ScrollView className='px-5 my-2'>
        <ThemedText>Select Asset</ThemedText>
        <View className={`border-[1px] border-sec my-2 px-2`}>
          {select.icon}
          <Dropdown 
            title={select?.title}
            items={dropdown}
            setSelect={setSelect}
            wrapper=' !justify-between'
            listWrapper='!w-[90%] !-bottom-[100px] !left-[20px] !mx-auto '
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default withdraw

const styles = StyleSheet.create({})