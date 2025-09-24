import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import BetHeader from '@/components/Reuseables/BetHeader'
import { FontAwesome6 } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { flex, flexNoJustify } from '@/constants/style'
import { router } from 'expo-router'
import Dropdown, { ItemProp } from '@/components/Reuseables/dropdown'
import USDT from '@/assets/SVGs/icons/Usdt'
import Textinput from '@/components/Reuseables/Input/TextInput'
import Button from '@/components/Reuseables/Button'
import { useWithdrawal, WithdrawInfo } from '@/store/useStore'


const withdraw = () => {
  const dropdown: ItemProp<"solana" | "usdt" | "naira">[] = [
    {
      title: "USDT",
      value: "usdt" ,
      icon: <USDT />
    },
    {
      title: "Naira",
      value: "naira",
      icon: <USDT />
    },
    {
      title: "Solana",
      value: "solana",
      icon: <USDT />
    }

  ]
  const [select, setSelect] = useState<ItemProp<"solana" | "usdt" | "naira">>(dropdown[0])
  const [error, setError] = useState(false)
  const {updateWithdrawInfo} = useWithdrawal()
  const [detail, setdetail] = useState<WithdrawInfo>({amount: "", asset:select.value, walletAddress: ""})
  const handleChange = (id: string, value: string) => {
    if(id=="amount"){
      const numeric = value.replace(/[^0-9.]/g, "");
      setdetail((prev)=>({...prev, [id]: numeric}))
    }
    else {
      setdetail((prev)=>({...prev, [id]: value}))
    }
  }
  const pushSummary = () => {
    if(!error) {
      updateWithdrawInfo(detail)
      router.push("/(transactions)/withdrawal/Summary")
    }
  }

  

  const valid = Object.values(detail).every((val) => val !== "");


  return (
    <View className=' bg-[#003c6f] h-screen'>
      <BetHeader
          left={
            <Pressable onPress={()=> router.back()}>
              <FontAwesome6 name="angle-left" size={24} color="white" />
            </Pressable>
          }
          middle={
            <ThemedText className='text-2xl text-center '>Withdrawal</ThemedText>
          }
          Right ={
            <View className={`${flexNoJustify} gap-2`}>
              <ThemedText className={`!text-[#cbc9c9] text-xl`}>$20.00</ThemedText>
              <View className='w-[20px] h-[20px] bg-white rounded-full items-center justify-center'></View>
            </View>
          }
      />
      <ScrollView className='px-5 my-2'>

        <ThemedText>Select Asset</ThemedText>

        <View className={`border-[1px] border-sec my-2 px-2 ${flexNoJustify} gap-2`}>
          {select.icon}
          <Dropdown<"solana" | "usdt" | "naira">
            title={select?.title}
            className='!top-[23%] w-[90%]'
            items={dropdown}
            setSelect={setSelect}
            wrapper=' !justify-between !w-[95%] !bg-green-400'
            // listWrapper='!w-[90%] !top-[173px]  !left-[20px] !mx-auto '
          />
        </View>

        <View className='my-3'>
          <ThemedText>Amount ({select.title})</ThemedText>
          <Textinput 
          id="amount"
          placeholder='$0.00'
          onChangeText={handleChange}
          value={detail.amount ? `$${detail.amount}` : ""}
          className='w-full placeholder:text-pry-light'
          inputStyle={` w-full text-white border-[1px] !bg-transparent ${detail.amount ? "border-sec" : "border-pry-light"}`}
          keyboardType="number-pad"
          />
          <View className={flex}>
            <ThemedText className='!text-pry-light !text-lg'>Min per Transaction $5</ThemedText>
            <ThemedText className='!text-pry-light !text-lg'>Max per Transaction $20k</ThemedText>
          </View>
        </View>

        <View className='my-3'>
          <ThemedText>Wallet Address</ThemedText>
          <Textinput 
          id="address"
          onChangeText={handleChange}
          value={detail.walletAddress}
          className='w-full'
          inputStyle={` w-full text-white border-[1px] !bg-transparent ${detail.walletAddress ? "border-sec" : "border-pry-light"}`}
          />
          <ThemedText className='!text-pry-light !text-lg'>Ensure that the address matches the selected network. Withdrawal to the wrong address can’t be refuded</ThemedText>
        </View>

        <Button 
          text='Withdraw'
          disable={!valid}
          onPress={pushSummary}
          className = {`mx-auto my-2 ${valid ?  "!bg-sec" : "!bg-gray-400"}`} 
        />
        
        <View className='my-3'>
          {Array.from({length: 3}, (_, i)=>(
            <View key={String(i)} className={`${flexNoJustify} gap-2  my-2`}>
              <View className='w-1 h-1 bg-white rounded-full'></View>
              <ThemedText className='!text-white'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default withdraw

const styles = StyleSheet.create({})