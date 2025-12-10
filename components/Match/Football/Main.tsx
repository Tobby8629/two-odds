import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoalsMarket, MainMarkets, Odd } from '@/constants/options' 
import OptionInfo from '@/assets/SVGs/match/OptionInfo';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { SubKeyName } from '@/constants/functions';

interface MainProps {
  option: MainMarkets | GoalsMarket
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
        case 'teamTotalGoals':
        return 'Team Total Goals';
      case 'firstTeamToScore':
        return 'First Team To Score';
      case 'exactGoals':
        return 'Exact Goals';
      case 'asianHandicapFullTime':
        return 'Asian Handicap Full Time';
      case 'asianHandicap1stHalf':
        return 'Asian Handicap 1st Half';
      case 'firstHalf1X2':
        return 'First Half 1X2';
      case 'secondHalf1X2':
        return 'Second Half 1X2';
      case 'firstHalfOverUnder':
        return 'First Half Over/Under';
      case 'secondHalfOverUnder':
        return 'Second Half Over/Under';
      case 'bttsAndOverUnder':
        return 'BTTS and Over/Under';
      case 'doubleChanceAndBTTS':
        return 'Double Chance and BTTS';
      case 'cleanSheet':
        return 'Clean Sheet';
      case 'scoreInBothHalves':
        return 'Score In Both Halves';
      case 'toWinEitherHalf':
        return 'To Win Either Half';
      case 'anytimeGoalscorer':
        return 'Anytime Goalscorer';
      case 'firstGoalscorer':
        return 'First Goalscorer';
      case 'lastGoalscorer':
        return 'Last Goalscorer'; 
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
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
            {Object.entries(value).map(([subKey, subValue], index) => { 
              return (
              Object.keys(value).length < 3 ?
               <View
                  key={subKey}
                  className={`flex items-center w-[45%] flex-row gap-3 my-2 
                    ${Object.keys(value).length < 3 && index === Object.keys(value).length - 1 ? "ml-auto" : ""}`}
                >
                  <ThemedText className='!text-black font-bold text-center capitalize'>
                    {SubKeyName(subKey)}
                  </ThemedText>
                  <ThemedText className='!text-black bg-purple-200 rounded-lg w-[65%] text-center py-2 px-4'>{subValue.value} {subValue.suspended ? '(Suspended)' : ''}</ThemedText>
                </View>
              :
              <View key={subKey} className='flex items-center flex-row w-1/3 gap-3 my-1'>
                <ThemedText className='!text-black font-bold text-center capitalize'>{SubKeyName(subKey)}</ThemedText>
                <ThemedText className='!text-black bg-purple-200 rounded-lg w-[62px] text-center py-2 px-4'>{subValue.value} {subValue.suspended ? '(Suspended)' : ''}</ThemedText>
              </View>
            )})}
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
