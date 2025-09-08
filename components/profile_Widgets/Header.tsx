import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { flex, flexCenter, flexNoJustify } from '@/constants/style'
import UserLogo from '@/assets/SVGs/profile/UserLogo'
import SettingsIcon from '@/assets/SVGs/SettingsIcon'
import OpenEye from '@/assets/SVGs/OpenEye'
import Wallet from '@/assets/SVGs/profile/Wallet'
import Withdraw from '@/assets/SVGs/profile/Withdraw'
import { FontAwesome5 } from '@expo/vector-icons'

import { router } from 'expo-router'

const Header = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <View className='px-7 pt-[3.8rem] pb-8 bg-[#1F5079]'>
      <View className={`${flex} py-4`}>
      <View className='flex-row items-center gap-2'>
          <UserLogo />
          <Text className='text-white'>Profile ID</Text>
      </View>
      <SettingsIcon />
      </View>
      <View className={`${flex} my-2 `}>
      <View className="flex-row items-center gap-2">
          <Pressable onPress={toggleVisibility}>
          {visible ? (
              <OpenEye />
          ) : (
              <FontAwesome5 name="eye-slash" size={20} color="white" />
          )}
          </Pressable>
          <Text className="text-white">Total Balance</Text>
      </View>
      <Text className="text-white">
          {visible ? '$20' : '****'}
      </Text>
      </View>
      <View className={`${flexCenter} mt-5 gap-5`}>
      <Pressable onPress={()=>router.push("/(transactions)/deposit")} className={`${flexNoJustify} gap-2 bg-gray-300 w-[161px] h-[45px] rounded-lg  items-center justify-center text-white my-1`}>
          <Wallet />
          <Text className={`text-center capitalize text-white text-xl font-semibold`}>Deposit</Text>
      </Pressable>
      <Pressable onPress={()=>router.push("/(transactions)/withdraw")} className={`${flexNoJustify} gap-2 bg-gray-300 w-[161px] h-[45px] rounded-lg  items-center justify-center text-white my-1`}>
          <Withdraw />
          <Text className={`text-center capitalize text-white text-xl font-semibold`}>Withdrawal</Text>
      </Pressable>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})