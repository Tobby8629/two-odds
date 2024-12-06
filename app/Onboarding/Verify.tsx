import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SmallLogo from '@/assets/SVGs/SmallLogo'
import Button from '@/components/Reuseables/Button'
import { router } from 'expo-router'

const Verify = () => {
  return (
    <View className='h-screen bg-pry'>
      <SmallLogo />
      <Text>Verify your email address</Text>
      <Text>We’ve sent a verification code to </Text>
      <Text>Chrisjr@gmail.com</Text>
      <Button text='verify' onPress={() => router.replace('/Onboarding/Verified')}
         className={` m-auto mt-14 h-[45px] rounded-3xl  bg-sec`}
       />
    </View>
  )
}

export default Verify

const styles = StyleSheet.create({})