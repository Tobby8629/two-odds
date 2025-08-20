import { StyleSheet, ScrollView, View, Text, Dimensions, Animated, Keyboard } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { flex, flexNoJustify } from '@/constants/style';
import { FontAwesome5 } from '@expo/vector-icons';
import Dropdown from '@/components/Reuseables/dropdown';
import React, { useEffect, useRef, useState } from 'react';
import Ball from '@/assets/SVGs/sport/ball';
import GoldX from '@/assets/SVGs/icons/GoldX';
import StakeBox from '@/components/Betslip/StakeBox';
import useKeyboardTranslation from '@/components/Reuseables/KeyboardTrans';
import Button from '@/components/Reuseables/Button';

// import StakeBox from '@/components/Betslip/StakeBox';

export default function TabTwoScreen() {
  const options = [
    {title:"Bet Accumulator", value: "bet_Accumulator"}, 
    {title:"Single Bet", value: "single"}, 
    {title:"System Bet", value: "system"}
  ]
  const match = [
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    {
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
  ]
  const [selected, setSelected] = useState(options[0]) 
  const [baseStake, setBaseStake] = useState(100)
   const [stake, setStake] = useState<number | null>(baseStake)

  const { height } = Dimensions.get("window");
  const { translateY } = useKeyboardTranslation(80)
  return (
    <View  
        style={{
        height: height - 70,
        backgroundColor: "#003c6f",
      }} className=' bg-[#003c6f]'
    >
      <View className={`${flex} fixed top-0 pt-14 pb-7 px-7 left-0 right-0 z-10 bg-pry-light`}>
        <View className='h-10 w-10 justify-center items-center rounded-full bg-sec'>
          <Text className='text-xl font-bold text-white '>2</Text>
        </View>
        <Dropdown title={selected?.title} items={options} setSelect={setSelected}/>
        <View className={`${flexNoJustify} gap-3`}>
          <ThemedText className={`!text-[#cbc9c9]`}>$20.00</ThemedText>
          <FontAwesome5 name={"trash"} color={"#cbc9c9"} ize={16}/>
        </View>
      </View>
      {/************* Match Selected Card******************/}
      <ScrollView className='p-7'>
        {match.map((e, index)=>(
          <View key={index} className={`${flex} mb-5`}>
            <View className={`${flexNoJustify} gap-3 min-w-[80%]`}>
              <GoldX />
              <View className='gap-2'>
                <View className={`${flexNoJustify} gap-2`}>
                  <Ball />
                  <ThemedText className=' font-semibold text-2xl capitalize'>{e.selected}</ThemedText>
                </View>
                <ThemedText className=' font-medium text-lg'>{e.match}</ThemedText>
                <ThemedText className='capitalize pr-3'>{e.time}</ThemedText>
              </View>
            </View>
            <ThemedText>{e.odds}</ThemedText>
          </View>
        ))}
      </ScrollView>

       {/************* Bottom Card******************/}
      <Animated.View style={{ transform: [{ translateY }] }} className='fixed bottom-0 bg-[#003c6f] p-7'>
        <View className={flex}>
          <ThemedText className='text-xl capitalize'>Total odds: </ThemedText>
          <ThemedText className='text-xl font-semibold'>32.5</ThemedText>
        </View>
        <ThemedText className='my-3'>Radio</ThemedText>
        <View className={flex}>
          <ThemedText>Total Stakes: </ThemedText>
          <StakeBox setStake={setStake} stake={stake} baseStake={baseStake}/>
        </View>
        <View className={flex}>
          <ThemedText>total stakes: ${stake}</ThemedText> 
          <ThemedText>Potential winning: ${stake ? stake*3 : 0*3}</ThemedText>
        </View>
        <View className={`${flex} my-3`}>
          <Button
            text='Book A Bet'
            onPress={()=> console.log("saved")}
          />
          <Button   
            text='Place A Bet'
            onPress={()=> console.log("saved")}
          />
        </View>
      </Animated.View> 
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
