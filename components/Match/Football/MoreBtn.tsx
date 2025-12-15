import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Portal } from 'react-native-portalize'
import { ThemedText } from '@/components/ThemedText'
interface MoreBtnProps {
  title: string;
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreBtn = ({ title, setMore }: MoreBtnProps) => {
  return (
    <Portal>
      <Pressable 
        onPress={() => setMore(false)} 
        className="absolute items-center inset-0 bg-black/30 z-50"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="absolute top-[40%] w-[85%] bg-light-blue p-4 h-44 justify-center rounded-lg shadow-lg"
        >
          <ThemedText className="!text-black font-sansitaBoldItalic font-bold text-center text-lg capitalize">
            {title.replace(/([A-Z])/g, " $1").trim()}
          </ThemedText>

          <ThemedText className="!text-black text-center my-3">
            Lorem ipsum dolor sit amet consectetur. Nunc.
          </ThemedText>

          <Pressable onPress={() => setMore(false)}>
            <ThemedText className="!text-sec text-center">Ok</ThemedText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Portal>
  )
}

export default MoreBtn

const styles = StyleSheet.create({})