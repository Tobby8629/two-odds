import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoalsMarket, MatchTotalGoalsSection } from '@/constants/options'
import { FontAwesome6 } from '@expo/vector-icons'
import { SubKeyName } from '@/constants/functions'
import { ThemedText } from '@/components/ThemedText'

const Goal = ({option}: {option: GoalsMarket}) => {
   return (
      <View>
        {Object.entries(option).map(([key, value], index) => {
          console.log("Goal Option Value:", value);
          return(
          <View key={key} className='my-2 p-3 bg-light-blue rounded-lg  mx-6'>
            <Card title={key} value={value} openTrayE={index === 0 ? true : false} /> 
          </View>
        )})} 
      </View>
    )
}

export default Goal

const styles = StyleSheet.create({})

const Card = ({title, value, openTrayE}: {title: string, value: any, openTrayE?: boolean}) => {
  const [openTray, setOPenTray] = React.useState(openTrayE); 
  return (
    <View>
      <Pressable onPress={()=>setOPenTray(!openTray)} className='flex-row justify-between items-center mb-4'>
        <Text className='text-black font-bold text-lg capitalize'>{title.replace(/([A-Z])/g, ' $1').trim()}</Text>
        <FontAwesome6 name={openTray ? "angle-up" : "angle-down"} size={16} color="black" />
      </Pressable>

      {openTray && (
        TraySwitch(title, value)      
      )}
    </View>
  )
}

const MatchTotalGoalsTray = (value: any) => { 
  return (
    <View>
        {value.value?.lines?.map((item: any, idx: number) => (
          <View key={idx} className='flex-row items-center justify-between my-1'>
            <Text className='!rtext-black'>{item.line}</Text> 
            <View className='flex-row gap-3 items-center  w-[100px] justify-startr'>
              <ThemedText className='!text-black text-left'>Over</ThemedText>
              <Text className='bg-purple-200 w-1/2 rounded-md  text-center p-3 !text-black'>{item.over}</Text>
            </View>
            <View className='flex-row gap-3 items-center w-[100px] justify-startr'>
              <ThemedText className='!text-black text-left'>Under</ThemedText>
              <Text className='bg-purple-200 w-1/2 rounded-md  text-center p-3 !text-black'>{item.under}</Text>
            </View>
          </View>
        ))}
    </View>
  )
}

const BothTeamsToScoreTray = (value: any) => { 
  return (
    <View className='flex-row justify-between items-center'>
        {value.value?.options?.map((item: any, idx: number) => (
          <View key={idx} className='flex-row items-center gap-4 my-1'>
            <Text className='!text-black'>{item.label}</Text> 
            <Text className='bg-purple-200 w-[75px] rounded-md text-center p-3 !text-black'>{item.value}</Text>
          </View>
        ))}   
    </View>
  )
} 


const TraySwitch = (key: string, value: any) => {
  switch (key) {
    case 'bothTeamsToScore':
      return <BothTeamsToScoreTray value={value} />;
    case 'matchTotalGoals':
      return (<MatchTotalGoalsTray value={value} />);
    default:
      return <Text>No Tray Available</Text>;
  }
}

