import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { flex, flexNoJustify } from '@/constants/style'
import GoldX from '@/assets/SVGs/icons/GoldX'
import Ball from '@/assets/SVGs/sport/ball'
import { ThemedText } from '../ThemedText'
import { BetOption, useSport } from '@/store/useStore'
import { betSlipOptionSwitches } from '@/services/caseSwitches'
import { useMatchDetails, useMatchMarkets } from '@/hooks'
import { OptionProps } from '../Match/Football/Main'
import { MARKET } from '@/interface'
import { Market } from '@/hooks/matchInterface/matchInterface'


const MatchCard = () => {
  const { selectedGames, removeMatch } = useSport();
  console.log(selectedGames)

  return (
    <ScrollView className="p-7">
      {selectedGames.map((e) => (
        <View key={e.id} className={`${flex} mb-5`}>
          <View className={`${flexNoJustify} gap-3 min-w-[80%]`}>
            
            <Pressable onPress={() => removeMatch(e.id)}>
              <GoldX />
            </Pressable>

            <View className="gap-2">
              
              {/* OPTION */}
              <View className={`${flexNoJustify} gap-2`}>
                <Ball />

                <ThemedText className="!text-white capitalize" style={{ fontSize: 21 }}>
                  {betSlipOptionSwitches(e.option)}
                </ThemedText>
              </View>

              {/* MATCH */}
              <MatchTeams matchId={e.matchId} />
              <ThemedText className='!text-white'>{e.odd.toFixed(2)}</ThemedText>
              
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default MatchCard;



const MatchTeams = ({ matchId }: { matchId: string }) => {
  const { data, isLoading } = useMatchDetails(matchId);

  if (isLoading) {
    return (
      <ThemedText className="font-base text-lg">
        Loading...
      </ThemedText>
    );
  }

  const match = data?.data;

  /* Figma: "20 June 2025 (12:30)", 12 white, under the teams. */
  const kickoff = match?.startTime ? new Date(match.startTime) : null;
  const dateLine =
    kickoff && !Number.isNaN(kickoff.getTime())
      ? `${kickoff.getDate()} ${kickoff.toLocaleString('en-GB', { month: 'long' })} ${kickoff.getFullYear()} (${kickoff.toTimeString().slice(0, 5)})`
      : '';

  return (
    <View>
    <View className={`${flexNoJustify} gap-1 w-full`}>
      <ThemedText className="font-base text-lg">
        {match?.homeTeam}
      </ThemedText>

      <ThemedText className="font-base text-lg">
        -
      </ThemedText>

      <ThemedText className="font-base text-lg">
        {match?.awayTeam}
      </ThemedText>
    </View>
    {dateLine ? <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 2 }}>{dateLine}</Text> : null}
    </View>
  );
};








// interface oddProps {
//   id:string,
//   betType: string,
//   option: BetOption
// }

// const MatchCard = () => {
//   const { selectedGames, removeMatch } = useSport();

//   return (
//     <ScrollView className="p-7">
//       {selectedGames.map((e) => (
//         <View key={e.id} className={`${flex} mb-5`}>
//           <View className={`${flexNoJustify} gap-3 min-w-[80%]`}>
            
//             <Pressable onPress={() => removeMatch(e.id)}>
//               <GoldX />
//             </Pressable>

//             <View className="gap-2">
              
//               {/* OPTION */}
//               <View className={`${flexNoJustify} gap-2`}>
//                 <Ball />

//                 <ThemedText className="font-semibold !text-white text-2xl capitalize">
//                   {betSlipOptionSwitches(e.option)}
//                 </ThemedText>
//               </View>

//               {/* MATCH */}
//               <MatchTeams matchId={e.matchId} />
//               <Odds id={e.matchId} option={e.option} betType={e.betType}/>
//             </View>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default MatchCard;



// const MatchTeams = ({ matchId }: { matchId: string }) => {
//   const { data, isLoading } = useMatchDetails(matchId);

//   if (isLoading) {
//     return (
//       <ThemedText className="font-base text-lg">
//         Loading...
//       </ThemedText>
//     );
//   }

//   const match = data?.data;

//   return (
//     <View className={`${flexNoJustify} gap-1 w-full`}>
//       <ThemedText className="font-base text-lg">
//         {match?.homeTeam}
//       </ThemedText>

//       <ThemedText className="font-base text-lg">
//         -
//       </ThemedText>

//       <ThemedText className="font-base text-lg">
//         {match?.awayTeam}
//       </ThemedText>
//     </View>
//   );
// };


// const Odds = ({ id, betType, option }: oddProps) => {
//   const { isLoading, data } = useMatchMarkets(id);

//   const market = data?.data.find(
//     (e) => e.betType === betType
//   );


//   if (isLoading) {
//     return (
//       <ThemedText className="font-base text-lg">
//         Loading...
//       </ThemedText>
//     );
//   }

//   if (!market) {
//     return <ThemedText>*****</ThemedText>;
//   }

//   const odd = checkOutcomeOdds(market, option);

//   return (
//     <ThemedText>
//       {odd !== undefined ? odd.toFixed(2) : "-"}
//     </ThemedText>
//   );
// };

// export const checkOutcomeOdds = (
//   data: Market,
//   option: BetOption
// ) => {
//   switch (data.betType) {

//     // MATCH WINNER
//     case "MATCH_WINNER": {
//       const odd = data.outcomes.find(
//         (e) => e.prediction.winner === option
//       );

//       return odd?.price;
//     }

//     // DOUBLE CHANCE
//     case "DOUBLE_CHANCE": {
//       const odd = data.outcomes.find(
//         (e) => e.prediction.outcome === option
//       );

//       return odd?.price;
//     }

//     // OVER / UNDER
//     case "OVER_UNDER": {
//       const odd = data.outcomes.find(
//         (e) =>
//           `${e.prediction.type} ${e.prediction.line}` === option
//       );

//       return odd?.price;
//     }

//     // FIRST HALF OVER / UNDER
//     case "FIRST_HALF_OVER_UNDER": {
//       const odd = data.outcomes.find(
//         (e) =>
//           `${e.prediction.type} ${e.prediction.line}` === option
//       );

//       return odd?.price;
//     }

//     // TEAM TOTAL
//     case "TEAM_TOTAL": {
//       const odd = data.outcomes.find(
//         (e) =>
//           `${e.prediction.team} ${e.prediction.type} ${e.prediction.line}` ===
//           option
//       );

//       return odd?.price;
//     }

//     // HANDICAP
//     case "HANDICAP": {
//       const odd = data.outcomes.find(
//         (e) =>
//           `${e.prediction.team} ${e.prediction.line}` === option
//       );

//       return odd?.price;
//     }

//     // FIRST HALF WINNER
//     case "FIRST_HALF_WINNER": {
//       const odd = data.outcomes.find(
//         (e) => e.prediction.winner === option
//       );

//       return odd?.price;
//     }

//     default:
//       return undefined;
//   }
// };
