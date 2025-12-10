import { Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children } from 'react'
import { StyleProps } from 'react-native-reanimated'

interface welcome {
  className?: string,
  textStyle?: string,
  text: string
  onPress: (() => void) | null
  disable?: boolean,
  children?: React.ReactNode
  style?: StyleProps
}

const Button = ({text, children, style, className, onPress, textStyle, disable}: welcome) => {
  return (
    <Pressable disabled={disable} onPress={onPress} style={style} className={` ${className} ${disable ? "bg-gray-400":"bg-sec"} w-[161px] h-[45px] rounded-lg  items-center justify-center text-white my-1`}>
      <Text className={`text-center capitalize text-white text-xl font-semibold ${textStyle}`}>{text}</Text>
      {children}
    </Pressable>
  )
}

export default Button