import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import useBetslip from '@/store/useStore'

interface detailProps {
  onClose: () => void
  func: () => void
  text?: string
  headerText?: string
}

const PopupD = ({onClose, func, text, headerText}: detailProps) => {
  
  return (
    <>
      <View className='px-5'>
        <ThemedText className='!text-black text-center mb-3 capitalize font-semibold text-2xl'>{headerText}</ThemedText>
        <ThemedText className='!text-black text-center mb-3 text-lg'>{text}</ThemedText>
      </View>
      <View className=' w-[70%] mx-auto flex-row items-center gap-10'>
        <Pressable onPress={onClose}>
          <ThemedText className='!text-sec !text-xl !font-medium'> Keep </ThemedText> 
        </Pressable>
        <View className='bg-sec w-[2px] h-full py-2'/>
        <Pressable onPress={func}>
          <ThemedText className='!text-sec !text-xl !font-medium'> No </ThemedText>
        </Pressable>
      </View>
    </>
  )
}

export default PopupD

const styles = StyleSheet.create({})