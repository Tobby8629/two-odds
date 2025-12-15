import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import MatchMore from '@/assets/SVGs/match/MatchMore'
import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/Reuseables/Button'
import { useSport } from '@/store/useSports'
import { sports } from '@/interface'
import Template from '@/components/Match/reuseables/Template'
import { router } from 'expo-router'
import ManUtd from '@/assets/SVGs/match/Manutd'
import Statistics from '@/assets/SVGs/match/Statistics'
import { Portal } from 'react-native-portalize'
import TeamFeatures from '@/components/Match/reuseables/TeamFeatures'

const marketSwitch = (selectedsport: sports) => { 
  // match={match} markets={markets} setMarkets={setMarkets}
  switch (selectedsport) {
    case  "basketball":
      const Barr = ["main", "quarters", "half", "player"];
      return <Template  
          arr={Barr}
      />;
    case "football":
      const Farr = ["main", "over/under", "asian-line", "half-time"];
      return <Template 
          arr={Farr}
      />
    default:
      return <Text>Market Component</Text>; 
  }
}

const EachMatch = () => {
  const isIos = Platform.OS === "ios";
  const { selectedsport } = useSport();

  return (
    <View className='bg-pry flex-1'>

      {/***********  Header  ***********/ }
      <View className={`flex-row justify-between px-6 items-center bg-pry-light ${isIos ? "h-[120px] pt-14" : "h-[80px]"} `}>
        <Pressable onPress={()=> router.back()}>
          <FontAwesome6 name="angle-left" size={25} color="white" />
        </Pressable>
        <ThemedText className="font-bold text-lg">Match Time</ThemedText>
        <Pressable>
          <MatchMore />
        </Pressable>
      </View>


      {/***********  Match INFO  ***********/ }
      <TeamFeatures />
      {/***********  Betting Markets  ***********/ }
      <View className='flex-1 mt-4 relative'>
        {marketSwitch(selectedsport as sports)}
      </View>
       
    </View>
  )
}

export default EachMatch

const styles = StyleSheet.create({})

