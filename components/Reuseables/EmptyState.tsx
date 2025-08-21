import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EmptyImage from '@/assets/SVGs/EmptyState'
import { ThemedText } from '../ThemedText'

interface emptyProps {
  text?: string
  className?: string
}

const EmptyState = ({text, className}: emptyProps) => {
  return (
    <View className={`justify-center items-center ${className}`}>
      <EmptyImage />
      <ThemedText className='my-5 text-lg font-medium'>{text}</ThemedText>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({})