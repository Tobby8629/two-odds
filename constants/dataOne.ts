import { CountryLeagues } from "@/interface";

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
