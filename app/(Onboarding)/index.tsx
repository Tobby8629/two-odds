import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashSvg from '@/assets/SVGs/Splash';
import Swiper from 'react-native-swiper';

const index = () => {
  return (
    // <View className=' min-h-screen '>
    //    <View className=' flex justify-center items-center'>
    //      <SplashSvg />
    //    </View>
    //    <View>
    //       <
    //    </View>
    // </View>
    <SafeAreaView className='h-screen bg-black'>
    {/* <Swiper autoplay={true}>
       <View>
        <Text>one</Text>
        </View> 
        <View>
        <Text>two</Text>
        </View>
        <View>
        <Text>three</Text>
        </View>
    </Swiper> */}

    <Text>WHATEVER</Text>
    </SafeAreaView>
    
  )
}

export default index

const styles = StyleSheet.create({})