import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Swiper from 'react-native-swiper'
import { createWallet } from '@/constants/data'
import Logo from '@/assets/SVGs/Logo'

const Create = () => {
//   const currentIndexRef = useRef(0); 
  const indicatorRef = useRef<(View | null)[]>([]);
  const handleIndexChanged = (index: number) => {
    // currentIndexRef.current = index;
    indicatorRef.current.forEach((indicator, i) => {
      if (indicator) {
        indicator.setNativeProps({
          style: { backgroundColor: i === index ? 'white' : 'gray' },
        });
      }
    });
  };

  const indicator = Array.from({ length: createWallet.length });
  return (
    <View className='min-h-screen bg-pry pt-24 px-5 pb-10 items-center justify-center'>
      <View>
        <Logo />
      </View>
      
      <Swiper autoplay={true} showsPagination={false} onIndexChanged={handleIndexChanged}>
        {createWallet.map((e)=>(
          <View key={e.name} className='items-center my-20 '>
            <Image source={e.image} className='mb-14' resizeMode="contain" />
            <View className='w-full'>
              <Text className=' text-white text-5xl text-center font-light my-2 capitalize w-full'>{e.name == "phrase" ? "controlled by you" : "Manage your"}</Text>
              <Text className=' text-white text-5xl text-center font-bold w-full'>{e.text}</Text>
            </View>
          </View>
        ))}
      </Swiper>

      <View className=" w-full my-5">
        <View className="flex-row justify-center">
        {indicator.map((_, index) => (
            <View
            className="h-3 w-3 rounded-full mr-2"
            style={{ backgroundColor: index === 0 ? 'white' : 'gray' }}
            ref={(el) => (indicatorRef.current[index] = el)}
            key={(index + 1).toString()}
            />
        ))}
        </View>
      </View>

      <View className='w-full mt-10 mb-5'>
        <Pressable className='p-2 mb-5 bg-sec rounded-3xl'>
            <Text className=' text-xl text-center'>Create a new Wallet</Text>
        </Pressable>
        <Pressable className='my-1'>
            <Text className='text-white text-xl text-center'>Import an existing Wallet</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Create

const styles = StyleSheet.create({})