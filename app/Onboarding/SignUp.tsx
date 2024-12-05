import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Layout from './Layout'
import { router } from 'expo-router'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'


const Signup = () => {
  const [email, setEmail] = useState<string>('')
  const [shift, setShift] = useState<string>("")
  return (
    <Layout text='verify' onPress={()=> router.replace('/(tabs)')} shift={shift}>
       <Text className=' my-5 text-left text-white text-xl'>Enter your email address</Text>
       <AnimatedInput 
         id='email'
         placeholder='Email address'
         onChangeText={()=> setEmail(email)}
         setShift={setShift}
       />
    </Layout>
  )
}

export default Signup

const styles = StyleSheet.create({})