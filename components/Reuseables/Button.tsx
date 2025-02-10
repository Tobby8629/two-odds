import { Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StyleProps } from 'react-native-reanimated'

interface welcome {
  className?: string,
  text: string
  onPress: (() => void) | null
  disable?: boolean,
  style?: StyleProps
}

const Button = ({text, style, className, onPress, disable}: welcome) => {
  return (
    <Pressable disabled={disable} onPress={onPress} style={style} className={`${disable ? "bg-gray-500":"bg-sec"} w-[161px] h-[45px] rounded-lg  items-center justify-center text-white my-1 ${className}`}>
      <Text className='text-center capitalize text-white text-xl font-semibold'>{text}</Text>
    </Pressable>
  )
}

export default Button