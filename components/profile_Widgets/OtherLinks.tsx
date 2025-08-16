import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AngleRight from '@/assets/SVGs/Angle-right'
import { flex } from '@/constants/style'

const OtherLinks = () => {
  const options = [
    {
      name: "Notifications Center",
      link: "/(tabs)/notifications",
    },
    {
      name: "Customer Service",
      link: "/(tabs)/customer-service",
    },
    {
      name: "Change Password",
      link: "/(tabs)/change-password",
    },
    {
      name: "Biometric Login",
      link: "/(tabs)/biometric-login",
    },
    {
      name: "Betting Limit",
      link: "/(tabs)/Betting-loimit",
    },
    {
      name: "communities",
      link: "/(tabs)/communities",
    }
  ]
  return (
    <View className='pt-6 pl-7'>
      {options.map((e, i) => (
        <Pressable
          key={i}
          onPress={() => console.log("click")}
          className={`${flex} items-center justify-between py-3 ${i+1 === options?.length ? "border-none" : "border-b"} border-[#1F5079]`}
        >
          <Text className='text-white text-lg font-medium'>{e.name}</Text>
          {e?.name !== "Biometric Login" && 
          <View className='pr-7'>
            <AngleRight />
          </View>
          }
        </Pressable>
      ))}
    </View>
  )
}

export default OtherLinks

const styles = StyleSheet.create({})