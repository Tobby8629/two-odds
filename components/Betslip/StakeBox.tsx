import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { flexNoJustify } from '@/constants/style'
import Textinput from '../Reuseables/Input/TextInput'
import { ThemedText } from '../ThemedText'

interface stakeboxProps {
   stake: number | null,
   baseStake: number,
   setStake: Dispatch<React.SetStateAction<number | null>>
}

  const StakeBox = ({stake, baseStake, setStake}: stakeboxProps) => {
    const [stakeErr, setStakeErr] = useState("")
    const handleChange = (id: string,value: string) => {
    console.log(value)
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setStake(null);
    } else {
      setStake(num);
    }
  };

  const addStake = () => {
    console.log("click", stake, baseStake)
    setStakeErr("")
    setStake(stake ? stake+baseStake : 0+baseStake)
  }
  const reduceStake = () => {
    console.log("click", stake, baseStake)
    setStakeErr("");
    const stak = stake ? stake - baseStake : 0 - baseStake; 
    if (stak < baseStake) {
      setStakeErr(`Can't go below the ${baseStake}`);
      return;
    }
    setStake(stak);
  };

  return (
    <View>
      <View className={`${flexNoJustify} gap-3`}>
        <View className={`${flexNoJustify} gap-3`}>
          {/* Figma: "-" / "+" 14 amber #FFA500 on a #D9D9D9 30% square. */}
          <Pressable onPress={reduceStake} style={styles.step}>
            <Text style={styles.stepText}>-</Text>
          </Pressable>
          <Pressable onPress={addStake} style={styles.step}>
            <Text style={styles.stepText}>+</Text>
          </Pressable>
        </View>
        <View>
          {/* Figma: 115x45, radius 4, fill #E6E8EA. */}
          <TextInput
            keyboardType="numeric"
            value={stake ? String(stake) : ""}
            onChangeText={(v) => handleChange("stake", v)}
            placeholder="Enter Stake"
            placeholderTextColor="#FFA500"
            style={styles.input}
          />
          {stakeErr ? <ThemedText className='!text-red-500'>{stakeErr}</ThemedText> : null}
        </View>
      </View>
    </View>
  )
}

export default StakeBox

const styles = StyleSheet.create({
  step: { width: 18, height: 18, borderRadius: 2, backgroundColor: 'rgba(217,217,217,0.3)', alignItems: 'center', justifyContent: 'center' },
  stepText: { color: '#FFA500', fontSize: 14, lineHeight: 16 },
  input: { width: 115, height: 45, borderRadius: 4, backgroundColor: '#E6E8EA', color: '#FFA500', fontSize: 18, textAlign: 'center', padding: 0 },
})