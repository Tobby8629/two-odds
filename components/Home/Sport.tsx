import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { sports } from '@/constants/data';
import { useSport } from '@/store/useSports';
import { sports as availsport } from '@/interface';

interface ctrl {
  handlePress: (sport: availsport) => void
}

const Sport = ({handlePress}: ctrl) => {
  const { selectedsport} = useSport()
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
          <Pressable
            onPress={()=>handlePress(sport.name as availsport)}
            key={index}
            className={`${sport.name === selectedsport ? "bg-sec" : "bg-white"}
            mr-4 rounded-full p-3 justify-center items-center`}
          >
            <sport.icon size={28} color="#000" />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Sport;
