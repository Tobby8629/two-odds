import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../Layout'
import { ThemedText } from '@/components/ThemedText'
import OTPInput from '@/components/ui/Otp'
import Button from '@/components/Reuseables/Button'

const withdrawal_pin = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  return (
    <Layout header='Withdrawal pin' navigator='xmark'>
      <View>
        <View>
          <ThemedText>Enter Withdrawal Pin</ThemedText>
          <ThemedText>Lorem ipsum dolor sit amet consectetur.</ThemedText>
          <OTPInput 
           otp={otp}
           setOtp={setOtp}
           length={4}
           onSubmit={()=> console.log(otp)}
          />
          <Button text='Confirm' onPress={()=> console.log(otp)}/>
          <Pressable>
            <Text>forgot pin?</Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  )
}

export default withdrawal_pin

const styles = StyleSheet.create({})