import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AngleRight from '@/assets/SVGs/Angle-right'
import { flex } from '@/constants/style'
import { RelativePathString, router } from 'expo-router'

interface LinkOption {
  name: string;
  link: RelativePathString;
  /** Screens that do not exist yet render as inert rows instead of dead routes. */
  enabled: boolean;
}

const options: LinkOption[] = [
  {
    name: "Notifications Center",
    link: "/(settings)/notifications" as RelativePathString,
    enabled: true,
  },
  {
    name: "Customer Service",
    link: "/(settings)/customer-service" as RelativePathString,
    enabled: false,
  },
  {
    name: "security",
    link: "/(settings)/(security)" as RelativePathString,
    enabled: true,
  },
  {
    name: "Biometric Login",
    link: "/(settings)/biometric-login" as RelativePathString,
    enabled: false,
  },
  {
    name: "Betting Limit",
    link: "/(settings)/accountLimit" as RelativePathString,
    enabled: true,
  },
  {
    name: "communities",
    link: "/(settings)/communities" as RelativePathString,
    enabled: false,
  },
]

const OtherLinks = () => {
  return (
    <View className='pt-6 pl-7'>
      {options.map((e, i) => (
        <Pressable
          key={e.name}
          disabled={!e.enabled}
          onPress={() => router.push(e.link)}
          className={`${flex} items-center justify-between py-3 ${i+1 === options.length ? "border-none" : "border-b"} border-[#1F5079]`}
        >
          <Text className={`font-poppins text-base font-normal ${e.enabled ? "text-white" : "text-white/40"}`}>{e.name}</Text>
          {e.name !== "Biometric Login" &&
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
