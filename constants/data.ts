import LoadOne from "@/assets/SVGs/LoadOne"
import LoadTwo from "@/assets/SVGs/LoadTwo"
import LoadThree from "@/assets/SVGs/LoadThree"
import { nft, phrase, wallet } from "@/assets/images";
import { Nav, validateInput, validateOutput, verifyInt } from "@/interface";
import Home from "@/assets/SVGs/Home";
import Menu from "@/assets/SVGs/Menu";
import Betslip from "@/assets/SVGs/Betslip";
import Bets from "@/assets/SVGs/Bets";
import Profile from "@/assets/SVGs/profile";

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




