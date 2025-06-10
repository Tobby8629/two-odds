import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Layout from './Layout'
import { Link } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { paymentSteps } from '@/constants/data'
import Textinput from '@/components/Reuseables/Input/TextInput'
import Button from '@/components/Reuseables/Button'
import { InputID } from '@/interface'

const Deposits = () => {
  const [value, setValue] = useState('');

  const handleChange = (id: InputID, value: string) => {
    const numericText = value.replace(/[^0-9]/g, '');
    setValue(numericText);
  };
  
  return (
    <Layout title="Deposits" otherLinks={
      <Link href={"/(tabs)/profile"}>
        <FontAwesome5 name="user" solid size={24} color="white" />
      </Link>
      }
    >
      <View className='px-6 py-10'>
        <Text>
          Balance(USD) $20.00
        </Text>
        <Textinput 
          id='price'
          keyboardType='numeric'
          inputStyle='!bg-transparent !h-auto text-white !my-0'
          className='!bg-transparent border-[1px] mt-5 border-white rounded-lg'
          onChangeText={handleChange}
        />
        <Button 
        text="Top up now" 
        onPress={()=> console.log("i clicked")}
        className='!mx-auto mt-5 w-[100px] !h-[35px]'
        textStyle=' text-normal'
        />
      </View>

      <View className='px-6'>
        <Text className='text-center '>Payment Steps</Text>
        <View>
          {paymentSteps.map((step, index) => (
            <View key={index} className="flex-row items-baseline gap-2 mb-2">
              <Text>{index + 1}.</Text>
              <Text className="text-lg">{step}</Text>
            </View>
          ))}
        </View>
      </View>

    </Layout>
  )
}

export default Deposits

const styles = StyleSheet.create({})