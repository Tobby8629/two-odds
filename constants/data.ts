import LoadOne from "@/assets/SVGs/LoadOne"
import LoadTwo from "@/assets/SVGs/LoadTwo"
import LoadThree from "@/assets/SVGs/LoadThree"
import { nft, phrase, wallet } from "@/assets/images";
import { MatchProps, Nav, validateInput, validateOutput, verifyInt } from "@/interface";
import Home from "@/assets/SVGs/Home";
import Menu from "@/assets/SVGs/Menu";
import Betslip from "@/assets/SVGs/Betslip";
import Bets from "@/assets/SVGs/Bets";
import Profile from "@/assets/SVGs/profile";
import Football from "@/assets/SVGs/sport/football";
import Basketball from "@/assets/SVGs/sport/Basketball";
import AmericanFootball from "@/assets/SVGs/sport/AF";
import Tennis from "@/assets/SVGs/sport/Tennis";
import Volleyball from "@/assets/SVGs/sport/Volleyball";

export const load = [
  {
    name: "one",
    component: LoadOne,
  },
  {
    name: "two",
    component: LoadTwo,
  },
  {
    name: "three",
    component: LoadThree,
  },
];

export const createWallet = [
  {
    name: "wallet",
    image: wallet,
    text: "Wallets",
  },
  {
    name: "nft",
    image: nft,
    text: "NFT"
  },
  {
    name: "phrase",
    image: phrase,
    text: "Secured by us"
  },
];

export const passwordverification:  Array<{ id: number; val: keyof verifyInt; text: string }> = [
  {
    id: 1,
    val: "length",
    text: "Minimum of 8 characters"
  },

  {
    id: 2,
    val: "number",
    text: "Contains at least one number"
  },

  {
    id: 3,
    val: "lowercase",
    text: "Contains at least one lowercase letter"
  },

  {
    id: 4,
    val: "uppercase",
    text: "Contains at least one uppercase letter"
  },

  {
    id: 5,
    val: "specialChar",
    text: "Contains at least one special character"
  },
]

export const sports:Nav[] = [
  {
    name: "index",
    link: "/(tabs)",
    icon: Football,
  },
  {
    name: "menu",
    link: "/(tabs)/menu",
    icon: Basketball
  },
  {
    name: "betslip",
    link: "/(tabs)/betslip",
    icon: AmericanFootball,
  },

  {
    name: "bets",
    link: "/(tabs)/bets",
    icon: Tennis,
  },
  {
    name: "profile",
    link: "/(tabs)/profile",
    icon: Volleyball,
  }
,
  {
    name: "betslip1",
    link: "/(tabs)/betslip",
    icon: AmericanFootball,
  },

  {
    name: "bets1",
    link: "/(tabs)/bets",
    icon: Tennis,
  },
  {
    name: "profile1",
    link: "/(tabs)/profile",
    icon: Volleyball,
  }
]

export const quickpick:Nav[] = [
  {
    name: "Today's Football",
    link: "/(tabs)",
    icon: Football,
  },
  {
    name: "Football In Next 3 Hours ",
    link: "/(tabs)/menu",
    icon: Basketball
  },
  {
    name: "Euro League",
    link: "/(tabs)/betslip",
    icon: AmericanFootball,
  },

  {
    name: "bets",
    link: "/(tabs)/bets",
    icon: Tennis,
  },
  {
    name: "profile",
    link: "/(tabs)/profile",
    icon: Volleyball,
  }
,
  {
    name: "betslip1",
    link: "/(tabs)/betslip",
    icon: AmericanFootball,
  },

  {
    name: "bets1",
    link: "/(tabs)/bets",
    icon: Tennis,
  },
  {
    name: "profile1",
    link: "/(tabs)/profile",
    icon: Volleyball,
  }
]


export const nav:Nav[] = [
  {
    name: "index",
    link: "/(tabs)",
    icon: Home,
  },
  {
    name: "menu",
    link: "/(tabs)/menu",
    icon: Menu
  },
  {
    name: "betslip",
    link: "/(tabs)/betslip",
    icon: Betslip,
  },

  {
    name: "bets",
    link: "/(tabs)/bets",
    icon: Bets,
  },
  {
    name: "profile",
    link: "/(tabs)/profile",
    icon: Profile,
  }
]

export const paymentSteps = [
  "Enter the amount you want to deposit and click the “Top Up now” button.",
  "You will be given a temporary account(expires after 30 mins).",
  "Transfer money to the account via your online banking.",
  "Check your transaction history in app, Bank transfers generally credit within 10 minutes. if the deposit doesn’t credit within 24 hours, please contact your bank."
]


export  const match: MatchProps[]  = [
    { 
      id:1,
      match: "Man utd - Man Cit",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:2,
      match: "Man utd - Man Ci",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:3,
      match: "Man utd - Man C",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:4,
      match: "Man utd - Man",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:5,
      match: "Man utd - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:6,
      match: "Man utd - MaCity",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:7,
      match: "Man utd - MCity",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:8,
      match: "Man utd - MCity",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:9,
      match: "Man ut - Man City",
      selected: "Home",
      odds: "3.12",
      time: "20 june 2025 (12:30)"
    },
  ]