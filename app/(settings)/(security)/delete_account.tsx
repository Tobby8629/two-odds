import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '../Layout'
import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/Reuseables/Button'

const delete_account = () => {
  return (
   <Layout header='Delete Account' navigator='xmark'>
      <Delete />
      <Exclusion />
      <View>
        <ThemedText>Customer service</ThemedText>
        <ThemedText>Lorem ipsum dolor sit amet consectetur. Facilisi arcu cursus pellentesque dui urna.</ThemedText>
      </View>
   </Layout>
  )
}

const Exclusion = () => {
  return (
    <View>
      <ThemedText>
        Lorem ipsum dolor sit amet consectetur. 
        Habitasse at phasellus venenatis non eu egestas arcu lectus.
        Molestie duis amet sit et. Vitae feugiat lacus faucibus 
        tincidunt convallis. Nunc.Lorem ipsum dolor sit amet 
        consectetur. Habitasse at phasellus venenatis non eu egestas
        arcu lectus. Molestie duis amet sit et. Vitae feugiat lacus faucibus 
        tincidunt convallis. Nunc.Lorem ipsum dolor sit amet consectetur. 
        Habitasse at phasellus venenatis non eu egestas arcu lectus. Molestie duis amet sit et. 
        Vitae feugiat lacus faucibus tincidunt convallis. Nunc.
      </ThemedText>
      <ThemedText>
        If you are considering the self exclusion you need to withdraw your money. 
        You won’t be able to withdraw until you back.
      </ThemedText>
      <Button text='Set up Self-Exclusion' onPress={()=>console.log("cancel")}/>
    </View>
  )
}

const Delete = () => {
  return (
    <>
      <ThemedText>Are You Sure You Wish to Delete Your Account</ThemedText>
      <ThemedText>
        Lorem ipsum dolor sit amet consectetur. 
        Habitasse at phasellus venenatis non eu egestas arcu lectus.
         Molestie duis amet sit et.
         Vitae feugiat lacus faucibus tincidunt convallis. Nunc.
      </ThemedText>
      <ThemedText>
        Lorem ipsum dolor sit amet consectetur. 
        Habitasse at phasellus venenatis non eu egestas 
      </ThemedText>
      <ThemedText>
        If you wish to close your account temporarily and use it in the future 
        you will need to contact support directly or self exclude yourself
        <Pressable>
          <ThemedText>Click Here</ThemedText>
        </Pressable>
      </ThemedText>
      <Button text='Close Your Account' onPress={()=>console.log("cancel")}/>
      
    </>
  )
}

export default delete_account

const styles = StyleSheet.create({})