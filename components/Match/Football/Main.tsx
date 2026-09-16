import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoalsMarket, MainMarkets, Odd } from '@/constants/options' 
import OptionInfo from '@/assets/SVGs/match/OptionInfo';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useMatchMarkets } from '@/hooks';
import { DoubleChanceMarketOutcome, FirstHalfWinnerOutcome, HandicapOutcome, Market, Match, MatchWinnerOutcome, OverUnderOutcome, TeamTotalOutcome } from '@/hooks/matchInterface/matchInterface';
import { BetOption, useSport } from '@/store/useStore';


interface MainProps {
  id: string;
  option: MainMarkets | GoalsMarket
}

export interface OptionProps {
  market: Market;
  selectGame: (
    matchId: string,
    option: BetOption,
    betType: string
   ) => void;
  id: string
  isSelected: ( matchId: string,
  betType: string,
  option: string) =>  boolean;
}
const Main = ({ id, option }: MainProps) => {
  const { data } = useMatchMarkets(id).data || { data: [] };

  return (
    <View>
      {data.map((value, index) => {

        // ONLY Team Total is treated differently
        if (value.betType === "TEAM_TOTAL") {
          const homeTeamTotal = value.outcomes.filter(
            (item) => item.prediction.team === "home"
          );

          const awayTeamTotal = value.outcomes.filter(
            (item) => item.prediction.team === "away"
          );

          return (
            <React.Fragment key={String(index)}>

              {/* TEAM TOTAL 1 */}
              <View className="my-2 p-3 bg-light-blue rounded-lg mx-6">
                <Card
                  title="TEAM_TOTAL_1"
                  value={{
                    ...value,
                    outcomes: homeTeamTotal,
                  }}
                  id={id}
                />
              </View>

              {/* TEAM TOTAL 2 */}
              <View className="my-2 p-3 bg-light-blue rounded-lg mx-6">
                <Card
                  title="TEAM_TOTAL_2"
                  value={{
                    ...value,
                    outcomes: awayTeamTotal,
                  }}
                  id={id}
                />
              </View>

            </React.Fragment>
          );
        }

        // EVERYTHING ELSE REMAINS EXACTLY THE SAME
        return (
          <View
            key={String(index)}
            className="my-2 p-3 bg-light-blue rounded-lg mx-6"
          >
            <Card
              title={value.betType}
              value={value}
              openTrayE={index === 0}
              id={id}
            />
          </View>
        );
      })}
    </View>
  );
};


export default Main


export const Card = ({title, value, openTrayE, id}: {title: string, value: Market, openTrayE?: boolean, id:string}) => {
  const [openTray, setOPenTray] = React.useState(openTrayE); 
  const { selectGame, selectedGames } = useSport()

  const isSelected = (
  matchId: string,
  betType: string,
  option: string
) => {
  return selectedGames.some(
    (game) =>
      game.matchId === matchId &&
      game.betType === betType &&
      game.option === option
  );
};

  const [more, setMore ] = React.useState(false)
  const headerText = (key: string) => {
    switch (key) {
    case 'MATCH_WINNER':
        return '1X2';
      case 'DOUBLE_CHANCE':
        return 'Double Chance';
      case 'HANDICAP':
        return 'Handicap';
      case 'OVER_UNDER':
        return 'Total Goals';
      case 'FIRST_HALF_OVER_UNDER':
        return 'First Half Total Goals';
      case 'FIRST_HALF_WINNER':
        return 'First Half 1X2';
      case 'TEAM_TOTAL':
        return 'Team Total Goals';
      case 'totalGoalsBands':
        return 'Total Goals Bands';
        case 'teamTotalGoals':
        return 'Team Total Goals';
      case 'firstTeamToScore':
        return 'First Team To Score';
      case 'exactGoals':
        return 'Exact Goals';
      case 'asianHandicapFullTime':
        return 'Asian Handicap Full Time';
      case 'asianHandicap1stHalf':
        return 'Asian Handicap 1st Half';
      case 'firstHalf1X2':
        return 'First Half 1X2';
      case 'secondHalf1X2':
        return 'Second Half 1X2';
      case 'firstHalfOverUnder':
        return 'First Half Over/Under';
      case 'secondHalfOverUnder':
        return 'Second Half Over/Under';
      case 'bttsAndOverUnder':
        return 'BTTS and Over/Under';
      case 'doubleChanceAndBTTS':
        return 'Double Chance and BTTS';
      case 'cleanSheet':
        return 'Clean Sheet';
      case 'scoreInBothHalves':
        return 'Score In Both Halves';
      case 'toWinEitherHalf':
        return 'To Win Either Half';
      case 'anytimeGoalscorer':
        return 'Anytime Goalscorer';
      case 'firstGoalscorer':
        return 'First Goalscorer';
      case 'lastGoalscorer':
        return 'Last Goalscorer'; 
      case "TEAM_TOTAL_1":
         return "Team Total 1";
    case "TEAM_TOTAL_2":
      return "Team Total 2";
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };
  return (
    <>
      <View className='flex-row justify-between'>
        <View className='flex-row items-center gap-2'>
          <ThemedText className='!text-black font-bold text-lg'>{headerText(title)}</ThemedText>
          <Pressable onPress={()=> setMore(!more)}>
            <OptionInfo/>
          </Pressable>
      </View>
      <Pressable onPress={()=> setOPenTray(!openTray)} className='p-2'>
        {openTray ? 
        <FontAwesome6 name="angle-up" size={16} color="black" />
        :<FontAwesome6 name="angle-down" size={16} color="black" />
        }
      </Pressable>
      </View>
       {openTray &&
        <View className='mt-3'>
        <OptionInterface market={value}  selectGame={selectGame} id={id} isSelected={isSelected}/>
        </View>
        }
      </> 
       
)}

  


export const OptionInterface = ({
  market,
  selectGame,
  id,
  isSelected,
}: OptionProps) => {

  switch (market.betType) {
    case "MATCH_WINNER": {
      const order = {
        home: 0,
        draw: 1,
        away: 2,
      };

      return (
        <View className="flex-row items-center justify-between">
          {[...market.outcomes]
            .sort(
              (a, b) =>
                order[a.prediction.winner] -
                order[b.prediction.winner]
            )
            .map((subValue, index) => {
              return(
              <View
                key={index}
                className={`${isSelected(id,market.betType, subValue.prediction.winner) ? "bg-sec" : "bg-purple-200"} flex-row justify-between p-2 rounded-lg items-center w-[32%] gap-3 my-2`}
              >
                <ThemedText className="!text-black font-bold text-center capitalize">
                  {subValue.prediction.winner}
                </ThemedText>

                <Pressable onPress={()=> selectGame(id,subValue.prediction.winner, market.betType)} className="!text-black w-[65%] text-center py-2 px-4">
                 <ThemedText className="!text-black">
                   {subValue.price.toFixed(2)}
                  </ThemedText>
                </Pressable>
              </View>
            )})
          }
        </View>
      );
    }
    case "DOUBLE_CHANCE":
      const order = {
        home_draw: 0,
        home_away: 1,
        away_draw: 2,
      };

      return (
        <View className="flex-row items-center justify-between">
          {[...market.outcomes]
            .sort(
              (a, b) =>
                order[a.prediction.outcome] -
                order[b.prediction.outcome]
            )
            .map((subValue, index) => (
              <View
                key={index}
                className={`${isSelected(id,market.betType, subValue.prediction.outcome) ? "bg-sec" : "bg-purple-200"} flex-row justify-between p-2 bg-purple-200 rounded-lg items-center w-[32%] gap-3 my-2`}
              >
                <ThemedText className="!text-black font-bold  text-center capitalize">
                  {subValue.prediction.outcome === "home_draw"
                    ? "1X"
                    : subValue.prediction.outcome === "home_away"
                    ? "12"
                    : "2X"}
                </ThemedText>

                <Pressable onPress={()=> selectGame(id,subValue.prediction.outcome, market.betType)} className="!text-black w-[65%] text-center py-2 px-4">
                 <ThemedText className="!text-black">
                    {subValue.price.toFixed(2)}
                  </ThemedText>
                </Pressable>
              </View>
            ))}
        </View>
      );

    case "OVER_UNDER": {
      const grouped = market.outcomes.reduce(
        (acc, item) => {
          const line = item.prediction.line;

          if (!acc[line]) {
            acc[line] = {};
          }

          acc[line][item.prediction.type] = item;

          return acc;
        },
        {} as Record<
          number,
          {
            over?: (typeof market.outcomes)[number];
            under?: (typeof market.outcomes)[number];
          }
        >
      );

      return (
        <View>
          {Object.entries(grouped).map(
            ([line, values]) => (
              <View
                key={line}
                className={`flex-row items-center justify-between my-2`}
              >
                <ThemedText className="!text-black font-bold w-[15%]">
                  {line}
                </ThemedText>

                <View className="flex-row gap-5 items-center justify-between">
                  <ThemedText className="!text-black">
                    Over
                  </ThemedText>

                  <Pressable onPress={()=> selectGame(id, `over ${String(values?.over?.prediction.line!)}`, market.betType)} 
                  className={`${isSelected(id,market.betType, `over ${line}`) ? "bg-sec" : "bg-purple-200"} rounded-md text-center p-3 px-6 !text-black`}>
                   <ThemedText className="!text-black">
                     {values.over?.price.toFixed(2)}
                    </ThemedText>
                  </Pressable>
                </View>

                <View className="flex-row gap-5 items-center justify-between">
                  <ThemedText className="!text-black">
                    Under
                  </ThemedText>

                  <Pressable onPress={()=> selectGame(id, `under ${String(values?.over?.prediction.line!)}` , market.betType)} 
                  className={`${isSelected(id,market.betType, `under ${line}`) ? "bg-sec" : "bg-purple-200"} rounded-md text-center p-3 px-6 !text-black`}
                  >
                   <ThemedText className="!text-black">
                     {values.under?.price.toFixed(2)}
                    </ThemedText>
                  </Pressable>
                </View>
              </View>
            )
          )}
        </View> );
    }
//     case "FIRST_HALF_OVER_UNDER":

//        const grouped = market.outcomes.reduce(
//         (acc, item) => {
//           const line = item.prediction.line;

//           if (!acc[line]) {
//             acc[line] = {};
//           }

//           acc[line][item.prediction.type] = item;

//           return acc;
//         },
//         {} as Record<
//           number,
//           {
//             over?: (typeof market.outcomes)[number];
//             under?: (typeof market.outcomes)[number];
//           }
//         >
//       );

//       return (
//         <View>
//           {Object.entries(grouped).map(
//             ([line, values]) => (
//               <View
//                 key={line}
//                 className="flex-row items-center justify-between my-2"
//               >
//                 <ThemedText className="!text-black font-bold w-[15%]">
//                   {line}
//                 </ThemedText>

//                 <View className="flex-row gap-5 items-center justify-between">
//                   <ThemedText className="!text-black">
//                     Over
//                   </ThemedText>

//                   <Pressable onPress={()=> selectGame(id,subValue.prediction.winner)} className="bg-purple-200 rounded-md text-center p-3 px-6 !text-black">
//                    <ThemedText className="!text-black">
//                      {values.over?.price.toFixed(2)}
//                     </ThemedText>
//                   </Pressable>
//                 </View>

//                 <View className="flex-row gap-5 items-center justify-between">
//                   <ThemedText className="!text-black">
//                     Under
//                   </ThemedText>

//                   <Pressable onPress={()=> selectGame(id,subValue.prediction.winner)} className="bg-purple-200 rounded-md text-center p-3 px-6 !text-black">
//                    <ThemedText className="!text-black">
//                      {values.under?.price.toFixed(2)}
//                     </ThemedText>
//                   </Pressable>
//                 </View>
//               </View>
//             )
//           )}
//         </View>
//       );

//     case "TEAM_TOTAL": {
//       const grouped = market.outcomes.reduce(
//         (acc, item) => {
//           const line = item.prediction.line;

//           if (!acc[line]) {
//             acc[line] = {};
//           }

//           acc[line][item.prediction.type] = item;

//           return acc;
//         },
//         {} as Record<
//           number,
//           {
//             over?: (typeof market.outcomes)[number];
//             under?: (typeof market.outcomes)[number];
//           }
//         >
//       );

//       return (
//         <View>
//           {Object.entries(grouped).map(([line, values]) => (
//             <View
//               key={line}
//               className="flex-row items-center justify-between my-2"
//             >
//               {/* TOTAL GOAL */}
//               <ThemedText className="!text-black font-bold w-[15%]">
//                 {line}
//               </ThemedText>

//               {/* OVER */}
//               <View className="flex-row items-center gap-3 w-[40%]">
//                 <ThemedText className="!text-black">
//                   Over
//                 </ThemedText>

//                 <Pressable onPress={()=> selectGame(id,subValue.prediction.winner)} className="bg-purple-200 rounded-md text-center py-3 px-5 !text-black flex-1">
//                  <ThemedText className="!text-black">
//                    {values.over?.price.toFixed(2) ?? "-"}
//                   </ThemedText>
//                 </Pressable>
//               </View>

//               {/* UNDER */}
//               <View className="flex-row items-center gap-3 w-[40%]">
//                 <ThemedText className="!text-black">
//                   Under
//                 </ThemedText>

//                 <ThemedText className="bg-purple-200 rounded-md text-center py-3 px-5 !text-black flex-1">
//                   {values.under?.price.toFixed(2) ?? "-"}
//                 </ThemedText>
//               </View>
//             </View>
//           ))}
//         </View>
//       );
//     }

//     case "HANDICAP": {
//       const home = market.outcomes.find(
//         (item) => item.prediction.team === "home"
//       );

//       const away = market.outcomes.find(
//         (item) => item.prediction.team === "away"
//       );

//   return (
//     <View className="flex-row items-center justify-between">

//       {home && (
//         <View className="flex-row items-center w-[48%] gap-3 my-2">
//           <ThemedText className="!text-black font-bold">
//             Home {home.prediction.line}
//           </ThemedText>

//           <ThemedText className="!text-black bg-purple-200 rounded-lg text-center py-2 px-4">
//             {home.price.toFixed(2)}
//           </ThemedText>
//         </View>
//       )}

//       {/* AWAY - RIGHT */}
//       {away && (
//         <View className="flex-row items-center justify-end w-[48%] gap-3 my-2">
//           <ThemedText className="!text-black font-bold">
//             Away {away.prediction.line > 0 ? "+" : ""}
//             {away.prediction.line}
//           </ThemedText>

//           <Pressable onPress={()=> selectGame(id,subValue.prediction.winner)} className="!text-black bg-purple-200 rounded-lg text-center py-2 px-4">
//            <ThemedText className="!text-black">
//              {away.price.toFixed(2)}
//             </ThemedText>
//             </Pressable>
//         </View>
//       )}

//     </View>
//   );
// }

//     case "FIRST_HALF_WINNER": {
//      const order = {
//         home: 0,
//         draw: 1,
//         away: 2,
//       };

//       return (
//         <View className="flex-row items-center justify-between">
//           {[...market.outcomes]
//             .sort(
//               (a, b) =>
//                 order[a.prediction.winner] -
//                 order[b.prediction.winner]
//             )
//             .map((subValue, index) => (
//               <View
//                 key={index}
//                 className="flex-row justify-between p-2 bg-purple-200 rounded-lg items-center w-[32%] gap-3 my-2"
//               >
//                 <Pressable onPress={()=> selectGame(id,subValue.prediction.winner)} className="!text-black font-bold text-center capitalize">
//                  <ThemedText className="!text-black">
//                    {subValue.prediction.winner}
//                   </ThemedText>
//                 </Pressable>

//                 <Pressable onPress={()=> selectGame(id,subValue.prediction.winner)} className="!text-black w-[65%] text-center py-2 px-4">
//                  <ThemedText className="!text-black">
//                    {subValue.price.toFixed(2)}
//                   </ThemedText>
//                 </Pressable>
//               </View>
//             ))}
//         </View>
//       );
//     }
    default:
      return null;
  }
};

// const OddsDisplay = ({value, id, market}) => {
//   const {selectedGames, selectGame } = useSport()
//   return (
//      <View
//       className={`flex-row justify-between p-2 bg-purple-200 rounded-lg items-center w-[32%] gap-3 my-2`}
//     >
//       <ThemedText className="!text-black font-bold  text-center capitalize">
//         {value.prediction.outcome === "home_draw"
//           ? "1X"
//           : value.prediction.outcome === "home_away"
//           ? "12"
//           : "2X"}
//       </ThemedText>

//       <Pressable onPress={()=> selectGame(id,value.prediction.outcome, market.betType)} className="!text-black w-[65%] text-center py-2 px-4">
//         <ThemedText className="!text-black">
//           {value.price.toFixed(2)}
//         </ThemedText>
//       </Pressable>
//     </View>
//   )
// }