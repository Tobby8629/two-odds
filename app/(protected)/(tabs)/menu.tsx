import { StyleSheet } from 'react-native'
import Head from '@/components/Home/Head'
import Sport from '@/components/Home/Sport'
import { useCallback } from 'react'
import { useSport } from '@/store/useSports'
import {  useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { LeagueTemplate } from '@/components/menu/template'
import { FontAwesome6 } from '@expo/vector-icons'
import { logo } from '@/constants/functions'
import { updateDataArry } from '@/constants/dataOne'
import { sports } from '@/interface'
import StaticLayout from '@/components/Reuseables/StaticLayout'

const menu = () => {
  const { menuhandleSelect, menuSelectedsport} = useSport();
  const { sport } = useLocalSearchParams<{ sport?: string }>();
  useFocusEffect(
    useCallback(() => {
      if (menuSelectedsport === "") {
        menuhandleSelect("football");
        updateDataArry(menuSelectedsport as sports)
      }
     menuhandleSelect(menuSelectedsport)
    }, [sport, menuhandleSelect, menuSelectedsport])
  );

  
  return (
    <StaticLayout>
      <Head />
      <Sport selectSport={menuSelectedsport} handlePress={menuhandleSelect}/>
      <LeagueTemplate 
        sport = {<FontAwesome6 name={logo(menuSelectedsport)} color={"gold"}/>}
      />
    </StaticLayout>
  )
}

export default menu



const styles = StyleSheet.create({})