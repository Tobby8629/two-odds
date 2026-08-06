import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router';

interface layoutInterface {
  header: string;
  children: React.ReactNode;
  navigator?: string;
}

const Layout = ({header, children, navigator}: layoutInterface) => {
  return (
      <View className='bg-pry flex-1'>
      <View className={`flex-row items-center pb-5 pt-20 bg-[#1F5079] px-6`}>
        <Pressable onPress={()=> router.back()}>
          <FontAwesome6 name={navigator || "angle-left"} size={24} color="white" />
        </Pressable>
        <Text className={`text-white w-[90%] text-2xl text-center`}>{header}</Text>
        
      </View>
      {children}
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({})