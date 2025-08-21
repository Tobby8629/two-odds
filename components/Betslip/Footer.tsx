import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { flex } from '@/constants/style'
import useKeyboardTranslation from '../Reuseables/KeyboardTrans'
import { Animated } from 'react-native'
import { ThemedText } from '../ThemedText'
import StakeBox from './StakeBox'
import Button from '../Reuseables/Button'

const Footer = () => {
  const {translateY}  = useKeyboardTranslation(80)
    const [baseStake, setBaseStake] = useState(100)
  const [stake, setStake] = useState<number | null>(baseStake)
  return (
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
  )
}

export default Footer

const styles = StyleSheet.create({})