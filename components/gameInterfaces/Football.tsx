// import {
//   FlatList,
//   TouchableWithoutFeedback,
//   View,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
// } from "react-native";
// import React, { useCallback, useState } from "react";
// import useBetslip from "@/store/useStore";
// import { BettingMarket, CombinedItem, CombiSportItem } from "@/interface";
// import MarketTabs from "./Reuseables/MarketTab";
// import HeaderRow from "./Reuseables/HeaderRow";
// import MatchCard from "./Reuseables/MatchCard";
// // import { Match } from "@/constants/dataOne";
// import { useSport } from "@/store/useSports";
// import { Match } from "@/hooks/matchInterface/matchInterface";



// interface FootballProps {
//   matches: Match[];
//   markets: BettingMarket[];
//   setMarkets: React.Dispatch<React.SetStateAction<BettingMarket[]>>;
// }

// const Football = ({matches, markets, setMarkets}: FootballProps) => {
//   const [goalDD, setGoalDD] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);
//   const {selectGame}   = useSport()
  
//   const combined: CombiSportItem[] = ["header", ...matches];

//   const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     setIsSticky(e.nativeEvent.contentOffset.y > 500);
//   };

//   const selectMarket = useCallback((id: number) => {
//     setMarkets((prev) =>
//       prev.map((m) => ({
//         ...m,
//         selected: m.id === id,
//       }))
//     );
//   }, []);

//   const selectedMarket = markets.find((m) => m.selected);

//   return (
//     <TouchableWithoutFeedback onPress={() => setGoalDD(false)}>
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={combined}
//           keyExtractor={(item) =>
//             item === "header" ? "header" : item.id.toString()
//           }
//           scrollEventThrottle={16}
//           onScroll={handleScroll}
//           stickyHeaderIndices={[1]}
//           ListHeaderComponent={
//             <MarketTabs markets={markets} selectMarket={selectMarket} />
//           }
//           renderItem={({ item }) =>
//             item === "header" ? (
//               <HeaderRow
//                 selectedMarket={selectedMarket}
//                 setMarkets={setMarkets}
//                 goalDD={goalDD}
//                 setGoalDD={setGoalDD}
//               />
//             ) : (
//               <MatchCard
//                 match={item}
//                 selectedMarket={selectedMarket}
//                 generalGoal="wait..."
//               />
//             )
//           }
//         />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default Football;

import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  FlatList,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import {
  BettingMarket,
  CombiSportItem,
} from "@/interface";

import { Match } from "@/hooks/matchInterface/matchInterface";

import MarketTabs from "./Reuseables/MarketTab";
import HeaderRow from "./Reuseables/HeaderRow";
import MatchCard from "./Reuseables/MatchCard";

interface FootballProps {
  matches: Match[];

  markets: BettingMarket[];

  setMarkets: React.Dispatch<
    React.SetStateAction<BettingMarket[]>
  >;
}

const Football = ({
  matches,
  markets,
  setMarkets,
}: FootballProps) => {
  const [goalDD, setGoalDD] = useState(false);

  const combined = useMemo<CombiSportItem[]>(
    () => ["header", ...matches],
    [matches]
  );

  const selectedMarket = useMemo(
    () =>
      markets.find(
        (market) => market.selected
      ),
    [markets]
  );

  const selectMarket = useCallback(
    (id: number) => {
      setMarkets((prev) =>
        prev.map((market) => ({
          ...market,
          selected: market.id === id,
        }))
      );
    },
    [setMarkets]
  );

  const closeGoalDropdown = useCallback(() => {
    setGoalDD(false);
  }, []);
  

  return (
    // <TouchableWithoutFeedback
    //   onPress={closeGoalDropdown}
    // >
      <View className="flex-1">
        <FlatList
          data={combined}
          keyExtractor={(item) =>
            item === "header"
              ? "header"
              : String(item.id)
          }
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          keyboardShouldPersistTaps="handled"

          ListHeaderComponent={
            <MarketTabs
              markets={markets}
              selectMarket={selectMarket}
            />
          }

          renderItem={({ item }) => {
            if (item === "header") {
              return (
                <HeaderRow
                  selectedMarket={selectedMarket}
                  setMarkets={setMarkets}
                  goalDD={goalDD}
                  setGoalDD={setGoalDD}
                />
              );
            }

            return (
              <MatchCard
                match={item}
                selectedMarket={selectedMarket}
                generalGoal="wait..."
              />
            );
          }}
        />
      </View>
    // </TouchableWithoutFeedback>
  );
};

export default Football;