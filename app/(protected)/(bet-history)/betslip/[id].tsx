import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BetHeader from '@/components/Reuseables/BetHeader'
import AngleRight from '@/assets/SVGs/Angle-right'
import { router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { flexNoJustify } from '@/constants/style'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import AnimatedPopup from '@/components/Reuseables/Animations/Popup'
import PopupD from '@/components/Betslip/PopupD'
import { useBetHistory } from '@/store/useStore'
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Main from './Main'


const betslip = () => {
  const insets = useSafeAreaInsets()
  const [visible, setVisible] = useState(false)
  const onOpen = () => setVisible(true)
  const onClose = () => setVisible(false)
  const { deleteBetSlip, bets } = useBetHistory()
  const { id } = useLocalSearchParams<{ id: string }>();
  const deleteBet = (id:string) => {
    deleteBetSlip(id)
    onClose()
    router.back()
  } 
  const bet = bets.find((b)=> b.id === Number(id))
  
  return (
     <View className='h-screen' style={{ backgroundColor: '#003C6F' }}>
        {/************* Header section *************/}
        {/* Figma: header #1F5079, back arrow, "Ticket Details" 18 white, trash on the right. */}
        <View style={{ backgroundColor: '#1F5079', paddingTop: insets.top + 8, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={()=> router.back()}>
            <FontAwesome6 name="angle-left" size={24} color="white" />
          </Pressable>
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Ticket Details</Text>
          <Pressable onPress={onOpen}>
            <FontAwesome5 name={"trash"} color={"#FFFFFF"} size={20}/>
          </Pressable>
        </View>
       {bet && <Main bet={bet}/> }
        {/************* Popup section *************/}
        <AnimatedPopup
          visible={visible}
          onClose={onClose}
          className='!bg-[#E3F2FD]'
          children = {<PopupD 
            onClose={onClose}
            func={() => deleteBet(id)}
            headerText='Delete Ticket'
            text={"Are you sure you want to Delete this ticket?"}

            />
          }
        />
    </View>

   
  )
}

export default betslip

const styles = StyleSheet.create({})