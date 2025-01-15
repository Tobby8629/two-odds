import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Verify from '@/assets/SVGs/VerifiedSvg'
import { router } from 'expo-router'
import { verified } from '@/assets/images'

const Verified = () => {
  return (
    <View className='bg-pry h-screen justify-center items-center'>
       <Image source={verified} />
       <Text className=' font-bold text-2xl my-8 text-white'>Email has been verified</Text>
       <Pressable onPress={()=> router.replace("/Onboarding/CreatePassword")}>
        <Text className='text-sec text-xl font-semibold'>Continue</Text>
       </Pressable>
    </View>
  )
}

export default Verified

const styles = StyleSheet.create({})