import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Main from '../Football/Main';
import { sampleFootballMarket } from '@/constants/options';
interface TemplateProps {
  arr: string[];
}

const Template = ({arr}: TemplateProps) => {
const [selected, setSelected] = React.useState<string>(arr[0]);
  return (
    <View className="flex-1 w-full">
  <Header
    headerArr={arr}
    selected={selected}
    setSelected={setSelected}
  />

  <ScrollView>
    <Main option={sampleFootballMarket.main} />
  </ScrollView>
</View>

  )
}

export default Template

const styles = StyleSheet.create({})