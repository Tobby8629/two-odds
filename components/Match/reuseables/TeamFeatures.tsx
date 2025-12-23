import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Portal } from 'react-native-portalize'
import { ThemedText } from '@/components/ThemedText'
import ManUtd from '@/assets/SVGs/match/Manutd'
import Button from '@/components/Reuseables/Button'
import Statistics from '@/assets/SVGs/match/Statistics'

interface teamFeatures {
  setStatistics: React.Dispatch<React.SetStateAction<boolean>>
}


const TeamFeatures = ({setStatistics}: teamFeatures) => {
  const [team, setTeam] = React.useState({teamOne: false, teamTwo: false}); 
  const hasAnyTrue = Object.values(team).some(value => value === true); 
  
  const teamMap = {
  teamOne: "manutd",
  teamTwo: "chelsea",
} as const;

const selectedTeam =
  (Object.entries(teamMap).find(([key]) => team[key as keyof typeof team])?.[1]) || "";

  const ctrlTeam = (team: "teamOne" | "teamTwo") => {
    
      setTeam((prev)=>({
        ...prev,
        [team]: true 
      }))
    
  }

  const closeTeam = () => {
    setTeam({
      teamOne: false,
      teamTwo: false,
    });
  };

  console.log(team)
  return (
    <View className='flex-row items-baseline px-3 justify-between'>
      <Pressable onPress={()=> ctrlTeam("teamOne")} className='w-[25%] items-center gap-3'>
        <ManUtd />
        <ThemedText className='text-center'>manchester united</ThemedText>
      </Pressable>

      <View className='w-[35%] my-2 items-center gap-1'>
        <ThemedText className='text-center my-0 text-xs'>VS</ThemedText>
        <ThemedText className='text-center my-0 text-xs'>Time</ThemedText>
        <Button 
        className='!w-[85px] !h-[22px] !px-0 !py-0 gap-2 flex-row'
        text='statistics'
        textStyle=' !text-sm' 
        onPress={()=>  setStatistics(true)}
        >
        <Statistics />
        </Button>
      </View>

      <Pressable onPress={()=> ctrlTeam("teamTwo")} className='w-[25%] items-center gap-3'>
        <ManUtd /> 
        <ThemedText className='!text-center'>Chelsea</ThemedText>
      </Pressable>


      <Portal>
        {hasAnyTrue && 
          <Upcoming closeTab={closeTeam} team={selectedTeam} />
        }
      </Portal>
    </View>
  )
}

export default TeamFeatures

const styles = StyleSheet.create({})

const Upcoming = ({closeTab, team}: {closeTab: () =>void, team: string}) => {
  return (
    <Pressable 
      onPress={closeTab} 
      className="absolute items-center inset-0 bg-black/30 z-50"
    >
      <Pressable
        onPress={(e) => e.stopPropagation()}
        className="absolute top-[17%] w-[85%] bg-light-blue p-2 py-7 h-fit justify-center rounded-lg shadow-lg"
      >
        <ThemedText className="!text-black font-bold text-center text-lg capitalize">
          sunday, 09 Nov
        </ThemedText>
        {Array.from({length: 5},(_,i) => (
          <View key={i} className='flex-row  w-[80%] mx-auto mt-5 items-center justify-between'>
            <View className='flex-row gap-1 items-center'>
              <ManUtd />
              <ThemedText className='!text-black '>{team}</ThemedText>
            </View>
            <ThemedText className='!text-black'>VS</ThemedText>
            <View className='flex-row gap-1 items-center'>
              <ManUtd />
              <ThemedText className='!text-black'>Lile</ThemedText>
            </View>
          </View>
        ))}
      </Pressable>
    </Pressable>
  )
} 