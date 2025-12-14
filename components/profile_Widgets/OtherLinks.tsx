import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AngleRight from '@/assets/SVGs/Angle-right'
import { flex } from '@/constants/style'
import { Link } from 'expo-router'

const OtherLinks = () => {
  const options = [
    { name: "Notifications Center", link: "/notifications", enabled: true },
    { name: "Customer Service", link: "/customer-service", enabled: false },
    { name: "Change Password", link: "/change_password", enabled: true },
    { name: "Biometric Login", link: "/biometric-login", enabled: false },
    { name: "Betting Limit", link: "/Betting-limit", enabled: false },
    { name: "Communities", link: "/Communities", enabled: false },
    { name: "Languages", link: "/Languages", enabled: false },
    { name: "Tutorial", link: "/Tutorial", enabled: false },
    { name: "Feedback", link: "/Feeback", enabled: false },
  ] as const

  return (
    <View className="pt-6 pl-7">
      {options.map((e, i) => {
        const item = (
          <Pressable
            className={`${flex} items-center justify-between py-3 ${
              i + 1 === options.length ? "border-none" : "border-b"
            } border-[#1F5079]`}
          >
            <Text className="text-white text-lg font-medium">
              {e.name}
            </Text>

            {e.name !== "Biometric Login" && (
              <View className="pr-7">
                <AngleRight />
              </View>
            )}
          </Pressable>
        )

        // Only wrap enabled items with Link
        return e.enabled ? (
          <Link key={i} href={e.link} asChild>
            {item}
          </Link>
        ) : (
          <View key={i}>{item}</View>
        )
      })}
    </View>
  )
}

export default OtherLinks

const styles = StyleSheet.create({})
