import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import StaticLayout from '@/components/Reuseables/StaticLayout';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome6 } from '@expo/vector-icons';
import { useSport } from '@/store/useSports';
import Layout from '../Layout';

const Country = () => {
  const { country } = useLocalSearchParams<{ country?: string }>();
  const { menuSelectedsport, dataArry } = useSport();
  const leagues = dataArry.find(e => e.country === country)?.leagues;
  const update = (name: string) => {
    router.push(`/(menu)/Leagues/matches/${name}`);
  };
 

  return (
    <StaticLayout className="!pt-0">
      <Layout
        title={country ?? ''}
        handleClick={() => router.push("/(tabs)/menu")}
      >
        <View className="px-6 py-10">
          {leagues?.map((e, idx) => (
            <Pressable
              onPress={() => update(e.name)}
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
