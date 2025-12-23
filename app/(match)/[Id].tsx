import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { use, useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import MatchMore from '@/assets/SVGs/match/MatchMore'
import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/Reuseables/Button'
import { useSport } from '@/store/useSports'
import { sports } from '@/interface'
import Template from '@/components/Match/reuseables/Template'
import { router } from 'expo-router'
import TeamFeatures from '@/components/Match/reuseables/TeamFeatures'
import { Animated, Dimensions } from "react-native";
import { useEffect, useRef } from "react";
import Statistics from '@/components/Match/Football/Statistics'
import Bar from '@/assets/SVGs/Bar'



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
  const [statistics, setStatistics] = useState(false)
  const screenHeight = Dimensions.get("window").height;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (statistics) {
      Animated.timing(slideAnim, {
        toValue: screenHeight * 0.15,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [statistics]);


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
      <TeamFeatures setStatistics={setStatistics} />

        <Modal visible={statistics} transparent>
          <View
            className="flex-1 bg-black/30"
          >
            
            <Animated.View
              style={{ transform: [{ translateY: slideAnim }] }}
              className="absolute h-full w-[90%] left-6 bg-white rounded-t-2xl p-4 pt-2"
            >
              <Pressable
             onPress={() => setStatistics(false)}
             className=' items-center w-1/2 mx-auto'
            >
            
              <Bar color={"red"} height={20}/>
              
            </Pressable>
              <Statistics />
            </Animated.View>
          </View>
        </Modal>
      {/***********  Betting Markets  ***********/ }
      <View className='flex-1 mt-4 relative'>
        {marketSwitch(selectedsport as sports)}
      </View>
       
    </View>
  )
}

export default EachMatch

const styles = StyleSheet.create({})

