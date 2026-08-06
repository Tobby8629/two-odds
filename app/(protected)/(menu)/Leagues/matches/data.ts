import { BettingMarket } from "@/interface";

const footballMarkets: BettingMarket[] = [
  {
    id: 1,
    sport: "football",
    title: "1X2",
    selected: true,
    options: [
      { id: "home", title: "Home", init: "1" },
      { id: "draw", title: "Draw", init: "X" },
      { id: "away", title: "Away", init: "2" },
    ],
  },
  {
    id: 2,
    sport: "football",
    title: "Double Chance",
    selected: false,
    options: [
      { id: "home_draw", title: "Home or Draw", init: "1X" },
      { id: "home_away", title: "Home or Away", init: "12" },
      { id: "draw_away", title: "Draw or Away", init: "X2" },
    ],
  },
  {
    id: 3,
    sport: "football",
    title: "Over / Under",
    selected: false,
    options: [
      { id: "over", title: "Over", init: "Over" },
      { id: "under", title: "Under", init: "Under" },
    ],
    goals: [
      { id: "1", select: true, init: "0.5" },
      { id: "2", select: false, init: "1.5" },
      { id: "3", select: false, init: "2.5" },
      { id: "4", select: false, init: "3.5" },
      { id: "5", select: false, init: "4.5" },
      { id: "6", select: false, init: "5.5" },
    ],
  },
  {
    id: 4,
    sport: "football",
    title: "BTTS",
    selected: false,
    options: [
      { id: "yes", title: "Yes", init: "Yes" },
      { id: "no", title: "No", init: "No" },
    ],
  },
];

const basketballMarkets: BettingMarket[] = [
  {
    id: 1,
    sport: "basketball",
    title: "1X2",
    selected: true,
    options: [
      { id: "home", title: "Home", init: "1" },
      { id: "away", title: "Away", init: "2" },
    ],
  },
  {
    id: 3,
    sport: "basketball",
    title: "Over / Under",
    selected: false,
    options: [
      { id: "over", title: "Over", init: "Over" },
      { id: "under", title: "Under", init: "Under" },
    ],
    goals: [
      { id: "1", select: true, init: "200.5" },
      { id: "2", select: false, init: "201.5" },
      { id: "3", select: false, init: "203.5" },
      { id: "4", select: false, init: "204.5" },
      { id: "5", select: false, init: "205.5" },
      { id: "6", select: false, init: "206.5" },
    ],
  },
  {
    id: 4,
    sport: "basketball",
    title: "Handicap",
    selected: false,
    options: [
      { id: "yes", title: "Yes", init: "Yes" },
      { id: "no", title: "No", init: "No" },
    ],
    goals: [
      { id: "1", select: true, init: "-0.5" },
      { id: "2", select: false, init: "-1.5" },
      { id: "3", select: false, init: "-2.5" },
      { id: "4", select: false, init: "-3.5" },
      { id: "5", select: false, init: "-4.5" },
      { id: "6", select: false, init: "-5.5" },
    ],
  },
  {
    id: 5,
    sport: "basketball",
    title: "3Way",
    selected: false,
    options: [
      { id: "home", title: "Home", init: "1" },
      { id: "away", title: "Away", init: "2" },
    ],
  },
];

const TennisMarkets: BettingMarket[] = [
  {
    id: 1,
    sport: "tennis",
    title: "Winner",
    selected: true,
    options: [
      { id: "player1", title: "Player 1", init: "1" },
      { id: "player2", title: "Player 2", init: "2" },
    ],
  },
  {
    id: 2,
    sport: "tennis",
    title: "Game Over/Under",
    selected: false,
    options: [
      { id: "over", title: "Over", init: "Over" },
      { id: "under", title: "Under", init: "Under" },
    ],
    goals: [
      { id: "1", select: true, init: "200.5" },
      { id: "2", select: false, init: "201.5" },
      { id: "3", select: false, init: "203.5" },
      { id: "4", select: false, init: "204.5" },
      { id: "5", select: false, init: "205.5" },
      { id: "6", select: false, init: "206.5" },
    ],
  },

  {
    id: 3,
    sport: "tennis",
    title: "Game Handicap",
    selected: false,
    options: [
      { id: "yes", title: "Yes", init: "Yes" },
      { id: "no", title: "No", init: "No" },
    ],
    goals: [
      { id: "1", select: true, init: "-0.5" },
      { id: "2", select: false, init: "-1.5" },
      { id: "3", select: false, init: "-2.5" },
      { id: "4", select: false, init: "-3.5" },
      { id: "5", select: false, init: "-4.5" },
      { id: "6", select: false, init: "-5.5" },
    ],
  },
];

export const getMarketsBySport = (sport: "football" | "basketball" | "tennis") => {
  return sport === "football"
    ? footballMarkets
    : sport === "basketball"
    ? basketballMarkets
    : sport === "tennis"
    ? TennisMarkets
    : [];
}

