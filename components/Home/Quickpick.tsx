import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { quickpick } from '@/constants/data'
import { Link } from 'expo-router'

const Quickpick = () => {
  return (
    <View className='px-3 py-5 border-b-2 border-white'>
     <ScrollView 
       horizontal={true} 
       showsHorizontalScrollIndicator={false} 
    >
       {quickpick.map((sport, index) => (
        <Link 
          href={sport.link} key={index} 
          className='bg-white w-[110px] relative h-[60px] mr-6'
        >
          <View className='bg-yellow-300 absolute p-0 m-0s -top-0 w-full h-[7px] left-0' />
          <View className="p-1 px-2">
            <Text className='text-base uppercase font-semibold text-pry'>
            {sport.name}
            </Text>
          </View>
        </Link>
       ))}
     </ScrollView>
    </View>
  )
}

export default Quickpick

// const styles = StyleSheet.create({})

