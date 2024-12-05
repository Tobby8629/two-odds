import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from './Layout'
import { router } from 'expo-router'


const Signup = () => {
  return (
    <Layout text='verify' onPress={()=> router.replace('/(tabs)')}>
      <Text>Signup</Text>
    </Layout>
  )
}

export default Signup

const styles = StyleSheet.create({})