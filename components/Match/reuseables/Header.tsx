import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import React from 'react'

interface headerProps {
  headerArr: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({headerArr, selected, setSelected}: headerProps) => {
  
  return (
    <View className='py-3 my-3 px-6 flex flex-row justify-between border-y border-light-blue'>
      {headerArr.map((item: string) => (
        <Pressable key={item} 
        onPress={() => setSelected(item)} 
        >
          <ThemedText className='!capitalize'>{item}</ThemedText>
           <View
          className={`${
            selected === item ? "bg-sec" : "bg-transparent"
          } h-2 w-2 mx-auto mt-1 rounded-lg`}
        />
        </Pressable>
      ))}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})