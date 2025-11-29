import { Match } from '@/constants/dataOne';
import { MatchProps, MatchPropsBetslip } from '@/interface'
import { useSport } from '@/store/useSports';
import useBetslip from '@/store/useStore'
import { Text, TouchableOpacity, View } from 'react-native'

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

  const isTwoWaySport = sport !== "football"; 

  const odds = isTwoWaySport ? ["1", "2"] : ["1", "X", "2"];

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
              className="text-2xl text-white text-left"
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
  const { selectGame, selectedsport, selectedGames } = useSport();
  const game = data;

  const Check = selectedGames.find((e)=>e.id === data.id)

  // Detect selected options
  // const isHomeSelected = data.selected.some((e) => e.option.includes("Home"));
  // const isDrawSelected = data.selected.some((e) => e.option.includes("Draw"));
  // const isAwaySelected = data.selected.some((e) => e.option.includes("Away"));

   const isHomeSelected = Check?.selected?.option?.includes("Home");
  const isDrawSelected = Check?.selected.option?.includes("Draw");
  const isAwaySelected = Check?.selected.ioption?.ncludes("Away");

  // Check if sport supports 3-way odds
  const isThreeWay = selectedsport === "football"; 
  // Change the condition to whatever matches your data model

  return (
    <View className="px-5 pt-2">
      <View className="bg-[#E3F2FD] flex-row justify-between items-center p-3 mb-5 rounded-lg h-[95px]">
        
        {/* TEAMS */}
        <View className="gap-5 w-6/12">
          <View className="flex-row items-center gap-3">
            <View className="w-3 h-3 rounded-full bg-slate-500" />
            <Text className="text-lg capitalize">{game.home}</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="w-3 h-3 rounded-full bg-slate-500" />
            <Text className="text-lg capitalize">{game.away}</Text>
          </View>
        </View>

        {/* ODDS BUTTONS */}
        <View className={`flex-row items-center justify-between gap-2 w-6/12 ${isThreeWay ? " w-5/12" : "w-4/12" }`}>

          {/* HOME */}
          <TouchableOpacity
            onPress={() => selectGame({ id: game.id, option: "Home" })}
            className={`${isHomeSelected ? "bg-sec" : "bg-[#ABB2FA]"} rounded-md px-1`}
          >
            <Text className="text-lg text-black p-2 text-center">
              {game?.odds?.home}
            </Text>
          </TouchableOpacity>


          {/* DRAW — only for 3-way sports */}
          {isThreeWay && (
            <TouchableOpacity
              onPress={() => selectGame({ id: game.id, option: "Draw" })}
              className={`${isDrawSelected ? "bg-sec" : "bg-[#ABB2FA]"} rounded-md px-1`}
            >
              <Text className="text-lg text-black p-2 text-center">
                {game?.odds?.draw}
              </Text>
            </TouchableOpacity>
          )}

          {/* AWAY */}
          <TouchableOpacity
            onPress={() => selectGame({ id: game.id, option: "Away" })}
            className={`${isAwaySelected ? "bg-sec" : "bg-[#ABB2FA]"} rounded-md px-1`}
          >
            <Text className="text-lg text-black p-2 text-center">
              {game?.odds?.away}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

