import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StaticLayout from '@/components/Reuseables/StaticLayout'
import Layout from '../../Layout'
import { router, useLocalSearchParams } from 'expo-router'
import { useSport } from '@/store/useSports'
import { ThemedText } from '@/components/ThemedText'
import { FontAwesome6 } from '@expo/vector-icons'
import { logo } from '@/constants/functions'
import interfaceSwitch from '@/components/gameInterfaces/InterfaceSwitch'
import { sports } from '@/interface'


const league = () => {
  const { dataArry,selectedsport } = useSport()
  const {league} = useLocalSearchParams<{ league?: string, country?: string }>();
  const country = dataArry.find((e)=> e.leagues.some((l)=> l.name === league))?.country
  const matches = dataArry.map((e)=> e.leagues).flat().find((e)=> e.name === league)?.matches
  console.log(matches)
  return (
   <StaticLayout className="!pt-0">
      <Layout
        title={`${country} - ${league}`}
        handleClick={()=>router.back()}
      >
      <View className='flex-row bg-pry-light px-6 justify-between border-y border-white py-5 items-center '>
        <ThemedText className='text-lg font-medium'>Friday matches</ThemedText>
        <View className='flex-row gap-1 items-center'>
          <FontAwesome6 name={logo(selectedsport)} color={"gold"}/>
          <ThemedText>live</ThemedText>
          <FontAwesome6 name="angle-right" color={"white"} />
        </View>
      </View>
      {interfaceSwitch(selectedsport as sports)}
    </Layout>
    </StaticLayout>
  )
}

export default league

const styles = StyleSheet.create({})