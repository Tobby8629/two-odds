import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BigLogo from '@/assets/SVGs/BigLogo'

const Welcome = () => {
  
  return (
    <View className='h-screen bg-pry justify-center items-center'>
      <BigLogo />
      <Text style={{fontSize: 68, fontWeight: 800}} className='mt-10 text-sec'>Welcome</Text>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})