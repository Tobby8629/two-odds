import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const LiveBets = () => {
  return (
    <View className='pl-3 py-5 pt-10 border-b-2 border-white'>
      <Text className='text-3xl text-white mb-5' >Live Match</Text>
      <FlatList 
        data={[1, 2, 3, 4, 5]}
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
      <View className='bg-[#E3F2FD] p-2 mr-5 rounded-lg w-[201px] h-[107px]'>
        <Text>Live Match</Text>
      </View>
    )
  }