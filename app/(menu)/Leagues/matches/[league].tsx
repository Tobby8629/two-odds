import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StaticLayout from '@/components/Reuseables/StaticLayout'
import Layout from '../../Layout'
import { router } from 'expo-router'


const league = () => {
  return (
   <StaticLayout className="!pt-0">
      <Layout
        title={""}
        handleClick={()=>router.back()}
      >
      <Text>league</Text>
    </Layout>
    </StaticLayout>
  )
}

export default league

const styles = StyleSheet.create({})