// import React, { useEffect } from 'react';
// import { Pressable, ScrollView, Text, View } from 'react-native';
// import { sports as availsport } from '@/interface';
// import { useSports } from '@/store/useStore';

// interface ctrl {
//   handlePress: (sport: availsport) => void
//   selectSport: string
// }

// const Sport = ({handlePress, selectSport}: ctrl) => {
//    const { fetchSport, isLoading, error, sports } = useSports()
 
//   useEffect(() => {
//     fetchSport()
//   }, [])
  
//   return (
//     {
//       isLoading ? 
       
//       :
//       (
//         <>
//           <View className="py-5">
//             <Text className="text-white px-6 mb-5 text-2xl uppercase font-semibold">
//               Sports
//             </Text>
  
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingLeft: 20 }}
//             >
//               {sports.map((sport, index) => (
//                 <Pressable
//                   onPress={()=>handlePress(sport.name as availsport)}
//                   key={index}
//                   className={`${sport.name === selectSport ? "bg-sec" : "bg-white"}
//                   mr-4 rounded-full p-3 justify-center items-center`}
//                 >
//                   {/* <sport.icon size={28} color="#000" /> */}
//                 </Pressable>
//               ))}
//             </ScrollView>
//           </View>
//         </>
//       )
//     }
//   );
// };

// export default Sport;


import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { sports as availsport } from "@/interface";
import { useSports } from "@/store/useStore";
import SolidRoundSpinner from "../Reuseables/SolidSpinner";
import { useSport } from "@/hooks";

interface ctrl {
  handlePress: (sport: string) => void;
  selectSport: string;
}

const Sport = ({ handlePress, selectSport }: ctrl) => {
const { data: sports , isLoading, error } = useSport()


  if (isLoading) {
    return (
      <View className="py-5 items-center justify-center">
        < SolidRoundSpinner style={{borderColor: "white"}}/>
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
        Sports
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