import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface textinput {
  id: string
  onFocus?: () => void
  onBlur?: () => void
  onChangeText: (id: InputID, value: string) => void 
  className?: string
  secure?: boolean
}

const Textinput = ({ onChangeText, id, onFocus, secure, onBlur, className}: textinput) => {
  return (
    <View className={`w-full ${className}`}>
       <TextInput
        id={id}
        onBlur={onBlur}
        secureTextEntry={secure}
        onFocus={onFocus}
        className=' w-[267px] h-[39px] bg-white my-3 p-2'
        onChangeText={(value)=> onChangeText(id as InputID, value)}
       />
    </View>
  )
}

export default Textinput

const styles = StyleSheet.create({})