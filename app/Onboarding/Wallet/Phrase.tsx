import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Cancel from '@/assets/SVGs/Cancel'

const Phrase = () => {
  const length = Array.from({length: 12})
  return (
    <View className='bg-pry h-screen py-16 px-7 justify-between'>

      <View>
       <View className='w-[90%] mx-auto mt-14'>
          <Text className='text-white text-3xl mb-6 font-bold text-center'>Secret Recovery Phrase</Text>
          <Text className='text-white text-xl text-center'>
            This is your Secret Recovery Phrase.
            Write it down on a paper and keep it in a safe place.
          </Text>
          <Text className='text-white text-xl text-center'>
            You will be asked to re-enter this phrase (in order) on the next step
          </Text>
        </View>
       
        <View className='my-16 p-10 w-[90%] mx-auto rounded-3xl flex-row border-[.5px] border-white flex-wrap justify-between'>
          {length.map((e, index)=>(
            <View key={index.toString()} className='w-[35%] mb-[22px]'>
              <View className='border-[1px] rounded-3xl border-white px-[5px] flex-row items-center'>
                {/* <Text className='border-r-[1px] h-[20px] border-white w-[17px] text-white font-medium leading-[26px]'>{index + 1}</Text> */}
                <Text className='text-white text-center text-lg capitalize w-full'>lorem</Text>
              </View>
            </View>
          ))}
        </View>

        
        {/* <Pressable className='bg-sec w-[100px] mx-auto p-2 rounded-3xl'>
            <Text className='text-center text-lg font-semibold'>Copy</Text>
        </Pressable> */}

      </View>

      <Pressable className='bg-sec py-3 rounded-3xl' onPress={()=> router.replace("/Onboarding/Wallet/ReEnter")}>
        <Text className='text-center text-xl font-semibold'>I have it saved somewhere</Text>
      </Pressable>

    </View>
  )
}

export default Phrase

const styles = StyleSheet.create({})