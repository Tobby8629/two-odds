import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/Reuseables/Header'
import Cancel from '@/assets/SVGs/Cancel'
import { ThemedText } from '@/components/ThemedText'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { FlexContent } from '../../(bet-history)/betslip/Main'
import GreenUsdt from '@/assets/SVGs/icons/GreenUsdt'
import { flex, flexNoJustify } from '@/constants/style'
import Button from '@/components/Reuseables/Button'


const WSummary = () => {
  const textStyle = " !text-black"
  return (
    <View className='h-screen bg-pry'>
      <Header>
       <Pressable onPress={()=> router.back()}>
          <FontAwesome6 name="angle-left" size={24} color="white" />
        </Pressable>
        <ThemedText className='w-[90%] text-center font-semibold text-2xl'>Withdrawal</ThemedText>
      </Header>
      <View className='h-[80%] w-[85%] mx-auto justify-center'>
        <View className='bg-light-blue rounded-2xl h-[415px] py-8  p-5'>
            <ThemedText className={`${textStyle} text-center`}>Withdrawal Amount</ThemedText>
            <ThemedText className={`${textStyle} text-center my-2 font-sansitaBoldItalic text-xl`}>$4000</ThemedText>
            <View className={`${flex} py-5 border-b-[1px] border-gray-300`}>
               <ThemedText className={`${textStyle} text-lg`}>Asset:</ThemedText>
               <View className={`${flexNoJustify} gap-3 `}>
                <GreenUsdt />
                <ThemedText className={textStyle}>USDT</ThemedText>
               </View>
            </View>
            <FlexContent className='py-5 border-b-[1px] border-gray-300' text1={textStyle} text2={textStyle} lh={"Balance:"} rh={"$0.00"}/>
            <FlexContent className='py-5 border-b-[1px] border-gray-300' text1={textStyle} text2={textStyle} lh={"Received:"} rh={"$0.00"}/>
            <FlexContent className='py-5 ' text1={textStyle} text2={textStyle} lh={"Wallet Address:"} rh={"$0.00"}/>
            <Button 
              text='PIN'
              textStyle='!uppercase'
              className='mx-auto my-3 w-[80%] '
              onPress={()=>router.push("/(transactions)/withdrawal/PIN")}
            />
        </View>
      </View>
    </View>
  )
}

export default WSummary

const styles = StyleSheet.create({})