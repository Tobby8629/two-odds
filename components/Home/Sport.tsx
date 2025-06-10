import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { sports } from '@/constants/data';

const Sport = () => {
  return (
    <View className="py-5 border-b-2 border-white">
      <Text className="text-white px-6 mb-5 text-2xl uppercase font-semibold">
        Sports
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
      >
        {sports.map((sport, index) => (
          <Link
            href={sport.link}
            key={index}
            className="bg-white mr-4 rounded-full p-3 justify-center items-center"
          >
            <sport.icon size={28} color="#000" />
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default Sport;
