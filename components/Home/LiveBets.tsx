import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const LiveBets = () => {
  return (
    <View className='pl-3 py-5 pt-10 border-b-2 border-white'>
      <Text className='text-3xl text-white mb-5' >Live Match</Text>
      <FlatList 
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item }) => <LiveCard />}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />   
    </View>
  )
}

export default LiveBets

export const LiveCard = () => {
    return (
      <View className='bg-[#E3F2FD] justify-between p-3 mr-5 rounded-lg w-[201px] h-[107px]'>
        <View className='gap-[10px] pt-3'>
          <View className='flex-row justify-between items-center mb-2'>
            <View className='flex-row gap-2 items-center'>
              <Text>Logo</Text>
              <Text>name</Text>
            </View>
            <Text>Score</Text>
          </View>
          <View className='flex-row justify-between items-center mb-2'>
            <View className='flex-row gap-2 items-center'>
              <Text>Logo</Text>
              <Text>name</Text>
            </View>
            <Text>Score</Text>
          </View>
        </View>
        <View className='flex-row justify-between items-center'>
          <View>
            <Text>league</Text>
          </View>
          <Text>Time</Text>
        </View>
      </View>
    )
  }