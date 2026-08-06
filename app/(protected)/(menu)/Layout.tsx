import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { goBack } from 'expo-router/build/global-state/routing';

interface TransacLayoutProps {
  children: React.ReactNode;
  handleClick?: () => void;
  title: string
  className?: string
  otherLinks?: React.ReactNode; 
}

const Layout = ({children, className, title, otherLinks, handleClick= () => {goBack()} }: TransacLayoutProps) => {
  return (
    <View className='bg-pry flex-1'>
      <View className={`flex-row ${otherLinks && "justify-between items-center"} pb-5 pt-20 bg-[#1F5079] px-6 ${className}`}>
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