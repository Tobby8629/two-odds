import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SmallLogo from '@/assets/SVGs/SmallLogo'
import Button from '@/components/Reuseables/Button'
import { Link, router } from 'expo-router'
import OTPInput from '@/components/ui/Otp'
import useKeyboard from '@/hooks/useKeyboard'

const Verify = () => {
  const {isKeyboardVisible} = useKeyboard()
  return (
    <View className={`h-screen bg-pry ${isKeyboardVisible ? "pt-[80px]": "justify-center"} items-center`}>
      <View className='mb-20'>
        <SmallLogo />
      </View>
      
      <Text className=' text-3xl text-white font-bold mb-8'>Verify your email address</Text>
      <Text className='text-xl font-light text-white'>We’ve sent a verification code to </Text>
      <Text className='text-xl font-semibold text-white'>Chrisjr@gmail.com</Text>
      <View className='my-5'>
        <OTPInput onSubmit={()=>console.log("work")} />
      </View>

      <Text className='w-8/12 text-center text-white font-light text-base'>
        Didn’t receive your verification code? <Link className='text-sec' href={"/"}>Click here to 
        resend</Link>
      </Text>
      
      <Button text='verify' onPress={() => router.replace("/Onboarding/verify/Verified")}
         className={` m-auto mt-14 h-[45px] rounded-3xl  bg-sec`}
       />
    </View>
  )
}

export default Verify

const styles = StyleSheet.create({})