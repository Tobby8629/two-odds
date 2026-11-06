import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { goBack } from 'expo-router/build/global-state/routing';

interface TransacLayoutProps {
  children: React.ReactNode;
  handleClick?: () => void;
  title: string
  otherLinks?: React.ReactNode; 
}

const Layout = ({children, title, otherLinks, handleClick= () => {goBack()} }: TransacLayoutProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View className='bg-pry flex-1'>
      <View className={`flex-row ${otherLinks && "justify-between items-center"} pb-5 bg-[#1F5079] px-6`} style={{ paddingTop: insets.top + 12 }}>
        <Pressable onPress={handleClick}>
          <FontAwesome6 name="angle-left" size={24} color="white" />
        </Pressable>
        <Text className={`text-white ${otherLinks ? "w-fit" : "w-[90%]"} text-2xl text-center`}>{title}</Text>
        {otherLinks}
      </View>
      {children}
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({})