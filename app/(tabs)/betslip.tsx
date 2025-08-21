import { StyleSheet, ScrollView, View, Text, Dimensions, Animated, Keyboard, Pressable } from 'react-native';

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
import useBetslip from '@/store/useStore';
import EmptyState from '@/components/Reuseables/EmptyState';
import AnimatedPopup from '@/components/Reuseables/Animations/Popup';
import MatchCard from '@/components/Betslip/MatchCard';
import Footer from '@/components/Betslip/Footer';
import PopupD from '@/components/Betslip/PopupD';

export default function TabTwoScreen() {
  const options = [
    {title:"Bet Accumulator", value: "bet_Accumulator"}, 
    {title:"Single Bet", value: "single"}, 
    {title:"System Bet", value: "system"}
  ]
  const [visible, setVisible] = useState(false)
  const onClose = () => setVisible(false)
  const onOpen = () => {
    setVisible(true)
  }
  const [selected, setSelected] = useState(options[0]) 
  const { match, clearBetslip} = useBetslip()
  const { height } = Dimensions.get("window");

  return (
    <View  
        style={{
        height: height - 70,
        backgroundColor: "#003c6f",
      }} className=' bg-[#003c6f]'
    >
      <View className={`${flex} fixed top-0 pt-14 pb-7 px-7 left-0 right-0 z-10 bg-pry-light`}>
        <View className='h-10 w-10 justify-center items-center rounded-full bg-sec'>
          <Text className='text-xl font-bold text-white '>{match.length}</Text>
        </View>
        <Dropdown title={selected?.title} items={options} setSelect={setSelected}/>
        <View className={`${flexNoJustify} gap-4`}>
          <ThemedText className={`!text-[#cbc9c9] text-lg`}>$20.00</ThemedText>
          <Pressable onPress={onOpen}>
            <FontAwesome5 name={"trash"} color={"#cbc9c9"} size={20}/>
          </Pressable>
        </View>
      </View>
      {match.length <= 0 ? <EmptyState className='!mt-[50%] ' text='Your betslip is empty'/> : 
        <>
          <MatchCard />
          <Footer />
          <AnimatedPopup
            visible={visible}
            onClose={onClose}
            className='!bg-[#E3F2FD]'
            children = {<PopupD onClose={onClose}/> }
          />
        </>
      }
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
