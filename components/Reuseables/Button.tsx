import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface welcome {
  className?: string,
  text: string
  onPress: () => void
}

const Button = ({text, className, onPress}: welcome) => {
  return (
    <Pressable onPress={onPress} className={`bg-sec w-[161px] h-[35px] rounded-lg  items-center justify-center text-white my-1 ${className}`}>
      <Text className='text-center capitalize text-white text-lg'>{text}</Text>
    </Pressable>
  )
}

export default Button