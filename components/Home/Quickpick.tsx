import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { quickpick } from '@/constants/data'
import { Link } from 'expo-router'

const Quickpick = () => {
  return (
    <View className='px-3 py-5' style={{ borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
     <ScrollView
       horizontal={true}
       showsHorizontalScrollIndicator={false}
    >
       {quickpick.map((sport, index) => (
        <Link
          href={sport.link} key={index}
          className='bg-[#011F39] w-[111px] relative h-[57px] mr-4'
        >
          <View className='bg-[#E59A0B] absolute p-0 m-0s -top-0 w-full h-[7px] left-0' />
          <View className="p-1 px-2">
            <Text className='text-base uppercase font-semibold text-white'>
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

