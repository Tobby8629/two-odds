import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { flex, flexNoJustify } from '@/constants/style'
import SettingsIcon from '@/assets/SVGs/SettingsIcon'
import OpenEye from '@/assets/SVGs/OpenEye'
import BigLogo from '@/assets/SVGs/BigLogo'
import MoneyTransfer from '@/assets/SVGs/icons/MoneyTransfer'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { useProfile } from '@/hooks/useProfile'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { formatCurrency } from '@/constants/functions'
import { WalletCurrency } from '@/types/wallet.types'
import Loading from '@/components/Reuseables/Loading'

const CURRENCY_LABELS: Record<WalletCurrency, string> = {
  NGN: "NGN",
  USDT: "USD",
}

const Header = () => {
  const [visible, setVisible] = useState(false)
  const [currency, setCurrency] = useState<WalletCurrency>("NGN")

  const { data: profile } = useProfile()

  const {
    data: balance,
    isPending: isBalancePending,
    isError: isBalanceError,
    refetch: refetchBalance,
  } = useWalletBalance()

  /* Balances move on every settled bet, so re-read them on each visit. */
  useFocusEffect(
    useCallback(() => {
      refetchBalance()
    }, [refetchBalance])
  )

  const amount =
    currency === "NGN" ? balance?.ngn?.balance : balance?.usdt?.balance

  const balanceLabel = isBalanceError
    ? "Unavailable"
    : formatCurrency(amount, currency)

  const toggleCurrency = () =>
    setCurrency((c) => (c === "NGN" ? "USDT" : "NGN"))

  return (
    <View className='px-5 pt-[3.8rem] pb-6 bg-[#1F5079]'>
      <View className={`${flex} pb-4`}>
        <Text numberOfLines={1} className='text-white flex-1 mr-4'>
          {profile?.username ? `@${profile.username}` : "Profile"}
        </Text>

        <Pressable onPress={() => router.push("/(settings)")}>
          <SettingsIcon />
        </Pressable>
      </View>

      {/* Wallet card */}
      <View className='rounded-3xl px-5 pt-4 pb-4 overflow-hidden' style={styles.card}>
        <View pointerEvents="none" style={styles.logo}>
          <BigLogo width={150} height={148} opacity={0.9} />
        </View>

        <View className={`${flexNoJustify} gap-3`}>
          <Pressable
            onPress={toggleCurrency}
            className='flex-row items-center bg-white/10 rounded-md px-2 py-1'
          >
            <Text className='text-white text-xs mr-1'>
              {CURRENCY_LABELS[currency]}
            </Text>
            <Ionicons name="chevron-down" size={12} color="#FFFFFF" />
          </Pressable>

          <Pressable onPress={() => setVisible(!visible)}>
            {visible ? (
              <OpenEye />
            ) : (
              <FontAwesome5 name="eye-slash" size={18} color="white" />
            )}
          </Pressable>
        </View>

        <View className='mt-5 mb-4'>
          {isBalancePending ? (
            <Loading inline size={34} />
          ) : (
            <Text className='text-white text-3xl font-semibold'>
              {visible ? balanceLabel : "****"}
            </Text>
          )}
          <Text className='text-[#9FB6C9] text-xs mt-1'>Total Balance</Text>
        </View>

        <View style={styles.divider} />

        <View className={`${flex} mt-4`}>
          <Pressable
            onPress={() => router.push("/(transactions)/deposit")}
            className='flex-row items-center justify-center gap-2 bg-sec rounded-xl flex-1 mr-3 h-[46px]'
          >
            <Text className='text-black text-base font-semibold'>Deposit</Text>
            <MoneyTransfer />
          </Pressable>

          <Pressable
            onPress={() => router.push("/(transactions)/withdraw")}
            className='flex-row items-center justify-center gap-2 rounded-xl flex-1 h-[46px]'
            style={styles.outlineButton}
          >
            <Text className='text-white text-base font-semibold'>Withdrawal</Text>
            <MoneyTransfer />
          </Pressable>
        </View>

        <View className={`${flex} mt-4`}>
          <Text className='text-[#9FB6C9] text-[11px]'>BET ID :</Text>
          <Text numberOfLines={1} className='text-[#9FB6C9] text-[11px] flex-1 text-right ml-3'>
            {profile?.displayName || profile?.username || ""}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000000",
  },
  logo: {
    position: "absolute",
    top: -6,
    right: -10,
  },
  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
})
