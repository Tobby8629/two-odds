import { CountryLeagues, sports } from "@/interface";

export const footballLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "England",
    leagues: [
      { name: "Premier League", popular: true },
      { name: "EFL Championship", popular: false },
      { name: "League One", popular: false },
      { name: "League Two", popular: false },
    ],
  },
  {
    popular: true,
    country: "Spain",
    leagues: [
      { name: "La Liga", popular: true },
      { name: "Segunda División", popular: false },
    ],
  },
  {
    popular: true,
    country: "Italy",
    leagues: [
      { name: "Serie A", popular: true },
      { name: "Serie B", popular: false },
    ],
  },
  {
    popular: true,
    country: "Germany",
    leagues: [
      { name: "Bundesliga", popular: true },
      { name: "2. Bundesliga", popular: false },
    ],
  },
  {
    popular: true,
    country: "France",
    leagues: [
      { name: "Ligue 1", popular: true },
      { name: "Ligue 2", popular: false },
    ],
  },
  {
    popular: true,
    country: "Portugal",
    leagues: [
      { name: "Primeira Liga", popular: false },
      { name: "Liga Portugal 2", popular: false },
    ],
  },
  {
    popular: true,
    country: "Netherlands",
    leagues: [
      { name: "Eredivisie", popular: false },
      { name: "Eerste Divisie", popular: false },
    ],
  },
  {
    popular: false,
    country: "Brazil",
    leagues: [
      { name: "Brasileirão Série A", popular: true },
      { name: "Brasileirão Série B", popular: false },
    ],
  },
  {
    popular: false,
    country: "Argentina",
    leagues: [
      { name: "Argentine Primera División", popular: true },
      { name: "Primera Nacional", popular: false },
    ],
  },
  {
    popular: true,
    country: "Saudi Arabia",
    leagues: [
      { name: "Saudi Pro League", popular: true },
      { name: "First Division League", popular: false },
    ],
  },
  {
    popular: false,
    country: "United States",
    leagues: [
      { name: "Major League Soccer (MLS)", popular: true },
      { name: "USL Championship", popular: false },
    ],
  },
  {
    popular: true,
    country: "Turkey",
    leagues: [
      { name: "Süper Lig", popular: false },
      { name: "TFF First League", popular: false },
    ],
  },
];

export const basketballLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "United States",
    leagues: [
      { name: "NBA", popular: true },
      { name: "WNBA", popular: false },
      { name: "NBA G League", popular: false },
    ],
  },
  {
    popular: false,
    country: "Spain",
    leagues: [
      { name: "Liga ACB", popular: true },
      { name: "LEB Oro", popular: false },
    ],
  },
  {
    popular: false,
    country: "Turkey",
    leagues: [
      { name: "Basketbol Süper Ligi", popular: true },
    ],
  },
  {
    popular: false,
    country: "Australia",
    leagues: [
      { name: "NBL", popular: true },
    ],
  },
];

export const tennisLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "International",
    leagues: [
      { name: "ATP Tour", popular: true },
      { name: "WTA Tour", popular: true },
      { name: "ITF World Tennis Tour", popular: false },
    ],
  },
  {
    popular: false,
    country: "Grand Slam Tournaments",
    leagues: [
      { name: "Wimbledon", popular: true },
      { name: "US Open", popular: true },
      { name: "Australian Open", popular: true },
      { name: "French Open (Roland Garros)", popular: true },
    ],
  },
];
export const americanFootballLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "United States",
    leagues: [
      { name: "NFL (National Football League)", popular: true },
      { name: "NCAA College Football", popular: false },
      { name: "XFL", popular: false },
      { name: "USFL", popular: false },
    ],
  },
  {
    popular: false,
    country: "Canada",
    leagues: [
      { name: "CFL (Canadian Football League)", popular: true },
    ],
  },
  {
    popular: false,
    country: "Europe",
    leagues: [
      { name: "European League of Football (ELF)", popular: true },
    ],
  },
];




export const updateDataArry = (sport: sports) => {
  switch (sport) {
    case "basketball": 
      return basketballLeagues
      break;
    case "tennis":
        return tennisLeagues
    case "americafootball":
      return americanFootballLeagues
    default:
      return footballLeagues
      break;
  }
}