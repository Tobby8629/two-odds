import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import StaticLayout from '@/components/Reuseables/StaticLayout';
import { RelativePathString, router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome6 } from '@expo/vector-icons';
import { useSport } from '@/store/useSports';
import Layout from '../Layout';
import { useCountryLeagues } from '@/hooks';

const Country = () => {
  const { country } = useLocalSearchParams<{ country?: string }>();
  const { menuSelectedsport } = useSport();

  const {data: leagues, refetch} = useCountryLeagues(country as string, menuSelectedsport)
  
   const update = (name: string, id: string ) => {
  router.push({
    pathname: `/(menu)/Leagues/matches/${name}` as RelativePathString,
    params: {
      country,
      id
    },
  });
};
  useEffect(()=>{
    refetch()
  },[menuSelectedsport])

  return (
    <StaticLayout className="!pt-0">
      <Layout
        title={country ?? ''}
        handleClick={() => router.push("/(tabs)/menu")}
      >
        <View className="px-6 py-10">
          {leagues?.data?.map((e, idx) => (
            <Pressable
              onPress={() => update(e.name, e.id)}
              key={e.name}
              className={`py-5 border-b border-gray-400 flex-row items-center justify-between`}
            >
              <ThemedText>{e.name}</ThemedText>
              <FontAwesome6 name="angle-right" color={"white"} />
            </Pressable>
          ))}
        </View>
      </Layout>
    </StaticLayout>
  );
};

export default Country;

const styles = StyleSheet.create({});
