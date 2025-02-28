import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Layout from './Layout'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import { FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'
import Button from '@/components/Reuseables/Button'
import { navigateResetPassword } from '@/constants/functions'

const Reset = () => {
  const [reset, setReset] = useState({
    reset_code: "",
    password: "",
    confirm_password: "",
  })
  const [passwordError, setPasswordError] = useState({
    password: true,
    text: "",
  })
  const [resetError, setResetError] = useState({
    reset_code: true,
    text: "",
  })
  const [securepassword, setSecurePassword] = useState(true)
  const [secureconfirmPassword, setSecureConfirmPassword] = useState(true)
  const onChangeText = (value: string, id?: InputID) => {
    setReset((prevData) => id ? { ...prevData, [id]: value } : prevData);
  }

  const disable = reset.reset_code === '' || reset.password === '' || reset.confirm_password === '';
  
  const navigate = () => {
    navigateResetPassword({
      reset,
      passwordError,
      setPasswordError,
      setResetError
    })
  }

  console.log(resetError.reset_code, passwordError.password, reset)
        
  return (
    <Layout>
      <View className='my-10 items-center flex-1'>
      
      <AnimatedInput id="reset_code"  placeholder='Reset code' type="text"
      onChangeText={onChangeText} className='!w-full px-3 bg-white rounded-lg my-3' />
       {resetError.reset_code ? <Text className='text-red-700 text-lg font-semibold w-85% mr-auto '>
        {resetError.text}</Text> : null}

      <View className='!w-full flex-row items-center px-0 bg-white rounded-lg my-3'>
        <AnimatedInput id="password" secure={securepassword}  placeholder='New Password' type="password"
          onChangeText={onChangeText}  className='!w-[90%] !px-2 !mx-0' />
        <Pressable onPress={()=> setSecurePassword(!securepassword)}>
          <FontAwesome5 name={securepassword ? "eye-slash" : "eye"} color={"black"} size={20} />
        </Pressable>
      </View>
      {passwordError.password ? <Text className='text-red-700 text-lg font-semibold w-85% mr-auto '>
        {passwordError.text}</Text> : null}

      <View className='!w-full flex-row items-center px-0 bg-white rounded-lg my-3'>
        <AnimatedInput id="confirm_password" secure={secureconfirmPassword} placeholder='Confirm Password' type="password"
        onChangeText={onChangeText} className='!w-[90%] !px-2 !mx-0' />
        <Pressable onPress={()=> setSecureConfirmPassword(!secureconfirmPassword)}>
          <FontAwesome5 name={secureconfirmPassword ? "eye-slash" : "eye"} color={"black"} size={20} />
        </Pressable>
      </View>
      
      {passwordError.password ? <Text className='text-red-700 text-lg font-semibold w-85% mr-auto'>
        {passwordError.text}</Text> : null}
     
      <Button text="Continue" 
      disable={disable}
      className="my-5"
      onPress={navigate}
      />

   </View>
    </Layout>
  )
}

export default Reset

const styles = StyleSheet.create({})