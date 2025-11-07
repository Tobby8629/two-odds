import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from './Layout'
import { ThemedText } from '@/components/ThemedText'
import Info from '@/assets/SVGs/icons/info'

const accountLimit = () => {
  return (
   <Layout header='Account Limits'>
    <View className='py-16 px-5'>
     <View className='flex-row gap-1 items-center border-b border-gray-400'>
        <ThemedText className='pb-4 text-lg'>Deposit Limit</ThemedText>
        <Info />
     </View>
     <View className='bg-light-blue p-4 rounded-md'>
        <ThemedText className='pt-4 text-lg !text-gray-800'>Withdrawal Limit</ThemedText>
        <View className='flex-row justify-between items-center'>
          <ThemedText className='!text-gray-800'>Daily Limit: </ThemedText>
          <ThemedText className="text-sec">£1,000</ThemedText>
        </View>
     </View>
     </View>
   </Layout>
    
  )
}

export default accountLimit

const styles = StyleSheet.create({})