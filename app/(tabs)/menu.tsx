import { StyleSheet } from 'react-native'
import StaticLayout from '../../components/Reuseables/StaticLayout'
import Head from '@/components/Home/Head'
import Sport from '@/components/Home/Sport'
import { useCallback } from 'react'
import { useSport } from '@/store/useSports'
import {  useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { LeagueTemplate } from '@/components/menu/template'
import { FontAwesome6 } from '@expo/vector-icons'
import { logo } from '@/constants/functions'

const menu = () => {
  const { handleSelect, selectedsport} = useSport();
  const { sport } = useLocalSearchParams<{ sport?: string }>();

  useFocusEffect(
    useCallback(() => {
      if (selectedsport === "") {
        handleSelect("football");
      }
      
    }, [sport, handleSelect, selectedsport])
  );

  
  return (
    <StaticLayout>
      <Head />
      <Sport handlePress={handleSelect}/>
      <LeagueTemplate 
        sport = {<FontAwesome6 name={logo(selectedsport)} color={"gold"}/>}
      />
    </StaticLayout>
  )
}

export default menu



const styles = StyleSheet.create({})