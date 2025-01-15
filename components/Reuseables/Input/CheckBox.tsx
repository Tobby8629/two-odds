import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Children, ReactNode } from 'react'

interface checkbox {
 children: ReactNode,
 value: boolean,
 onPress: ((id: keyof register | undefined) => void) | null
 id?: keyof register| undefined
}

const CheckBox = ({children, value, onPress, id}: checkbox) => {
  
  return (
    <View className=' flex-row items-start my-[3px]'>
      <Pressable onPress={ onPress ? (() => onPress(id)) : null}  className='w-[15px] mt-[2px] h-[15px] border-[0.8px] border-white rounded-full'>
        <View className={`w-full h-full rounded-full ${value ? "bg-sec" : "bg-transparent"}`} />
      </Pressable>
      <View className='ml-2 mb-3'>
        {children}
      </View>
    </View>
  )
}

export default CheckBox

const styles = StyleSheet.create({})