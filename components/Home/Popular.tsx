import { MatchProps } from '@/interface'
import { Text, View } from 'react-native'

interface PopularProps {
  data: MatchProps
}


export const PopularHeader = () => {
  return (
    <View className='px-5 pt-5'>
      <View className='flex-row items-center justify-between mb-4 pr-5'>
        <Text className='text-3xl text-white'>Popular</Text>
        <View className='flex-row items-center justify-between w-5/12'>
          <Text className='text-2xl text-white text-center'>1</Text>
          <Text className='text-2xl text-white text-center'>x</Text>
          <Text className='text-2xl text-white text-center'>2</Text>
        </View>
      </View>
    </View>
  )
}

export const Footer = () => {
  return (
    <View className='h-20' />
  )
} 

export const MatchCard = ({data}:PopularProps) => {
    return (
      <View className='px-5 pt-2'>
        <View className='bg-[#E3F2FD] flex-row justify-between items-center p-3 mb-5 rounded-lg h-[95px]'>
          <View className=' gap-5 w-6/12'>
            <View className='flex-row items-center gap-3'>
              <View className='w-3 h-3 rounded-full bg-slate-500' />
              <Text className='text-lg capitalize 2xl'>{data.home}</Text>
            </View>
            <View className='flex-row items-center gap-3'>
              <View className='w-3 h-3 rounded-full bg-slate-500' />
              <Text className='text-lg capitalize 2xl'>{data.away}</Text>
            </View>
          </View>
          <View className='flex-row items-center justify-between gap-2 w-6/12'>
            <Text className='text-lg text-black bg-[#ABB2FA] p-2 text-center rounded-[5px] w-[31%]'>{data?.homeOdds}</Text>
            <Text className='text-lg text-black bg-[#ABB2FA] p-2 text-center rounded-[5px] w-[31%]'>{data?.drawOdds}</Text>
            <Text className='text-lg text-black bg-[#ABB2FA] p-2 text-center rounded-[5px] w-[31%]'>{data?.awayOdds}</Text>
          </View> 
        </View>
      </View>
    )
}