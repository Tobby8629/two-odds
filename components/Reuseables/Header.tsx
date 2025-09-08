import { StyleSheet, Text, View } from 'react-native'
import React, { Children, ReactNode } from 'react'
import { flex } from '@/constants/style'

interface header {
  children: ReactNode
}

const Header = ({children}: header) => {
  return (
    <View className={`${flex} fixed top-0 pt-14 pb-7 px-6 left-0 right-0 z-10 bg-pry-light`}>
      {children}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})