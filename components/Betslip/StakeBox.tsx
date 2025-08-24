import { Pressable, StyleSheet, Text, View } from 'react-native'
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
          <Pressable className='bg-[#d9d9d94d] p-1' onPress={reduceStake}>
            <FontAwesome5 name={"minus"} size={10} color={"gold"} />
          </Pressable>
          <Pressable className='bg-[#d9d9d94d] p-1' onPress={addStake}>
            <FontAwesome5 name={"plus"} size={10} color={"gold"} />
          </Pressable>
        </View>
        <View>
          <Textinput 
          id="stake"
          keyboardType="numeric"
          value={stake || ""}
          onChangeText={handleChange}
          placeholder='Enter Stake'
          className='!w-[120px] !rounded-md ' inputStyle='!w-full placeholder:text-sec placeholder:text-base'
          />
          {stakeErr ? <ThemedText className='!text-red-500'>{stakeErr}</ThemedText> : null}
        </View>
      </View>
    </View>
  )
}

export default StakeBox

const styles = StyleSheet.create({})