import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { InputID } from '@/interface'

interface textinput {
  id: string
  onFocus?: () => void
  onBlur?: () => void
  onChangeText: (id: InputID, value: string) => void 
  className?: string
  secure?: boolean
  inputStyle?: string
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "number-pad"
}

const Textinput = ({ onChangeText, id, keyboardType, onFocus, secure, inputStyle, onBlur, className}: textinput) => {
  return (
    <View className={`w-full ${className}`}>
       <TextInput
        id={id}
        keyboardType={keyboardType}
        onBlur={onBlur}
        secureTextEntry={secure}
        onFocus={onFocus}
        className={`w-[267px] h-[39px] bg-white my-3 p-2 ${inputStyle}`}
        onChangeText={(value)=> onChangeText(id as InputID, value)}
       />
    </View>
  )
}

export default Textinput

const styles = StyleSheet.create({})