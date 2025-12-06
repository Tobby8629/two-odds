import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import MatchMore from '@/assets/SVGs/match/MatchMore'
import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/Reuseables/Button'
import { useSport } from '@/store/useSports'
import { sports } from '@/interface'
import BasketBall from '@/components/Match/BasketBall'
import Football from '@/components/Match/Football'
import Template from '@/components/Match/reuseables/Template'
import { router } from 'expo-router'

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
          <FontAwesome6 name="angle-left" size={12} color="black" />
        </Pressable>
        <Text>Match Time</Text>
        <Pressable>
          <MatchMore />
        </Pressable>
      </View>


      {/***********  Match INFO  ***********/ }
      <View className='flex-row items-center px-6 justify-between'>
        <View>
          <ThemedText>logo</ThemedText>
          <ThemedText>Club</ThemedText>
        </View>
        <View>
          <ThemedText className='text-center'>VS</ThemedText>
          <ThemedText className='text-center'>Time</ThemedText>
          <Button text='statistics' onPress={()=>console.log("show statistic in match card")}>
            <ThemedText>stat logo</ThemedText>
          </Button>
        </View>

        <View>
          <ThemedText>logo</ThemedText>
          <ThemedText>Club</ThemedText>
        </View>
      </View>

      {/***********  Betting Markets  ***********/ }
      {marketSwitch(selectedsport as sports)}
       
    </View>
  )
}

export default EachMatch

const styles = StyleSheet.create({})

