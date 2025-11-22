import {
  FlatList,
  TouchableWithoutFeedback,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useStore } from "zustand";
import useBetslip from "@/store/useStore";
import { BettingMarket, CombinedItem } from "@/interface";

import MarketTabs from "./MarketTab";
import HeaderRow from "./HeaderRow";
import MatchCard from "./MatchCard";

const Football = () => {
  const [goalDD, setGoalDD] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const { match, selectGame } = useBetslip();
  const combined: CombinedItem[] = ["header", ...match];

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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsSticky(e.nativeEvent.contentOffset.y > 500);
  };

  const selectMarket = useCallback((id: number) => {
    setMarkets((prev) =>
      prev.map((m) => ({
        ...m,
        selected: m.id === id,
      }))
    );
  }, []);

  const selectedMarket = markets.find((m) => m.selected);

  return (
    <TouchableWithoutFeedback onPress={() => setGoalDD(false)}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={combined}
          keyExtractor={(item) =>
            item === "header" ? "header" : item.id.toString()
          }
          scrollEventThrottle={16}
          onScroll={handleScroll}
          stickyHeaderIndices={[1]}
          ListHeaderComponent={
            <MarketTabs markets={markets} selectMarket={selectMarket} />
          }
          renderItem={({ item }) =>
            item === "header" ? (
              <HeaderRow
                selectedMarket={selectedMarket}
                setMarkets={setMarkets}
                goalDD={goalDD}
                setGoalDD={setGoalDD}
              />
            ) : (
              <MatchCard
                match={item}
                selectedMarket={selectedMarket}
                selectGame={selectGame}
              />
            )
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Football;
