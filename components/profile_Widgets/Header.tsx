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
import { useProfile } from '@/hooks/useProfile'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { formatCurrency } from '@/constants/functions'

const Header = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const { data: profile } = useProfile();

  const {
    data: balance,
    isPending: isBalancePending,
    isError: isBalanceError,
  } = useWalletBalance();

  /*
   * The naira wallet is the primary one: deposits, withdrawals and bank
   * details all run through Paystack. USDT is available on the same endpoint
   * if a second row is ever added.
   */
  const balanceLabel = isBalancePending
    ? "..."
    : isBalanceError
      ? "Unavailable"
      : formatCurrency(balance?.ngn?.balance, "NGN");

  return (
    <View className='px-7 pt-[3.8rem] pb-8 bg-[#1F5079]'>
      <View className={`${flex} py-4`}>
      <View className='flex-row items-center gap-2 flex-1 mr-4'>
          <UserLogo />
          <Text numberOfLines={1} className='text-white flex-1'>
            {profile?.id ? `Profile ID: ${profile.id}` : "Profile ID"}
          </Text>
      </View>
      <Pressable onPress={()=> router.push("/(settings)")}>
        <SettingsIcon />
      </Pressable>
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
          {visible ? balanceLabel : '****'}
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