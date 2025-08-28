import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Children, ReactNode } from 'react'
import { register } from '@/interface'

interface checkbox {
 children: ReactNode,
 value: boolean,
 onPress: ((id: keyof register | undefined) => void) | null
 id?: keyof register| undefined
 boxStyle?: string 
 className?: string
 textStyle?: string
 icon?: ReactNode
}

const CheckBox = ({children, textStyle, value, onPress, id, className, icon, boxStyle}: checkbox) => {
  
  return (
    <View className={` flex-row items-start my-[3px] ${className}`}>
      <Pressable onPress={ onPress ? (() => onPress(id)) : null}  className={` ${boxStyle} w-[15px] mt-[2px] h-[15px] border-[0.8px] border-white rounded-full`}>
        {icon ? icon : <View className={`${boxStyle} w-full h-full rounded-full ${value ? "bg-sec" : "bg-transparent"}`} /> }
      </Pressable>
      <View className={`ml-2 mb-3 ${textStyle}`}>
        {children}
      </View>
    </View>
  )
}

export default CheckBox

const styles = StyleSheet.create({})