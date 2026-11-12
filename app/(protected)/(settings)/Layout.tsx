import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router';

interface layoutInterface {
  header: string;
  children: React.ReactNode;
  navigator?: string;
  /** False when a header above already provides the status-bar inset. */
  topInset?: boolean;
}

const Layout = ({header, children, navigator, topInset = true}: layoutInterface) => {
  const insets = useSafeAreaInsets();
  return (
      <View className='bg-pry flex-1'>
      <View className={`flex-row items-center pb-5 bg-[#1F5079] px-6`} style={{ paddingTop: topInset ? insets.top + 12 : 20 }}>
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