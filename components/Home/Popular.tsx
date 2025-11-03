import { MatchProps } from '@/interface'
import useBetslip, { select } from '@/store/useStore'
import { Text, TouchableOpacity, View } from 'react-native'

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
  const {selectGame, match, selectedGames} = useBetslip()
  const game = match.find((game) => game.id == data.id)
    return (
      <View className='px-5 pt-2'>
        <View className='bg-[#E3F2FD] flex-row justify-between items-center p-3 mb-5 rounded-lg h-[95px]'>
          <View className=' gap-5 w-6/12'>
            <View className='flex-row items-center gap-3'>
              <View className='w-3 h-3 rounded-full bg-slate-500' />
              <Text className='text-lg capitalize 2xl'>{game?.home}</Text>
            </View>
            <View className='flex-row items-center gap-3'>
              <View className='w-3 h-3 rounded-full bg-slate-500' />
              <Text className='text-lg capitalize 2xl'>{game?.away}</Text>
            </View>
          </View>
          <View className='flex-row items-center justify-between gap-2 w-6/12'>
            
            <TouchableOpacity 
              onPress={()=>selectGame({id: game!.id, option: "Home"})}
              className={`${game?.selected.some((e)=>e.option.includes("Home")) ? "bg-sec" : "bg-[#ABB2FA]"}`}>
              <Text className='text-lg text-black p-2 text-center rounded-[5px] w-full'>{game?.homeOdds}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=>selectGame({id: game!.id, option: "Draw"})}
              className={`${game?.selected.some((e)=>e.option.includes("Draw")) ? "bg-sec" : "bg-[#ABB2FA]"}`}>
              <Text className='text-lg text-black  p-2 text-center rounded-[5px] w-full'>{game?.drawOdds}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=>selectGame({id: game!.id, option:"Away"})}
              className={`${game?.selected.some((e)=>e.option.includes("Away")) ? "bg-sec" : "bg-[#ABB2FA]"}`}>
              <Text className='text-lg text-black  p-2 text-center! rounded-[5px] w-full'>{game?.awayOdds}</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
    )
}