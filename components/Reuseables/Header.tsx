import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from 'react-native'
import React, { Children, ReactNode } from 'react'
import { flex } from '@/constants/style'

interface header {
  children: ReactNode
}

const Header = ({children}: header) => {
  const insets = useSafeAreaInsets();
  return (
    <View className={`${flex} fixed top-0 pb-7 px-6 left-0 right-0 z-10 bg-pry-light`} style={{ paddingTop: insets.top + 8 }}>
      {children}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})