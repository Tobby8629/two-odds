import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BigLogo from '@/assets/SVGs/BigLogo'
import Button from '@/components/Reuseables/Button'

interface layout {
  children: React.ReactNode
  text: string,
  onPress: () => void
  shift?: string
}

const Layout = ({children, text, onPress, shift}: layout) => {
  
  return (
    <View className={`bg-pry h-screen justify-center`}>
      <View className={` items-center ${shift}`}>
        <BigLogo />
        {children}
        <Button text={text} onPress={onPress}/>
      </View>
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({})