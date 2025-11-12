import { StyleSheet, Text, View } from 'react-native'
import StaticLayout from '../../components/Reuseables/StaticLayout'
import Head from '@/components/Home/Head'
import Sport from '@/components/Home/Sport'
import { useCallback } from 'react'
import { useSport } from '@/store/useSports'
import {  useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { sports } from '@/interface'

const menu = () => {
  const { handleSelect, selectedsport } = useSport();
  const { sport } = useLocalSearchParams<{ sport?: string }>();
  const router = useRouter();

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
    </StaticLayout>
  )
}

export default menu

const styles = StyleSheet.create({})