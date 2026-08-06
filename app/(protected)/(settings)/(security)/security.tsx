import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../Layout'
import { securityRoutes } from '@/constants/data'
import { Link, RelativePathString } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import AngleRight from '@/assets/SVGs/Angle-right'
import RadioButton from '@/components/Reuseables/Input/RadioBtn'

const security = () => {
  const listStyle = "pt-8 pb-4 flex-row items-center justify-between mx-5 border-b border-gray-400"
  const [enable, setEnable] = useState(false)
  return (
    <Layout header='Security'>
      {securityRoutes.map((security, index) => (
        security.id !== "2fa" ?
          <Link asChild href={security.link as RelativePathString} key={security.id}>
            <Pressable className={listStyle}>
              <ThemedText className="capitalize text-lg">{security.name}</ThemedText>
              <AngleRight />
            </Pressable>
          </Link> :
          <View className={listStyle} key={security.id}>
            <ThemedText className="text-lg">{security.name}</ThemedText>
            <RadioButton value={enable} onToggle={()=> setEnable(!enable) }/>
          </View>
        ))}
    </Layout>
  )
}

export default security

const styles = StyleSheet.create({})