import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ThemedText } from '../ThemedText'
import { flexNoJustify } from '@/constants/style'
import Header from './Header'

interface betHeader {
  left?: ReactNode
  middle?: ReactNode
  Right?: ReactNode
}

const BetHeader = ({ left, middle, Right }: betHeader) => {
  return (
    <Header>
      {left}
      {middle}
      {Right}
    </Header>
  )
}

export default BetHeader

const styles = StyleSheet.create({})