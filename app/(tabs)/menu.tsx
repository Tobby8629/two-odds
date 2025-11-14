import { StyleSheet } from 'react-native'
import StaticLayout from '../../components/Reuseables/StaticLayout'
import Head from '@/components/Home/Head'
import Sport from '@/components/Home/Sport'
import { useCallback } from 'react'
import { useSport } from '@/store/useSports'
import {  useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { LeagueTemplate } from '@/components/menu/template'
import { FontAwesome6 } from '@expo/vector-icons'

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

  const logo = () => {
    switch (selectedsport) {
      case "basketball":
        return "basketball";

      case "americafootball":
      return "football";
      
      case "tennis":
      return "table-tennis-paddle-ball";
    
      default:
        return "futbol"
      break;
    }
  }
  
  return (
    <StaticLayout>
      <Head />
      <Sport handlePress={handleSelect}/>
      <LeagueTemplate 
        sport = {<FontAwesome6 name={logo()} color={"gold"}/>}
      />
    </StaticLayout>
  )
}

export default menu



const styles = StyleSheet.create({})