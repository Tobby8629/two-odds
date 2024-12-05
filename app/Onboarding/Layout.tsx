import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BigLogo from '@/assets/SVGs/BigLogo'
import Button from '@/components/Reuseables/Button'

interface layout {
  children: React.ReactNode
  text: string,
  onPress: () => void
  className?: string
}

const Layout = ({children, text, onPress, className}: layout) => {
  
  return (
    <View className={`bg-pry min-h-screen justify-center`}>
      <View className={`items-center ${className}`}>
        <BigLogo />
        {children}
        <Button text={text} onPress={onPress}/>
      </View>
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({})