import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import ManUtd from '@/assets/SVGs/match/Manutd'
import HomeIcon from '@/assets/SVGs/match/Home';
import AwayIcon from '@/assets/SVGs/match/Away';
import { manUtdVsChelsea } from '@/constants/data';

interface MatchForm {
  opponent: string;      // full club name or short code
  init: string;          // club initials
  venue: "Home" | "Away";
  result: "W" | "L" | "D";
  score: string;
}


const Statistics = () => {
  const homeRate = 20
  const awayRate = 80

  const homeRecent: MatchForm[] = [
  {
    opponent: "Lorient",
    init: "LOR",
    venue: "Home",
    result: "W",
    score: "5:0",
  },
  {
    opponent: "Marseille",
    init: "MAR",
    venue: "Away",
    result: "L",
    score: "3:0",
  },
  {
    opponent: "Nantes",
    init: "NAN",
    venue: "Home",
    result: "W",
    score: "5:1",
  },
  {
    opponent: "Lille",
    init: "LIL",
    venue: "Away",
    result: "L",
    score: "2:1",
  },
  {
    opponent: "Le Havre",
    init: "HAC",
    venue: "Home",
    result: "W",
    score: "6:0",
  }
];

const awayRecent: MatchForm[] = [
  {
    opponent: "Strasbourg",
    init: "STR",
    venue: "Away",
    result: "L",
    score: "3:0",
  },
  {
    opponent: "Toulouse",
    init: "TOU",
    venue: "Home",
    result: "W",
    score: "5:0",
  },
  {
    opponent: "Auxerre",
    init: "AUX",
    venue: "Away",
    result: "D",
    score: "0:0",
  },
  {
    opponent: "Monaco",
    init: "MON",
    venue: "Home",
    result: "D",
    score: "2:2",
  },
  {
    opponent: "Lyon",
    init: "LYO",
    venue: "Away",
    result: "L",
    score: "4:0",
  },
]

  return (
    <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
    >
      <ThemedText className='!text-gray-600 text-center'>Statistics</ThemedText>
      <ThemedText className='bg-pry-light p-3 my-5 rounded-md text-center font-semibold'>H2H</ThemedText>

      <ThemedText className='!text-gray-600 text-center'>Win probability</ThemedText>
      <View>
        <View className='flex-row justify-between'>
          <View className='flex-row gap-1'>
            <ManUtd />
            <ThemedText className='!text-sec text-center font-sansitaBoldItalic'>{homeRate}%</ThemedText>
          </View>
          <View className='flex-row gap-1'>
            <ManUtd />
            <ThemedText className='!text-red-600 text-center font-sansitaBoldItalic'>{awayRate}%</ThemedText>
          </View>
        </View>
        <View className="relative w-full h-3 my-3 bg-red-500 rounded-lg overflow-hidden">
          {/* AFTER (overlay) */}
          <View className={`absolute left-0 top-0 h-full bg-yellow-400`}
          style={{ width: `${homeRate}%` }}
          />
        </View>

      </View>


      <ThemedText className='bg-pry-light p-3 my-3 rounded-md text-center font-semibold'>Team Form</ThemedText>
      <View className='flex-row justify-between items-center my-3'>
        <View className='flex-row gap-1'>
          <ManUtd />
          <ThemedText className='text-gray-600'>Manchester United</ThemedText>
        </View>
        <View className='flex-row gap-1'>
          <ManUtd />
          <ThemedText className='text-gray-600'>Chelsea</ThemedText>
        </View>
      </View>
      
      <View className='flex-row justify-between my-2'>
        <View className='flex-row gap-1'>
          <ThemedText className='!text-sec text-center font-sansitaBoldItalic'>{homeRate}%</ThemedText>
        </View>
        <View className='flex-row gap-1'>
          <ThemedText className='!text-red-600 text-center font-sansitaBoldItalic'>{awayRate}%</ThemedText>
        </View>
      </View>

       <View className='flex-row justify-between'>
        <HomeRecentMatches matches={homeRecent}/>
        <AwayRecentMatches matches={awayRecent} className='ml-auto' />
      </View>

      <View>
        <ThemedText className='bg-pry-light p-3 my-3 rounded-md text-center font-semibold'>Last Meetings</ThemedText>
        <View className='w-[95%] mx-auto flex'>
          {manUtdVsChelsea.map((match, idx)=>(
            <View key={match.matchday} className='my-3 w-ful'>
              <ThemedText className='!text-gray-600 text-center mb-3 text-xs' >{match.date} {match.matchday}</ThemedText>
              <View className='flex-row justify-betweeen my-2' >
                <ThemedText className='font-semibold !text-gray-600 w-[40%]'>{match.home.slice(0,10)}</ThemedText>
                <View className='flex-row gap-1 w-[20%] justify-center'>
                  <ThemedText className='!text-sec'>{match.homeScore}</ThemedText>
                  <ThemedText className='!text-sec'>:</ThemedText>
                  <ThemedText className='!text-sec'>{match.awayScore}</ThemedText>
                </View>
                <ThemedText className='font-semibold !text-gray-600 w-[40%] text-right '>{match.away.slice(0,10)}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Statistics

const styles = StyleSheet.create({})

const HomeRecentMatches = ({matches, className}: {matches: MatchForm[], className?: string}) => {
  const bgcolor = (result: "W" | "L" | "D") => {
    const color = result === "W" ? "bg-sec" :
    result === "L" ? "bg-[#D08700]" :
    "bg-[#875F17]"
    return color
  }
  return(
    <View className='w-[50%]'>
      {matches.map((match)=>(
        <View key={match.init} className={`my-2 flex-row items-center gap-3 w-[50%] ${className}`}>
          <View className='flex-row items-center gap-1 w-[65%]'>
            <ThemedText className={`${bgcolor(match.result)} w-4 h-4 text-center font-semibold text-xs`}>{match.result === "W" ? "W" : match.result === "L" ? "L" : "D"}</ThemedText>
            {match.venue === "Home" ? 
              <HomeIcon width={12} height={12} /> :
              <AwayIcon width={12} height={16}/>
             }
            <ThemedText className='!text-gray-600 text-xs'>{match.init}</ThemedText>
          </View>
          <ThemedText className='text-gray-600 w-[35%] text-xs text-left '>{match.score}</ThemedText>
        </View>
      ))}
    </View>
  )
}

const AwayRecentMatches = ({matches, className}: {matches: MatchForm[], className?: string}) => {
  const bgcolor = (result: "W" | "L" | "D") => {
    const color = result === "W" ? "bg-sec" :
    result === "L" ? "bg-[#D08700]" :
    "bg-[#875F17]"
    return color
  }
  return(
    <View className='w-[50%]'>
      {matches.map((match)=>(
        <View key={match.init} className={`my-2 flex-row items-center gap-3 w-[60%] ${className}`}>
          <ThemedText className='text-gray-600 text-xs text-left w-[20%]'>{match.score}</ThemedText>
          <View className='flex-row items-center gap-0 w-[60%]'>
            <ThemedText className='text-gray-600 text-xs w-[50%]'>{match.init}</ThemedText>
            {match.venue === "Home" ? 
              <HomeIcon width={12} height={12} /> :
              <AwayIcon width={12} height={12}/>
             }
             <ThemedText className={`${bgcolor(match.result)} w-4 h-4 ml-auto text-center font-semibold text-xs`}>{match.result === "W" ? "W" : match.result === "L" ? "L" : "D"}</ThemedText>
          </View>
        </View>
      ))}
    </View>
  )
}