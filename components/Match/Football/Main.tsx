import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainMarkets } from '@/constants/options' 
import OptionInfo from '@/assets/SVGs/match/OptionInfo';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

interface MainProps {
  option: MainMarkets;
}

const Main = ({option}: MainProps) => {
 

  return (
    <View>
      {Object.entries(option).map(([key, value], index) => (
        <View key={key} className='my-2 p-3 bg-light-blue rounded-lg  mx-6'>
          <Card title={key} value={value} openTrayE={index === 0 ? true : false} /> 
        </View>
      ))} 
    </View>
  )
}

export default Main

const styles = StyleSheet.create({})


export const Card = ({title, value, openTrayE}: {title: string, value: any, openTrayE?: boolean}) => {
  const [openTray, setOPenTray] = React.useState(openTrayE);  
  const headerText = (key: string) => {
    switch (key) {
      case 'oneXtwo':
        return '1X2';
      case 'doubleChance':
        return 'Double Chance';
      case 'drawNoBet':
        return 'Draw No Bet';
      case 'totalGoals':
        return 'Total Goals';
      case 'btts':
        return 'Both Teams To Score';
      case 'halftimeFulltime':
        return 'Halftime/Fulltime';
      case 'winningMargin':
        return 'Winning Margin';
      case 'totalGoalsBands':
        return 'Total Goals Bands';
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  const SubKeyName = (subKey: string) => {
    switch (subKey) {
      case 'home':
        return '1';
      case 'away':
        return '2';
      case 'draw':
        return 'X'; 
      case 'home_home':
        return 'Home/Home';
      case 'home_away':
        return 'Home/Away';
      case 'draw_home':
        return 'Draw/Home';
      case 'draw_away':
        return 'Draw/Away';
      case 'away_home':
        return 'Away/Home';
      case 'away_away':
        return 'Away/Away';
        case 'HomeorDraw':
        return '1X';
      case 'HomeorAway':
        return '12';
      case 'DraworAway':
        return 'X2';  
      default:
        return subKey.charAt(0).toUpperCase() + subKey.slice(1);
    }
  };     
  return (
    <>
      <View className='flex-row justify-between'>
        <View className='flex-row items-center gap-2'>
          <ThemedText className='!text-black font-bold text-lg'>{headerText(title)}</ThemedText>
          <OptionInfo />
      </View>
      <Pressable onPress={()=> setOPenTray(!openTray)} className='p-2'>
        {openTray ? 
        <FontAwesome6 name="angle-up" size={16} color="black" />
        :<FontAwesome6 name="angle-down" size={16} color="black" />
        }
      </Pressable>
      </View>
      <>
      {openTray ? 
        typeof value === 'object' && !Array.isArray(value) ? (
          <View className='flex-row flex-wrap items-center justify-between'>
            {Object.entries(value).map(([subKey, subValue]) => (
              <View key={subKey} className='flex items-center flex-row gap-3 my-1'>
                <ThemedText className='!text-black font-bold capitalize'>{SubKeyName(subKey)}</ThemedText>
                <ThemedText className='!text-black bg-purple-200 rounded-lg text-center py-2 px-4'>{subValue.value} {subValue.suspended ? '(Suspended)' : ''}</ThemedText>
              </View>
            ))}
          </View>
        ) : Array.isArray(value) ? (
          value.map((item, index) => (
            <View key={index} className='flex flex-row justify-between my-1'>
              {'score' in item && <ThemedText className='!text-black'>{item.score}</ThemedText>}
              <ThemedText className='!text-black'>{'odd' in item ? item.odd.value : item.value} {'suspended' in item && item.suspended ? '(Suspended)' : ''}</ThemedText>
            </View>
          ))
        ) : null
      : null}
      </>
    </>
)}
