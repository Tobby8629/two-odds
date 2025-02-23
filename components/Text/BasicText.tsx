import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface TextProps {
   className?: string
   children?: React.ReactNode
}
const TextB= ({className, children}:TextProps) => {
  return (
    <Text className={`text-white ${className}`} >{children}</Text>
  )
}

export default TextB

const styles = StyleSheet.create({})