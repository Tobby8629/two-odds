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
import { RelativePathString } from "expo-router";

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
      home: "man utd",
      away: "man cit",
      homeOdds: "3.12",
      awayOdds: "2.45",
      drawOdds: "3.01",
      match: "Man utd vs Man Cit",
      selected: [],
      odds: "3.12",
      result: "Home",
      status: "lost",
      live: false,
      time: "20 june 2025 (12:30)"
    },
    { 
      id:2,
      home: "man utd",
      away: "man ci",
      homeOdds: "2.12",
      awayOdds: "2.45",
      drawOdds: "2.01",
      match: "Man utd vs Man Ci",
      selected: [],
      odds: "3.12",
      result: "Home",
      live: false,
      status: "pending",
      time: "20 june 2025 (12:30)"
    },
    { 
      id:3,
      home: "man utd",
      away: "man C",
      homeOdds: "3.00",
      awayOdds: "2.41",
      drawOdds: "3.02",
      match: "Man utd vs Man C",
      selected: [],
      odds: "3.12",
      status: "won",
      result: "Home",
      live: false,
      time: "20 june 2025 (12:30)"
    },
    { 
      home: "man utd",
      away: "man",
      homeOdds: "3.12",
      awayOdds: "2.45",
      drawOdds: "3.01",
      id:4,
      match: "Man utd vs Man",
      selected: [],
      odds: "3.12",
      status: "won",
      result: "Home",
      live: false,
      time: "20 june 2025 (12:30)"
    },
    { 
      id:5,
      home: "man utd",
      away: "man city",
      homeOdds: "3.12",
      awayOdds: "2.45",
      drawOdds: "3.01",
      match: "Man utd vs Man City",
      selected: [],
      odds: "3.12",
      status: "won",
      result: "Home",
      live: false,
      time: "20 june 2025 (12:30)"
    },
    { 
      id:6,
      home: "man utd",
      away: "macity",
      homeOdds: "3.12",
      awayOdds: "2.45",
      drawOdds: "3.01",
      match: "Man utd vs MaCity",
      selected: [],
      odds: "3.12",
      status: "won",
      result: "Home",
      live: false,
      time: "20 june 2025 (12:30)"
    },
    { 
      id:7,
      home: "man utd",
      away: "mcity",
      homeOdds: "3.12",
      awayOdds: "2.45",
      drawOdds: "3.01",
      match: "Man utd vs MCity",
      selected: [],
      odds: "3.12",
      status: "won",
      result: "Home",
      live: false,
      time: "20 june 2025 (12:30)"
    },
    { 
      id:8,
      home: "man utd",
      away: "man cit",
      homeOdds: "3.12",
      awayOdds: "2.45",
      drawOdds: "3.01",
      match: "Man utd vs MCity",
      selected: [],
      odds: "3.12",
      status: "won",
      result: "Home",
      live: false,
      time: "20 june 2025 (12:30)"
    },
    { 
      id:9,
      home: "man utd",
      away: "man city",
      homeOdds: "3.12",
      awayOdds: "2.45",
      drawOdds: "3.01",
      match: "Man ut vs Man City",
      selected:[],
      odds: "3.12",
      status: "won",
      result: "Home",
      live: true,
      time: "20 june 2025 (12:30)"
    },
  ]

   export const bets = [
      {
        id: 1,
        betType: "accumulator",
        games: match,
        potentialWin: 2000,
        stake: 300,
        status: "won",
        cashout: 0,
        date: "01 Dec 2025 6:30",
      },
      {
        id: 2,
        betType: "accumulator",
        games: match,
        potentialWin: 3000,
        stake: 300,
        status: "won",
        cashout: 200,
        date: "01 Dec 2025 6:30",
      },
      {
        id: 3,
        betType: "accumulator",
        games: match,
        potentialWin: 4000,
        stake: 300,
        status: "won",
        cashout: 200,
        date: "01 Dec 2025 6:30",
      },
      {
        id: 4,
        betType: "accumulator",
        games: match,
        potentialWin: 5000,
        stake: 300,
        status: "lost",
        cashout: 200,
        date: "01 Dec 2025 6:30",
      },
    ];

   
export type TransactionType = "withdrawal" | "deposits" | "winnings";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string; // ISO string
}

// Helper to generate random transactions within last 30 days
const randomDateWithin30Days = () => {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - 30);

  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
  ).toISOString();
};

export const mockTransactions: Transaction[] = Array.from({ length: 20 }, (_, i) => {
  const types: TransactionType[] = ["withdrawal", "deposits", "winnings"];
  const type = types[Math.floor(Math.random() * types.length)];
  const amount = Math.floor(Math.random() * 1000) + 50; // between 50 and 1050

  return {
    id: `txn-${i + 1}`,
    type,
    amount,
    date: randomDateWithin30Days(),
  };
});

export const settings: { name: string; link: RelativePathString }[] = [
    { name: "My Profile", link: "./(settings)/(profile)/profile" },
    { name: "Security", link: "./(settings)/(security)/security" },
    { name: "Notifications", link: "./(settings)/notifications" },
    { name: "Account Limits", link: "./(settings)/accountLimit" },
    { name: "Transactions", link: "../(transactions)/history" },
  ];

export type SECURITY = "password" | "2fa" | "pin" | "delete";

export const securityRoutes: {
  id: SECURITY;
  name: string;
  link: string;
}[] = [
  { id: "password", name: "Change Password", link: "/(settings)/(security)/change_password" },
  { id: "2fa", name: "Two-factor Authentication (2FA)", link: "/(settings)/(security)/two_factor" },
  { id: "pin", name: "Withdrawal Pin", link: "/(settings)/(security)/withdrawal_pin" },
  { id: "delete", name: "Delete Account", link: "/(settings)/(security)/delete_account" },
];


