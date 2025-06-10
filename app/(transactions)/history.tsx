import { Pressable, StyleSheet, Text, View } from 'react-native'
import Layout from './Layout'
import Button from '@/components/Reuseables/Button'
import { goBack } from 'expo-router/build/global-state/routing'
import { FontAwesome6 } from '@expo/vector-icons'

const History = () => {
  return (
    <Layout title='Transaction History'>
      <View 
        className=' flex bg-[#1F5079] mt-[1px] p-3 px-6 flex-row justify-between items-center'  
      >
        <Text className=' text-white w-[72%]'>
          Need to speed up your payment? Click to update your transaction status!
        </Text>
        <Button
          className='w-[25%] !h-[30px] p-1 rounded-none ' 
          textStyle='text-lg font-light'
          text='Fix status' onPress={()=>goBack()}
        />
      </View>
      <View
       className=' flex mt-[1px] justify-between items-center flex-row'
      >
       <View className='flex-row bg-[#1F5079] p-3 px-6 w-[49.8%] items-center justify-between'> 
        <Text className='text-white'>All Categotries</Text>
        <FontAwesome6 name="angle-down" size={24} color="white" />
       </View>
       <View className='flex-row bg-[#1F5079] p-3 px-6 w-[49.8%] items-center justify-between'> 
        <Text className='text-white'>Date</Text>
        <FontAwesome6 name="angle-down" size={24} color="white" />
       </View>
      </View>
       <View className=' mt-[1px] bg-[#1F5079] p-4 px-6'> 
        <Text className='text-white'>Month, Year</Text>
      </View>
      <HistoryCard />
      <HistoryCard />
    </Layout>
  )
}

export default History

const styles = StyleSheet.create({})

export const HistoryCard = () => {
  return (
    <View className='p-6 pt-2 border-b-[0.2px] border-white flex-row justify-between items-start '>
      <View className=''>
        <Text className='text-white mb-2 font-semibold text-lg'>
         Transaction Type
        </Text>
        <Text className='text-white text-sm font-light'>
          Date and time
        </Text>
      </View>
      <Text className='text-white font-semibold text-lg'>Amount</Text>
    </View>
  )
}