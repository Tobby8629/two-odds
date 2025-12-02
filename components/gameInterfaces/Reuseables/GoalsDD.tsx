// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { flex } from '@/constants/style'
// import { ThemedText } from '@/components/ThemedText';
// import { FontAwesome6 } from '@expo/vector-icons';

// interface GoalsDDProps <arryData> {
//   matchGoals: arryData[];
//   selectedGoal: string | null;
//   onSelectGoal: (goal: string) => void;
//   value: string;
// }

// const GoalsDD = ({matchGoals, value}: GoalsDDProps) => {
//   const [goalDD, setGoalDD] = React.useState(false);
//   const [selected, setSelected] = React.useState<string | null>(null);
//   return (
//      <View className="relative">
//           <Pressable
//             className={`${flex} justify-center gap-1 bg-cus-purple px-2 py-3 rounded-xl`}
//             onPress={() => setGoalDD(!goalDD)}
//           >
//             <ThemedText className="text-center">{value}</ThemedText>
//             <FontAwesome6 name="angle-down" color={"white"} size={12} />
//           </Pressable>

//           {goalDD && (
//             <Pressable
//               onStartShouldSetResponder={() => true}
//               className="absolute bg-light-blue gap-1 z-10 top-full left-0 w-[150%] rounded-lg p-2 px-3 mt-1"
//             >
//               {matchGoals.map(goal => (
//                 <Pressable
//                   key={goal?.line}
//                   // onPress={() => updateGoalSelection(goal.id)}
//                   className="mb-2 flex-row justify-between items-center"
//                 >
//                   <ThemedText className="text-left !text-black">
//                     {goal?.line}
//                   </ThemedText>

//                   {goal?.line === selected && (
//                     <FontAwesome6 name="check" color={"gold"} size={12} />
//                   )}
//                 </Pressable>
//               ))}
//             </Pressable>
//           )}
//         </View>
//   )
// }

// export default GoalsDD

// const styles = StyleSheet.create({})

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { flex } from "@/constants/style";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesome6 } from "@expo/vector-icons";

interface GoalItem {
  line: string;
  over?: string;
  under?: string;
}

interface GoalsDDProps {
  matchGoals: GoalItem[];
  onSelectGoal: (goal: string) => void;
  value: string;
}

const GoalsDD = ({ matchGoals, onSelectGoal, value }: GoalsDDProps) => {
  const [goalDD, setGoalDD] = React.useState(false);

  return (
    <View className="relative">
      {/* Dropdown Button */}
      <Pressable
        className={`${flex} justify-center gap-1 bg-cus-purple px-2 py-3 rounded-xl`}
        onPress={() => setGoalDD(!goalDD)}
      >
        <ThemedText className="text-center">{value}</ThemedText>
        <FontAwesome6 name="angle-down" color={"white"} size={12} />
      </Pressable>

      {/* Dropdown List */}
      {goalDD && (
        <View
          className="absolute bg-light-blue gap-1 z-10 top-full left-0 w-[150%] rounded-lg p-2 px-3 mt-1"
        >
          {matchGoals.map((goal) => (
            <Pressable
              key={goal.line}
              onPress={() => {
                onSelectGoal(goal.line);
                setGoalDD(false); // close dropdown
              }}
              className="mb-2 flex-row justify-between items-center"
            >
              <ThemedText className="text-left !text-black">
                {goal.line}
              </ThemedText>

              {value === goal.line && (
                <FontAwesome6 name="check" color={"gold"} size={12} />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default GoalsDD;

const styles = StyleSheet.create({});
