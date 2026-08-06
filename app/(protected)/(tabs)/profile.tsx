import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {flexCenter } from '@/constants/style'
import React, { use, useEffect } from 'react'
import Button from '@/components/Reuseables/Button'
import Header from '@/components/profile_Widgets/Header'
import SubHeader from '@/components/profile_Widgets/SubHeader'
import OtherLinks from '@/components/profile_Widgets/OtherLinks'
import useMutate from '@/hooks/useMutate'
import { RelativePathString } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { postQuery } from '@/components/api/QueryFn'
import { useAuthStore } from '@/store/useAuthStore'
import { tokenStorage } from '@/services/tokenStorage'

const profile = () => {
const { user, logout, isLoading} = useAuthStore();

// useEffect(() => {
//   const loadToken = async () => {
//     const token = await tokenStorage.getAccessToken();
//     setToken(token);
//   };

//   loadToken();
// }, [user]);

 
  return (
    <ScrollView className='min-h-screen bg-[#1F5079]'>
      <View className='bg-pry pb-20 h-full'>
        <Header />
        <SubHeader />
        <OtherLinks />
        <Text className='bg-[#1F5079] text-white text-right py-4 px-7 mt-4'>
          ©
          2025 2odds. All rights reserved
        </Text>
        <View>
          <View className={`${flexCenter} py-4`}>
            <Text className='text-white'>Terms of service</Text>
            <View className='bg-[#1F5079] w-[2px] h-full mx-2'></View>
            <Text className='text-white'>About Us</Text>
          </View>

          <Button
            text={isLoading ? "Logging out..." : "Logout"}
            onPress={logout}
            className='!bg-purple-300 w-[50%] h-[40px] mx-auto rounded-lg mt-4'
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default profile

const styles = StyleSheet.create({})