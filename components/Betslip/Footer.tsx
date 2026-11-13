import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { flex } from '@/constants/style'
import useKeyboardTranslation from '../Reuseables/KeyboardTrans'
import { Animated } from 'react-native'
import { ThemedText } from '../ThemedText'
import StakeBox from './StakeBox'
import Button from '../Reuseables/Button'
import OddsSwitch from './OddsSwitch'
import { useSport } from '@/store/useStore'
interface footerProps {
  handleSubmit: (stake: number | null, baseStake: number) => void
}

const Footer = ({handleSubmit}: footerProps) => {
  const {translateY}  = useKeyboardTranslation(80)
    const [baseStake, setBaseStake] = useState(100)
    const [check, setCheck] = useState(false)
  const [stake, setStake] = useState<number | null>(baseStake)
  const { selectedGames } =useSport()
 const totalOdd = selectedGames.reduce(
  (acc, e) => acc * e.odd,
  1
);

  return (
    <Animated.View style={{ transform: [{ translateY }] }} className='fixed bottom-0 bg-[#003c6f] p-7'>
      <View className={flex}>
        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Total Odds:</Text>
        <ThemedText className='text-xl font-semibold'>{totalOdd.toFixed(2)}</ThemedText>
      </View>
      <View className='flex-row justify-end items-center gap-3 my-3'>
        <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Accepts odds change</Text>     
        <OddsSwitch value={check} onToggle={()=>setCheck(!check)}/>
      </View>
      <View className={flex}>
        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Total Stakes:</Text>
        <StakeBox setStake={setStake} stake={stake} baseStake={baseStake}/>
      </View>
      <View className={flex}>
        <Text style={{ color: '#FFFFFF', fontSize: 10 }}>Total Stakes: ${stake ?? 0}</Text> 
        <Text style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'right' }}>Potential Winning: ${((stake ?? 0) * totalOdd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
      <View className={`${flex} my-3`}>
        {/* Figma: Book A Bet 132x48 radius 8 #D9D9D9 at 30%; Place Bet 196x48 radius 8 #FFA500; labels 18 white. */}
        <Pressable
          onPress={()=> console.log("saved")}
          style={{ width: 132, height: 48, borderRadius: 8, padding: 10, backgroundColor: 'rgba(217,217,217,0.3)', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Book A Bet</Text>
        </Pressable>
        <Pressable
          onPress={()=> handleSubmit(stake, baseStake)}
          style={{ flex: 1, maxWidth: 196, marginLeft: 12, height: 48, borderRadius: 8, padding: 10, backgroundColor: '#FFA500', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Place Bet</Text>
        </Pressable>
      </View>
    </Animated.View>
  )
}

export default Footer

const styles = StyleSheet.create({})