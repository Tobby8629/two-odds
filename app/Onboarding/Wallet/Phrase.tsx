import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Cancel from '@/assets/SVGs/Cancel'

const Phrase = () => {
  const length = Array.from({length: 12})
  return (
    <View className='bg-pry h-screen py-16 px-7 justify-between'>

      <View>
        <View className='flex-row justify-between items-center mb-20'>
          <Cancel />
          <Link href={"/Onboarding/Welcome"} className='text-white text-2xl'>Next</Link>
        </View>
       
        <Text className='text-white text-center'>This is the only way you will be able to recover your 
        account. <Text className='font-bold'>Please keep it safe</Text>
        </Text>
       
        <View className='my-16 flex-row flex-wrap justify-between'>
          {length.map((e, index)=>(
            <View key={index.toString()} className='w-[31%] mb-[22px]'>
              <View className='border-[1px] rounded-3xl border-white px-[5px] flex-row items-center'>
                <Text className='border-r-[1px] h-[20px] border-white w-[17px] text-white font-medium leading-[26px]'>{index + 1}</Text>
                <Text className='text-white ml-2 text-lg capitalize w-full'>lorem</Text>
              </View>
            </View>
          ))}
        </View>

        
        <Pressable className='bg-sec w-[100px] mx-auto p-2 rounded-3xl'>
            <Text className='text-center text-lg font-semibold'>Copy</Text>
        </Pressable>

      </View>

      <Pressable className='bg-sec py-3 rounded-3xl' onPress={()=> router.replace("/Onboarding/Welcome")}>
        <Text className='text-center text-xl font-semibold'>I have it saved somewhere</Text>
      </Pressable>

    </View>
  )
}

export default Phrase

const styles = StyleSheet.create({})