import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface welcome {
  className?: string,
  text: string
}

const Button = ({text, className}: welcome) => {
  return (
    <TouchableOpacity className={`bg-sec w-[161px] h-[35px] rounded-lg  items-center justify-center text-white my-1 ${className}`}>
      <Text className='text-center capitalize text-white text-lg'>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button