import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Loading from "@/components/Reuseables/Loading";
import { useSportFetch } from "@/hooks";

interface ctrl {
  handlePress: (sport: string) => void;
  selectSport: string;
  /** Defaults to the home heading. */
  title?: string;
}

const Sport = ({ handlePress, selectSport, title = "Sports" }: ctrl) => {
  const { data: sports, isLoading, error } = useSportFetch();

  if (isLoading) {
    return (
      <View className="py-5 items-center justify-center">
        <Loading inline size={40} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-5 px-6">
        <Text className="text-red-500">
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="py-5">
      <Text className="text-white px-6 mb-5 text-2xl uppercase font-semibold">
        {title}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
      >
        {sports?.data.map((sport) => (
          <Pressable
            key={sport.id}
            onPress={() => handlePress(sport?.id)}
            className={`
              ${sport.id === selectSport ? "bg-sec" : "bg-white"}
              mr-4 rounded-full p-3 justify-center items-center
            `}
          >
            <Text className="text-black">
              {sport.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Sport;
