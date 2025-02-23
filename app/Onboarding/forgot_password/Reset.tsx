import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Layout from './Layout'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'

const Reset = () => {
    const [reset, setReset] = useState({
      reset_code: "",
      password: "",
      confirm_password: "",
    })
    const onChangeText = (value: string, id?: InputID) => {
     setReset((prevData) => id ? { ...prevData, [id]: value } : prevData);
    }
        
  return (
    <Layout>
    <AnimatedInput id="reset_code"  placeholder='Reset code' type="text"
     onChangeText={onChangeText} inputStyle='bg-white w-full my-3' />
      <AnimatedInput id="password"  placeholder='New Password' type="password"
     onChangeText={onChangeText} inputStyle='bg-white w-full my-3' />
     <AnimatedInput id="confirm_password"  placeholder='Confirm Password' type="password"
     onChangeText={onChangeText} inputStyle='bg-white w-full my-3' />
    </Layout>
  )
}

export default Reset

const styles = StyleSheet.create({})