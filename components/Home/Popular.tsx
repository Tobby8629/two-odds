import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Popular = () => {
  return (
    <View className='px-6 p-8'>
      <View className='flex-row items-center justify-between mb-4 pr-5'>
        <Text className='text-3xl text-white'>Popular</Text>
        <View className='flex-row items-center justify-between w-5/12'>
          <Text className='text-2xl text-white text-center'>1</Text>
          <Text className='text-2xl text-white text-center'>x</Text>
          <Text className='text-2xl text-white text-center'>2</Text>
        </View>
      </View>
      {/* <FlatList 
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <MatchCard />}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
      /> */}
      <MatchCard />
    </View>
  )
}

export default Popular

const styles = StyleSheet.create({})

export const MatchCard = () => {
    return (
        <View className='bg-[#E3F2FD] flex-row justify-between items-center p-3 mb-5 rounded-lg h-[95px]'>
          <View className=' gap-5'>
            <View className='flex-row items-center gap-3'>
              <View className='w-3 h-3 rounded-full bg-slate-500' />
              <Text>Club name</Text>
            </View>
            <View className='flex-row items-center gap-3'>
              <View className='w-3 h-3 rounded-full bg-slate-500' />
              <Text>Club name</Text>
            </View>
          </View>
          <View className='flex-row items-center justify-between gap-2 w-6/12'>
            <Text className='text-2xl text-black bg-purple-500 p-2 text-center rounded-[5px] w-[31%]'>1</Text>
            <Text className='text-2xl text-black bg-purple-500 p-2 text-center rounded-[5px] w-[31%]'>x</Text>
            <Text className='text-2xl text-black bg-purple-500 p-2 text-center rounded-[5px] w-[31%]'>2</Text>
          </View> 
        </View>
    )
}