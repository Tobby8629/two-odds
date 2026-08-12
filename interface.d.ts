import { Result } from './node_modules/glob/dist/esm/glob.d';
import { select } from './store/useStore';
import { identity } from './node_modules/zod-to-json-schema/dist-test-v3/cjs/node_modules/zod/v3/helpers/util.d';
import { validate } from '@/constants/data';
import React, { Dispatch } from "react"
import { Match } from './constants/dataOne';

interface validateInput {
  email?: string
  password?: string
}

interface MatchProps { 
    id:number,
    status: "won" | "lost" | "pending"
    match: string,
    odds: string,
    time: string,
    live: boolean,
    result: string,
    home:string 
    away:string 
    homeOdds:string,
    awayOdds:string,
    drawOdds:string,
    selected: {id: string, option: "Home" | "Away" | "Draw"}[],
}

interface League {
  name: string;
  popular: boolean;
  matches?: Match[];
}


interface CountryLeagues {
  popular: boolean
  country: string;
  leagues: League[];
}

export type sports = "football" | "basketball" | "tennis"| "volleyball" | "americafootball"

interface MatchProps { 
    id:number,
    status: "won" | "lost" | "pending"
    match: string,
    odds: string,
    time: string,
    live: boolean,
    result: string,
    home:string 
    away:string 
    homeOdds:string,
    awayOdds:string,
    drawOdds:string,
    selected: {id: string, option: "Home" | "Away" | "Draw"}[],
  }

  interface SelectedOption {
    id: string;
    option: "Home" | "Away" | "Draw" | `Over ${string}` | `Under ${string}`;
  }
  
  type Option = "Home" | "Away" | "Draw" | "Over" | "Under";
  
  type OddsKey = 
    | "homeOdds"
    | "awayOdds"
    | "drawOdds"
    | "overOdds"
    | "underOdds";

  interface MatchPropsBetslip {
  // matchID: string;
  id: number;
  home: string;
  away: string;
  selected: SelectedOption;
}


  interface betProps {
    id: number,
    betType: string,
    games: match[],
    potentialWin:number,
    stake: number,
    cashout: number,
    date: string,
  }

interface data {
  password: ""
  confirm_password: ""
}

interface validateOutput {
    state: boolean
    text: string
}

type InputField = 'email' | 'password' | 'text';

type InputID = 'email' | 'password' | 'confirm_password' | 
'reset_code' | "address" | "amount" |
"oldpassword" |
    "newpassword" |
    "confirmpassword" 
;

interface register {
    email: InputField,
    tc: boolean,
    subscribe: boolean
}

export type CombinedItem = "header" | MatchProps;

export type CombiSportItem = "header" | Match;

interface Err {
    message: string
    status: boolean
}


interface verifyInt {
    length: boolean,
    uppercase: boolean,
    lowercase: boolean,
    number: boolean 
    confirmed: boolean
    specialChar: boolean
}

interface Nav {
  name: string,
  link: RelativePathString,
  icon: React.ComponentType<any>,
}

export interface BetOption 
{ id: string; title: string; init: string; }

export interface GoalOption{ 
  id: string; 
  select: boolean; 
  init: string; 
} 

export interface BettingMarket { 
  id: number; 
  sport: string;
  title: string; 
  selected: boolean; 
  options: BetOption[]; 
  goals?: GoalOption[]; 
}

export interface OVERHEADER { 
  goalDD?: boolean; 
  setGoalDD?: React.Dispatch<React.SetStateAction<boolean>>; 
  selectedMarket?: BettingMarket; 
  setMarkets?: React.Dispatch<React.SetStateAction<BettingMarket[]>>;
  BBoverUnder?: { line: string; over: string; under: string }[];
  generalvalue: string;
  updateGoalSelection: (line: string) => void;
}

interface OVERUNDER { 
  selectGame: (option: {id: number, option: "Home" | "Away" | "Draw"}) => void; 
  checkSelected: (arr: {id: string, option: "Home" | "Away" | "Draw"}[], 
    option: string) => boolean; match: MatchProps;
} 

interface MARKET { 
  markets: BettingMarket[]; 
  selectMarket: (id: number) => void; 
}


export const optionMap: Record<Option, OddsKey> = {
  Home: "homeOdds",
  Draw: "drawOdds",
  Away: "awayOdds",
  Over: "overOdds",
  Under: "underOdds",
};