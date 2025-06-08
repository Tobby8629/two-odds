import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SmallLogo from '@/assets/SVGs/SmallLogo'

const Head = () => {
  return (
    <View className='flex-row border-b-2 border-white items-center justify-between py-7 p-5 mx-1 rounded-lg shadow-md'>
      <SmallLogo width={40} height={40}/>
      <TextInput 
        className='w-7/12 h-[30px] placeholder:capitalize bg-white rounded-2xl p-1 text-center'
        placeholder='search sports, teams, players...'      
      />
      <View className='flex-row gap-2 items-center justify-between rounded-2xl py-1'>
        <Text className='text-xl font-semibold text-white'>$20.00</Text>
        <View className='w-[20px] h-[20px] bg-white rounded-full items-center justify-center'></View>
      </View>
    </View>
  )
}

export default Head

const styles = StyleSheet.create({})