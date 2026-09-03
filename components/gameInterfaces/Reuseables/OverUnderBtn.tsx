import { View, Pressable } from "react-native";
import { flex } from "@/constants/style";
import { ThemedText } from "@/components/ThemedText";
import React, { useEffect, useMemo } from "react";
import GoalsDD from "./GoalsDD";
import { useSport } from "@/store/useStore";

interface Props {
  match: any;
  generalGoal: string; 
}

const OverUnderButtons = ({ match, generalGoal }: Props) => {
  const { selectGame, selectedGames } = useSport();

  const overUnder = match?.odds?.overUnder ?? [];

  // --------- INITIAL VALUE ----------
  const initialLine = useMemo(() => {
    const found = overUnder.find(g => g.line === generalGoal);
    return found ? found.line : overUnder[0]?.line || "";
  }, [generalGoal, match.id]);

  const [value, setValue] = React.useState<string>(initialLine);

  // Update when generalGoal changes
  useEffect(() => {
    setValue(initialLine);
  }, [initialLine]);


  // --------- GET CURRENT LINE DATA ----------
  const selectedLineData = useMemo(() => {
    return overUnder.find(( g) => g.line === value);
  }, [value, match.id]);

  const line = selectedLineData?.line;
  const over = selectedLineData?.over;
  const under = selectedLineData?.under;


  // --------- CHECK SELECTED ----------
  const matchSelected = selectedGames?.filter(g => g.id === match.id);

  const checkOver = matchSelected?.some((e)=> e.option === `Over ${line}`);
  const checkUnder = matchSelected?.some((e)=> e.option === `Under ${line}`);

  // --------- HANDLE SELECT LINE ----------
  const updateGoalSelection = (line: string) => {
    const exists = overUnder.find(g => g.line === line);
    if (exists) setValue(line);
  };


  return (
    <View className={`${flex} gap-2 justify-between`}>
      {/* Dropdown for line selection */}
      <GoalsDD
        matchGoals={overUnder}
        onSelectGoal={updateGoalSelection}
        value={value}
      />

      {/* Over Button */}
      <Pressable
        onPress={() => selectGame( match.id,  `Over ${line}`, match )}
        className={`${checkOver ? "bg-sec" : "bg-cus-purple"} px-3 py-3 rounded-xl`}
      >
        <ThemedText className="text-center text-black">{over}</ThemedText>
      </Pressable>

      {/* Under Button */}
      <Pressable
        onPress={() => selectGame( match.id,  `Under ${line}`, match )}
        className={`${checkUnder ? "bg-sec" : "bg-cus-purple"} px-3 py-3 rounded-xl`}
      >
        <ThemedText className="text-center text-black">{under}</ThemedText>
      </Pressable>
    </View>
  );
};

export default OverUnderButtons;
