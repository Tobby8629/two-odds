import { validate } from '@/constants/data';
import React, { Dispatch } from "react"

interface validateInput {
  email?: string
  password?: string
}

interface Match {
  home: string;
  away: string;
  date: string;
  time: string;
  popular: boolean;
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

  interface MatchPropsBetslip { 
    id:number,
    // status: "won" | "lost" | "pending"
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
    selected: {id: string, option: "Home" | "Away" | "Draw"},
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