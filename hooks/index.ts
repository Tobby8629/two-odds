import { getQuery } from "@/components/api/QueryFn"
import { useQuery } from "@tanstack/react-query"
import { Market, Match, MatchDetailsResponse } from "./matchInterface/matchInterface"

export interface Sport {
  id: string;
  name: string;
}


interface sportDetail {
    id:string,
    name:string,
    slug:string,
    isActive: boolean
}

interface countryLeague {
 id: string,
 sportId: string,
 name: string,
 slug: string,
 externalId: string,
 country: string,
 isActive: boolean,
 lastSyncedAt: null,
 sport: {
   id: string,
   name: string,
   slug: string,
   isActive: boolean
    }
  }

interface fetch <T>{
  success: boolean,
  data: T[]
}

type Status = "UPCOMING" | "LIVE" | "FINISHED" | "POSTPONED";



export const useSportFetch = () => {
  return useQuery({
    queryKey: ["sportsFetch"],
    queryFn: () => getQuery<fetch<sportDetail>>('/sports'),
     staleTime: 5 * 60 * 1000, 
  })
} 

export const useSportCountries = () => {
  return useQuery({
    queryKey: ["sportCountries"],
    queryFn: () => getQuery<fetch<string>>('/sports/countries'),
     staleTime: 5 * 60 * 1000, 
  })
} 

export const useCountryLeagues = (country: string, sportId: string) => {
  return useQuery({
    queryKey: ["countryLeagues"],
    queryFn: () => getQuery<fetch<countryLeague>>(`/sports/${sportId}/countries/${country}/leagues`),
     staleTime: 5 * 60 * 1000, 
  })
} 


export const useMatches = ( leagueId: string, status?: Status) => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: () => getQuery<fetch<Match>>(`/sports/matches`, {leagueId, status}),
     staleTime: 5 * 60 * 1000, 
  })
} 

export const useMatchDetails = (matchId: string) => {
  return useQuery({
    queryKey: ["matchDetails", matchId],
    queryFn: () => getQuery<MatchDetailsResponse>(`/sports/matches/${matchId}`),
     staleTime: 5 * 60 * 1000, 
  })
}

export const useMatchMarkets = (matchId: string) => {
  return useQuery({
    queryKey: ["matchMarkets", matchId],
    queryFn: () => getQuery<fetch<Market>>(`/sports/matches/${matchId}/odds`),
     staleTime: 5 * 60 * 1000, 
  })
}