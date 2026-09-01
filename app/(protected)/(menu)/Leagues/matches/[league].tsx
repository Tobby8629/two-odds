import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../Layout'
import { router, useLocalSearchParams } from 'expo-router'
import { useSport } from '@/store/useSports'
import { ThemedText } from '@/components/ThemedText'
import { FontAwesome6 } from '@expo/vector-icons'
import { logo } from '@/constants/functions'
import { BettingMarket, MatchProps, sports } from '@/interface'
import interfaceSwitch from '@/components/gameInterfaces/InterfaceSwitch'
import useBetslip from '@/store/useStore'
import { useEffect, useState } from 'react'
import { getMarketsBySport } from './data'
import { useMatches } from '@/hooks'


const league = () => {
  const { menuSelectedsport } = useSport()
  const { league, country, id } = useLocalSearchParams<{ league?: string; country?: string; id: string }>()
  const { match} = useBetslip();
  const [markets, setMarkets] = useState<BettingMarket[]>([]);

  useEffect(() => {
    setMarkets(getMarketsBySport(menuSelectedsport as "football" | "basketball"));
  }, [menuSelectedsport]);



  return (
    // <StaticLayout className="!pt-0">
      <Layout
        title={`${country} - ${league}`}
        handleClick={() => router.back()}
      >
        <View className="flex-row bg-pry-light px-6 justify-between border-y border-white py-5 items-center">
          <ThemedText className="text-lg font-medium">Friday matches</ThemedText>
          <View className="flex-row gap-1 items-center">
            <FontAwesome6 name={logo(menuSelectedsport)} color={"gold"} />
            <ThemedText>live</ThemedText>
            <FontAwesome6 name="angle-right" color={"white"} />
          </View>
        </View>

        {/* InterfaceSwitch now renders a FlatList safely inside Layout */}
        {interfaceSwitch({ markets: markets, setMarkets: setMarkets, id })}
      </Layout>
    // </StaticLayout>
  )
}

export default league

const styles = StyleSheet.create({})
