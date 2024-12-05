import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Layout from './Layout'
import { router } from 'expo-router'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import Logo from '@/assets/SVGs/Logo'
import CheckBox from '@/components/Reuseables/Input/CheckBox'
import Button from '@/components/Reuseables/Button'


const Signup = () => {

  const [registerData, setRegisterData] = useState<register>({
    email: "" as InputField,
    tc: false,
    subscribe: false,
  })
  
  const onChange = (value: string, id: InputField | undefined) => {
    if(id){
      setRegisterData({ ...registerData, [id]: value });
    }
  };
  const changeBox = (id: keyof register) => {
    setRegisterData((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  console.log(registerData)
  return (
    <View className='h-screen bg-pry justify-center px-[8%]'>
       <View className='flex-row justify-center'>
         <Logo />
       </View>
       <Text className=' my-8 w-full text-left text-white text-[26px] font-bold'>Enter your email address</Text>
       <AnimatedInput 
         id='email'
         inputStyle='rounded-lg'
         className='w-[100%] h-[50px]'
         placeholder='Email address'
         onChangeText={onChange}
       />
       <CheckBox onPress={changeBox} id="tc" value={registerData.tc}>
          <Text className='text-white text-[14px] leading-[20px]'>I have read and agree to 2Odds Terms of Service and Privacy Policy</Text>
       </CheckBox>
       <CheckBox onPress={changeBox} id="subscribe" value={registerData.subscribe}> 
         <Text className='text-white text-[14px] leading-[20px]'>Sign me up to receive newsletters, offers and tips from 2Odds (you can opt out at any time) <Text className='text-sec'>OPTIONAL</Text> </Text> 
       </CheckBox>

       <Button text='verify' onPress={ !registerData.email || !registerData.tc ? null : () => router.replace('/(tabs)')}
         className={` m-auto mt-14 h-[45px] rounded-3xl ${ !registerData.email || !registerData.tc ? "bg-gray-400" : "bg-sec" }`}
       />
    </View>
  )
}

export default Signup
