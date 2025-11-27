import { Match } from '@/constants/dataOne';
import { MatchProps, MatchPropsBetslip } from '@/interface'
import { useSport } from '@/store/useSports';
import useBetslip from '@/store/useStore'
import { Text, TouchableOpacity, View } from 'react-native'

interface PopularProps {
  data: Match
}


export const PopularHeader = ({ isSticky = false }: { isSticky?: boolean }) => {
  return (
    <View
      className={`px-5  ${
        isSticky ? 'bg-pry-fade pt-16 font-semibold border-b-2 border-white' : ' pt-5'
      }`} 
      style={{
        zIndex: 10, 
      }}
    >
      <View className="flex-row items-center justify-between mb-4 pr-5">
        <Text className="text-3xl text-white">Popular</Text>
        <View className="flex-row items-center justify-between w-5/12">
          <Text className="text-2xl text-white text-center ">1</Text>
          <Text className="text-2xl text-white text-center ">x</Text>
          <Text className="text-2xl text-white text-center ">2</Text>
        </View>
      </View>
    </View>
  );
};


export const MatchCard = ({ data }: PopularProps) => {
  const { selectGame } = useSport();
  const game = data

  const isHomeSelected = data.selected.some((e)=>e.option.includes("Home"));
  const isDrawSelected  = data?.selected?.some((e)=>e.option.includes("Draw"));
  const isAwaySelected = data?.selected?.some((e)=>e.option.includes("Away"));

  console.log(data?.selected)

  return (
    <View className="px-5 pt-2">
      <View className="bg-[#E3F2FD] flex-row justify-between items-center p-3 mb-5 rounded-lg h-[95px]">

        {/* TEAMS */}
        <View className="gap-5 w-6/12">
          <View className="flex-row items-center gap-3">
            <View className="w-3 h-3 rounded-full bg-slate-500" />
            <Text className="text-lg capitalize 2xl">{game.home}</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="w-3 h-3 rounded-full bg-slate-500" />
            <Text className="text-lg capitalize 2xl">{game.away}</Text>
          </View>
        </View>

        {/* ODDS BUTTONS */}
        <View className="flex-row items-center justify-between gap-2 w-6/12">

          {/* HOME */}
          <TouchableOpacity
            onPress={() => selectGame({ id: game.id, option: "Home" })}
            className={`${isHomeSelected ? "bg-sec" : "bg-[#ABB2FA]"} rounded-md px-1`}
          >
            <Text className="text-lg text-black p-2 text-center w-full">
              {game?.odds?.home}
            </Text>
          </TouchableOpacity>

          {/* DRAW */}
          <TouchableOpacity
            onPress={() => selectGame({ id: game.id, option: "Draw" })}
            className={`${isDrawSelected ? "bg-sec" : "bg-[#ABB2FA]"} rounded-md px-1`}
          >
            <Text className="text-lg text-black p-2 text-center w-full">
              {game?.odds?.draw}
            </Text>
          </TouchableOpacity>

          {/* AWAY */}
          <TouchableOpacity
            onPress={() => selectGame({ id: game.id, option: "Away" })}
            className={`${isAwaySelected ? "bg-sec" : "bg-[#ABB2FA]"} rounded-md px-1`}
          >
            <Text className="text-lg text-black p-2 text-center w-full">
              {game?.odds?.away}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};
