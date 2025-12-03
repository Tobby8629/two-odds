import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import MatchMore from '@/assets/SVGs/match/MatchMore'
import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/Reuseables/Button'

const EachMatch = () => {
  const isIos = Platform.OS === "ios";
  return (
    <View className='bg-pry flex-1'>
      <View className={`flex-row justify-between px-6 items-center bg-pry-light ${isIos ? "h-[120px] pt-14" : "h-[80px]"} `}>
        <FontAwesome6 name="angle-left" size={12} color="black" />
        <Text>Match Time</Text>
        <Pressable>
          <MatchMore />
        </Pressable>
      </View>
      <View className='flex-row items-center px-6 justify-between'>
        <View>
          <ThemedText>logo</ThemedText>
          <ThemedText>Club</ThemedText>
        </View>

        <View>
          <ThemedText className='text-center'>VS</ThemedText>
          <ThemedText className='text-center'>Time</ThemedText>
          <Button text='statistics' onPress={()=>console.log("show statistic in match card")}>
            <ThemedText>stat logo</ThemedText>
          </Button>
        </View>

        <View>
          <ThemedText>logo</ThemedText>
          <ThemedText>Club</ThemedText>
        </View>
      </View>
    </View>
  )
}

export default EachMatch

const styles = StyleSheet.create({})