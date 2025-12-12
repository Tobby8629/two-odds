import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoalsMarket, MatchTotalGoalsSection } from '@/constants/options'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import OptionInfo from '@/assets/SVGs/match/OptionInfo'
import { Portal } from 'react-native-portalize';

const Goal = ({option}: {option: GoalsMarket}) => {
   return (
      <View className='flex-1'>
        {Object.entries(option).map(([key, value], index) => {
          return(
          <View key={key} className='my-2 p-3 bg-light-blue rounded-lg mx-6'>
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
  const [more, setMore ] = React.useState(false)

  return (
    <View>
       <View className='flex-row justify-between'>
        <View className='flex-row items-center gap-2'>
          <ThemedText className='!text-black font-bold text-lg capitalize'>{title.replace(/([A-Z])/g, ' $1').trim()}</ThemedText>
          <Pressable onPress={()=> setMore(!more)}>
            <OptionInfo/>
          </Pressable>
        </View>
        <Pressable onPress={()=> setOPenTray(!openTray)} className='p-2'>
          {openTray ? 
          <FontAwesome6 name="angle-up" size={16} color="black" />
          :<FontAwesome6 name="angle-down" size={16} color="black" />
          }
        </Pressable>
       </View>
      {openTray && (
        TraySwitch(title, value)      
      )}
      {more && (
      <Portal>
        <Pressable 
          onPress={() => setMore(false)} 
          className="absolute items-center inset-0 bg-black/30 z-50"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="absolute top-[40%] w-[85%] bg-light-blue p-4 h-44 justify-center rounded-lg shadow-lg"
          >
            <ThemedText className="!text-black font-sansitaBoldItalic font-bold text-center text-lg capitalize">
              {title.replace(/([A-Z])/g, " $1").trim()}
            </ThemedText>

            <ThemedText className="!text-black text-center my-3">
              Lorem ipsum dolor sit amet consectetur. Nunc.
            </ThemedText>

            <Pressable onPress={() => setMore(false)}>
              <ThemedText className="!text-sec text-center">Ok</ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Portal>
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

