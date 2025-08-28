import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { bets, match } from '@/constants/data';
import { ThemedText } from '../ThemedText';
import CheckBox from '../Reuseables/Input/CheckBox';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../Reuseables/Button';

const EachBet = () => {
  const [cashoutChanges, setCashoutChanges] = useState<{ [key: number]: boolean }>({});
  const [selected, setselected] = useState<number | null>(null);

  const toggleCashout = (id: number) => {
    setCashoutChanges((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const select = (id: number) => {
    selected === id ? setselected(null) : setselected(id);
  };

  return (
    <View style={styles.container}>
      {bets.map((bet) => (
        <View key={bet.id} style={styles.card} >
          <View className='flex-row justify-between items-center'>
            <ThemedText className='!text-black'>
              {bet.betType} | {bet.date}
            </ThemedText>
            <Pressable onPress={()=>select(bet?.id)} className='px-5'>
              <FontAwesome name={selected=== bet?.id ? "angle-up" : 'angle-down'} size={15} color={"#FFA500"}/>
            </Pressable>
          </View>

          <View className='mt-3'>
            <ThemedText className='!text-black my-1'>Stake: {bet.stake} </ThemedText> 
            <ThemedText className='!text-black my-1'>Potential Win: {bet.potentialWin}</ThemedText>
          </View>

          <Button 
          text='Cashout'
          className='w-full mt-2'
          onPress={()=>console.log("cashout loading")}
          />

          <View style={styles.checkboxContainer} >
            <CheckBox
              value={!!cashoutChanges[bet.id]}
              onPress={() => toggleCashout(bet.id)}
              textStyle="!mb-0"
              boxStyle={` !rounded-[2px] !w-[17px] !h-[17px] justify-center items-center ${cashoutChanges[bet.id] ? "bg-sec !border-sec" : "bg-white"}`}
              icon = {cashoutChanges[bet.id] ? <FontAwesome name="check" color={"white"}/> : null}
              className=' !items-center'
            >
              <ThemedText className='!text-black'>Accept cashout changes</ThemedText>
            </CheckBox>
          </View>
        </View>
      ))}
    </View>
  );
};

export default EachBet;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E3F2FD", // adjust to theme
  },
  checkboxContainer: {
    marginTop: 10,
  },
});
