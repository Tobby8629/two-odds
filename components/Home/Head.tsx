import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SmallLogo from '@/assets/SVGs/SmallLogo'
import { Link } from 'expo-router'
import WalletProfile from '@/assets/SVGs/WalletProfile'
import { flex, flexCenter } from '@/constants/style'

const Head = () => {
  return (
    <View className='flex-row border-b-2 border-white items-center justify-between py-7 p-5 mx-1 rounded-lg shadow-md'>
      <Link href={"/"} className='flex-row items-center gap-2'>
          <SmallLogo width={40} height={40}/>
        </Link>
      <TextInput 
        className='w-[70%] h-[30px] placeholder:capitalize bg-white rounded-2xl p-1 text-center'
        placeholder='search sports, teams, players...'      
      />
      <View className={`${flexCenter} bg-white w-[35] h-[35] rounded-full py-1`}>
        <Link href={"/(tabs)/profile"}>
          <WalletProfile width={25} height={25} />
        </Link>
      </View>
    </View>
  )
}

export default Head

const styles = StyleSheet.create({})