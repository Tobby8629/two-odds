
import { Match } from '@/hooks/matchInterface/matchInterface';
import { MatchProps, MatchPropsBetslip } from '@/interface'
import { useSport } from '@/store/useStore';
import { router } from 'expo-router';
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface PopularProps {
  data: Match
}



export const PopularHeader = ({
  isSticky = false,
  sport,
}: {
  isSticky?: boolean;
  sport: string;
}) => {

  const isTwoWaySport = sport === "football"; 

  // const odds = isTwoWaySport ? ["1", "2"] : ["1", "X", "2"];

  const odds = ["1", "X", "2"];

  return (
    <View
      className={`px-5 ${
        isSticky
          ? "bg-pry-fade pt-16 font-semibold border-b-2 border-white"
          : "pt-5"
      }`}
      style={{ zIndex: 10 }}
    >
      <View className="flex-row items-center justify-between mb-4 pr-5">
        <Text className="text-3xl text-white">Popular</Text>

        <View className={`flex-row items-center justify-between ${isTwoWaySport ? "w-3/12" :" w-5/12"}`}>
          {odds.map((o, i) => (
            <Text
              key={i}
              className="text-2xl text-white !text-center"
            >
              {o}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};



export const MatchCard = ({ data }: PopularProps) => {

  type type = "home" | "away" | "draw";
  const { selectGame, selectedGames } = useSport();
  const game = data;

  const matchWinner = game.markets.find((e)=> e.betType === "MATCH_WINNER")

  const getOddsValue = (type: type) => {
    return type === "home"
      ? matchWinner?.outcomes.find((e)=>e.prediction.winner === "home")
      : type === "draw"
      ? matchWinner?.outcomes.find((e)=>e.prediction.winner === "draw")
      : matchWinner?.outcomes.find((e)=>e.prediction.winner === "away");
  }
  

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
  const navigateMatchDetails = (id: string) => {
    router.push(`/(match)/${id}`);
  };

  // Check if sport supports 3-way odds
  const isThreeWay = true
  // Change the condition to whatever matches your data model


  return (
    <View className="px-5 pt-2">
      <Pressable onPress={() => navigateMatchDetails(data.id)} 
      className="bg-[#E3F2FD] flex-row justify-between items-center p-3 mb-5 rounded-lg h-[95px]">
        
        {/* TEAMS */}
        <View className="gap-5 w-6/12">
          <View className="flex-row items-center gap-3">
            <View className="w-3 h-3 rounded-full bg-slate-500" />
            <Text className="text-lg capitalize">{game.homeTeam}</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="w-3 h-3 rounded-full bg-slate-500" />
            <Text className="text-lg capitalize">{game.awayTeam}</Text>
          </View>
        </View>

        {/* ODDS BUTTONS */}
        <View className={`flex-row items-center justify-between gap-2 ${isThreeWay ? " w-6/12" : "" }`}>

          {/* HOME */}
          <TouchableOpacity
            onPress={() => selectGame( game.id,"home","MATCH_WINNER" )}
            className={`${isSelected(game.id, "MATCH_WINNER", "home") ? "bg-sec" : "bg-[#ABB2FA]"} rounded-md px-1`}
          >
            <Text className="text-lg text-black p-2 text-center">
              {getOddsValue("home")?.price?.toFixed(2)}
            </Text>
          </TouchableOpacity>


          {/* DRAW — only for 3-way sports */}
          {isThreeWay && (
            <TouchableOpacity
              onPress={() => selectGame(game.id, "draw", "MATCH_WINNER")}
              className={`${isSelected(game.id, "MATCH_WINNER", "draw") ? "bg-sec" : "bg-[#ABB2FA]"}  rounded-md px-1`}
            >
              <Text className="text-lg text-black p-2 text-center">
                {getOddsValue("draw")?.price?.toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}

          {/* AWAY */}
          <TouchableOpacity
            onPress={() => selectGame( game.id,"away","MATCH_WINNER")}
            className={`${isSelected(game.id, "MATCH_WINNER", "away") ? "bg-sec" : "bg-[#ABB2FA]"}  rounded-md px-1`}
          >
            <Text className="text-lg text-black p-2 text-center">
              {getOddsValue("away")?.price?.toFixed(2)}
            </Text>
          </TouchableOpacity>

        </View>
      </Pressable>
    </View>
  );
};

