import { Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React, { useCallback, useState } from "react";
import { ThemedText } from "../ThemedText";
import { flex } from "@/constants/style";
import { useFocusEffect } from "expo-router";
import { useStore } from "zustand";
import useBetslip from "@/store/useStore";
import { FontAwesome6 } from "@expo/vector-icons";
import { MatchProps } from "@/interface";

// ---------- TYPES ----------
export interface BetOption {
  id: string;
  title: string;
  init: string;
}

export interface GoalOption {
  id: string;
  select: boolean;
  init: string;
}

export interface BettingMarket {
  id: number;
  title: string;
  selected: boolean;
  options: BetOption[];
  goals?: GoalOption[];
}

const Football = () => {
  const [goalDD, setGoalDD] = useState(false);
  const [markets, setMarkets] = useState<BettingMarket[]>([
    {
      id: 1,
      title: "1X2",
      selected: true,
      options: [
        { id: "home", title: "Home", init: "1" },
        { id: "draw", title: "Draw", init: "X" },
        { id: "away", title: "Away", init: "2" },
      ],
    },
    {
      id: 2,
      title: "Double Chance",
      selected: false,
      options: [
        { id: "home_draw", title: "Home or Draw", init: "1X" },
        { id: "home_away", title: "Home or Away", init: "12" },
        { id: "draw_away", title: "Draw or Away", init: "X2" },
      ],
    },
    {
      id: 3,
      title: "Over / Under",
      selected: false,
      options: [
        { id: "over", title: "Over", init: "Over" },
        { id: "under", title: "Under", init: "Under" },
      ],
      goals: [
        { id: "1", select: true, init: "0.5" },
        { id: "2", select: false, init: "1.5" },
        { id: "3", select: false, init: "2.5" },
        { id: "4", select: false, init: "3.5" },
        { id: "5", select: false, init: "4.5" },
        { id: "6", select: false, init: "5.5" },
      ],
    },
    {
      id: 4,
      title: "BTTS",
      selected: false,
      options: [
        { id: "yes", title: "Yes", init: "Yes" },
        { id: "no", title: "No", init: "No" },
      ],
    },
  ]);

  const { match, selectGame } = useBetslip()

  const selectMarket = useCallback((id: number) => {
    setMarkets((prev) =>
      prev.map((m) => ({
        ...m,
        selected: m.id === id,
      }))
    );
  }, []);

  const selectedMarket = markets.find((m) => m.selected);

  const checkSelected = (arr: {id: string, option: "Home" | "Away" | "Draw"}[], option: string) => {
    const check = arr.some((e) => e.option === option)  
    return check
  }

  return (
    <TouchableWithoutFeedback onPress={() => setGoalDD(false)}>
    <View style={{ flex: 1 }}>
      <View className={`${flex} border-b border-gray-300 px-8 pt-3`}>
        {markets.map((market) => (
          <Pressable
            key={market.id}
            onPress={() => selectMarket(market.id)}
            className="mb-3"
          >
            <ThemedText className="text-lg font-light text-gray-300">
              {market.title}
            </ThemedText>
            <View
              className={`${
                market.selected ? "bg-sec" : "bg-transparent"
              } h-2 w-2 mx-auto mt-1 rounded-lg`}
            />
          </Pressable>
        ))}
      </View>
      {selectedMarket && (
        selectedMarket.id === 3 ? (
          <OverUnderHeader 
          goalDD={goalDD} 
          setGoalDD={setGoalDD}
          selectedMarket={selectedMarket} 
          setMarkets={setMarkets} />
        ) : (
        <View className={`px-8 bg-pry-light py-2 ${flex}`}> 
          <ThemedText className='text-lg w-[48%] font-medium mb-2'>Matches</ThemedText> 
          <View className={`${flex} justify-around w-[48%]`}>
            {selectedMarket.options.map((opt) => ( 
              <View key={opt.id} className='mb-2'> 
                <ThemedText className="text-center">{opt.init}</ThemedText> 
              </View> 
            ))}
          </View>
        </View> 
        )
      )}
      {match.map((match, idx) => (
        <View key={idx} className={`${flex} my-3 px-3 py-3 bg-light-blue mb-3 mx-6 rounded-xl`}>
          <View className="w-[48%]">
            <ThemedText className='text-sm !text-black capitalize'>{match.time}</ThemedText>
            <View className="gap-1">
              <View>
              <ThemedText className='text-lg !text-black font-medium'>{match.home} </ThemedText>
              </View>
              <View>
                <ThemedText className='text-lg !text-black font-medium'>{match.away}</ThemedText>
              </View>
            </View>
          </View>
          <View className='flex-row w-[48%] gap-3 mt-2'>
            {selectedMarket?.id === 3 ? (
              <OverUnder selectGame={selectGame} checkSelected={checkSelected} match={match} /> 
            ) : (
              <>
              <Pressable onPress={()=> selectGame({id: match.id, option: "Home"})} className={`${checkSelected(match.selected, "Home") ? "bg-sec" : "bg-cus-purple"} px-3 py-3 rounded-xl`}>
                <ThemedText className={`${checkSelected(match.selected, "Home") ? "!text-white" : "!text-black"} text-sm`}>{match.homeOdds}</ThemedText>
              </Pressable>
              <Pressable onPress={()=> selectGame({id: match.id, option: "Draw" })} className={`${checkSelected(match.selected, "Draw")  ? "bg-sec" : "bg-cus-purple"} px-3 py-3 rounded-xl`}>
                <ThemedText className={`${checkSelected(match.selected, "Draw") ?  "!text-white" : "!text-black"} text-sm`}>{match.drawOdds}</ThemedText>
              </Pressable>
              <Pressable onPress={()=> selectGame({id: match.id, option: "Away" })} className={`${checkSelected(match.selected,"Away")  ? "bg-sec" : "bg-cus-purple"} px-3 py-3 rounded-xl`}>
                <ThemedText className={`${checkSelected(match.selected,"Away") ? "!text-white" : "!text-black"} text-sm`}>{match.awayOdds}</ThemedText>
              </Pressable>
              </>
            )}
          </View>
        </View>
      ))} 
    </View>
    </TouchableWithoutFeedback>
  );
};

export default Football;

const styles = StyleSheet.create({});

interface OVERHEADER {
  goalDD: boolean;
  setGoalDD: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMarket: BettingMarket;
  setMarkets: React.Dispatch<React.SetStateAction<BettingMarket[]>>;
}

interface OVERUNDER {
  selectGame: (option: {id: number, option: "Home" | "Away" | "Draw"}) => void; 
  checkSelected: (arr: {id: string, option: "Home" | "Away" | "Draw"}[], option: string) => boolean;
  match: MatchProps;
}

const OverUnderHeader = ({ selectedMarket, setMarkets, goalDD, setGoalDD }: OVERHEADER) => {

  const updateGoalSelection = (id: string) => {
    setMarkets(prev =>
      prev.map(m =>
        m.id === selectedMarket.id
          ? {
              ...m,
              goals: m.goals?.map(goal => ({
                ...goal,
                select: goal.id === id,
              })),
            }
          : m
      )
    );
    setGoalDD(false)
  };

  return (
    <View className={`px-8 bg-pry-light py-2 ${flex}`}>
      <ThemedText className="text-lg w-[48%] font-medium mb-2">Matches</ThemedText>

      <View className={`${flex} justify-around w-[48%]`}>
        <View className="relative">
          <Pressable
            className={`${flex} justify-center gap-1`}
            onPress={() => setGoalDD(!goalDD)}
          >
            <ThemedText className="text-center">Goals</ThemedText>
            <FontAwesome6 name="angle-down" color={"white"} size={12} />
          </Pressable>

          {/* DROPDOWN */}
          {goalDD && (
            <Pressable
              // Prevent closing when clicking inside dropdown
              onStartShouldSetResponder={() => true}
              className="absolute bg-light-blue gap-1 z-10 top-full left-0 w-[150%] rounded-lg p-2 px-3 mt-1"
            >
              {selectedMarket.goals?.map(goal => (
                <Pressable
                  key={goal.id}
                  onPress={() => updateGoalSelection(goal.id)}
                  className="mb-2 flex-row justify-between items-center"
                >
                  <ThemedText className="text-left !text-black">
                    {goal.init}
                  </ThemedText>

                  {goal.select ? (
                    <FontAwesome6 name="check" color={"gold"} size={12} />
                  ) : null}
                </Pressable>
              ))}
            </Pressable>
          )}
        </View>

        <ThemedText className="text-center">Over</ThemedText>
        <ThemedText className="text-center">Under</ThemedText>
      </View>
    </View>
  );
};

const OverUnder = ({selectGame, checkSelected, match}: OVERUNDER) => {
  return (
    <View className={`${flex} justify-around w-full`}>
      <Pressable onPress={()=> selectGame({id: match.id, option: "Home"})} className={`${checkSelected(match.selected, "Home") ? "bg-sec" : "bg-cus-purple"} w-[45%] px-3 py-3 rounded-xl`}>
        <ThemedText className={` text-center ${checkSelected(match.selected, "Home") ? "!text-white" : "!text-black"} text-sm`}>{match.homeOdds}</ThemedText>
      </Pressable>
      <Pressable onPress={()=> selectGame({id: match.id, option: "Draw" })} className={`${checkSelected(match.selected, "Draw")  ? "bg-sec" : "bg-cus-purple"} w-[45%] px-3 py-3 rounded-xl`}>
        <ThemedText className={` text-center ${checkSelected(match.selected, "Draw") ?  "!text-white" : "!text-black"} text-sm`}>{match.drawOdds}</ThemedText>
      </Pressable>
    </View>
  )
}