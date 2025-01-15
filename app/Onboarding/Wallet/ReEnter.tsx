import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Cancel from '@/assets/SVGs/Cancel'
import { Link } from 'expo-router'

const ReEnter = () => {
  return (
    <View className='bg-pry h-screen py-16 px-7 justify-between'>
      <View>
        <View className='flex-row justify-between items-center '>
          <Cancel />
          <Link href={"/Onboarding/Welcome"} className='text-white text-2xl'>Next</Link>
        </View>
        <View>
          <View className='w-[90%] mx-auto mt-14'>
            <Text className='text-white text-3xl mb-6 font-bold text-center'>Secret Recovery Phrase</Text>
          </View>
        </View>
      </View>
      
    </View>
  )
}

export default ReEnter

const styles = StyleSheet.create({})