import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { flex } from '@/constants/style'
import useKeyboardTranslation from '@/components/Reuseables/KeyboardTrans';
import { Animated } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import StakeBox from '@/components/Bets/Betslip/StakeBox';
import Button from '@/components/Reuseables/Button'
import RadioButton from '@/components/Reuseables/Input/RadioBtn'



interface footerProps {
  handleSubmit: (stake: number | null, baseStake: number) => void
}

const Footer = ({handleSubmit}: footerProps) => {
  const {translateY}  = useKeyboardTranslation(80)
    const [baseStake, setBaseStake] = useState(100)
    const [check, setCheck] = useState(false)
  const [stake, setStake] = useState<number | null>(baseStake)
  return (
    <Animated.View style={{ transform: [{ translateY }] }} className='fixed bottom-0 bg-[#003c6f] p-7'>
      <View className={flex}>
        <ThemedText className='text-xl capitalize'>Total odds: </ThemedText>
        <ThemedText className='text-xl font-semibold'>32.5</ThemedText>
      </View>
      <View className='flex-row justify-end items-center gap-3 my-3'>
        <ThemedText>Accepts odds change</ThemedText>     
        <RadioButton value={check} onToggle={()=>setCheck(!check)}/>
      </View>
      <View className={flex}>
        <ThemedText>Total Stakes: </ThemedText>
        <StakeBox setStake={setStake} stake={stake} baseStake={baseStake}/>
      </View>
      <View className={flex}>
        <ThemedText>total stakes: ${stake}</ThemedText> 
        {stake && stake >= baseStake ? <ThemedText>Potential winning: ${stake ? stake*3 : 0*3} </ThemedText> : null }
      </View>
      <View className={`${flex} my-3`}>
        <Button
          text='Book A Bet'
          onPress={()=> console.log("saved")}
        />
        <Button   
          text='Place A Bet'
          onPress={()=> handleSubmit(stake, baseStake)}
        />
      </View>
    </Animated.View>
  )
}

export default Footer

const styles = StyleSheet.create({})