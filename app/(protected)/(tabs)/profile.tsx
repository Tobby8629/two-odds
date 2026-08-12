import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {flexCenter } from '@/constants/style'
import React from 'react'
import Button from '@/components/Reuseables/Button'
import Header from '@/components/profile_Widgets/Header'
import SubHeader from '@/components/profile_Widgets/SubHeader'
import OtherLinks from '@/components/profile_Widgets/OtherLinks'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useAuthStore } from '@/store/useAuthStore'

const profile = () => {
const { logout, isLoading} = useAuthStore();

/*
 * The tab bar is absolutely positioned on iOS, so the scroll view has to
 * reserve its height or the last control - the logout button - sits underneath.
 */
const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      className='min-h-screen bg-[#1F5079]'
      contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
    >
      <View className='bg-pry h-full'>
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