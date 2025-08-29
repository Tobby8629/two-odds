import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { bets, match } from '@/constants/data';
import { ThemedText } from '../ThemedText';
import CheckBox from '../Reuseables/Input/CheckBox';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../Reuseables/Button';
import Ball from '@/assets/SVGs/sport/ball';
import { flex, flexNoJustify } from '@/constants/style';

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
          <Pressable onPress={()=>select(bet?.id)}>
            <View className='flex-row border-b-[.5px] border-sec py-2 justify-between items-center'>
              <ThemedText className='!text-black capitalize'>
                {bet.betType} | {bet.date}
              </ThemedText>
              <Pressable onPress={()=>select(bet?.id)} className='px-5'>
                <FontAwesome name={selected=== bet?.id ? "angle-up" : 'angle-down'} size={15} color={"#FFA500"}/>
              </Pressable>
            </View>
          </Pressable>

          {selected === bet.id ? 
            <View>
               {bet.games.map((e, i)=>(
                <View key={e.id} className={` ${flex} py-5 ${i+1 === bet.games.length ? "" : "border-b-[.5px] border-gray-400"} `}>
                   <View>
                    <View className={`${flexNoJustify} gap-1`}>
                      <Ball />
                      <ThemedText  className='!text-black text-xl font-medium'>{e.selected}</ThemedText>
                    </View>
                    <ThemedText className='!text-black text-lg font-medium mb-1'>{e.match}</ThemedText>
                   </View>
                   <ThemedText className='!text-black capitalize'>{e.time}</ThemedText>
                   <View className={`${flexNoJustify} gap-2 items-center`}>
                     <ThemedText className='!text-black text-lg font-medium mb-1'>{e.odds}</ThemedText>
                     <View className='w-4 h-4 rounded-full border-[1px] border-black bg-transparent'></View>
                   </View>
                </View>
              ))}
            </View> : 
            <View className='my-2'>
               {bet.games.slice(0,2).map((e)=>(
                <ThemedText key={e.id} className='!text-black text-lg font-medium mb-1'>{e.match}</ThemedText>
              ))}
            </View>
          }

          <View className='mt-3'>
            <ThemedText className='!text-black my-1 !text-xl'>Potential Winning: <ThemedText className='font-medium !text-black'>{bet.potentialWin}</ThemedText></ThemedText>
            <ThemedText className='!text-black my-1 !text-xl'>Stake: <ThemedText className='font-medium !text-black'>{bet.stake} </ThemedText></ThemedText> 
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
