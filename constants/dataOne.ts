import { CountryLeagues, sports } from "@/interface";

export const footballLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "England",
    leagues: [
      {
        name: "Premier League",
        popular: true,
        matches: [
          { home: "Arsenal", away: "Chelsea", date: "2025-01-14", time: "18:30", popular: true },
          { home: "Liverpool", away: "Man City", date: "2025-01-18", time: "20:00", popular: true },
        ]
      },
      {
        name: "EFL Championship",
        popular: false,
        matches: [
          { home: "Leeds United", away: "Norwich", date: "2025-01-10", time: "16:00", popular: false },
        ]
      },
      { name: "League One", popular: false, matches: [] },
      { name: "League Two", popular: false, matches: [] },
    ],
  },

  {
    popular: true,
    country: "Spain",
    leagues: [
      {
        name: "La Liga",
        popular: true,
        matches: [
          { home: "Barcelona", away: "Real Madrid", date: "2025-02-01", time: "21:00", popular: true },
          { home: "Valencia", away: "Sevilla", date: "2025-02-05", time: "19:00", popular: false },
        ]
      },
      { name: "Segunda División", popular: false, matches: [] },
    ],
  },

  {
    popular: true,
    country: "Italy",
    leagues: [
      {
        name: "Serie A",
        popular: true,
        matches: [
          { home: "Juventus", away: "Inter Milan", date: "2025-01-30", time: "20:45", popular: true },
        ]
      },
      { name: "Serie B", popular: false, matches: [] },
    ],
  },

  // you can add matches to other leagues similarly...
];


export const basketballLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "United States",
    leagues: [
      {
        name: "NBA",
        popular: true,
        matches: [
          { home: "Lakers", away: "Warriors", date: "2025-01-12", time: "19:30", popular: true },
          { home: "Celtics", away: "Bucks", date: "2025-01-14", time: "20:00", popular: true },
        ]
      },
      { name: "WNBA", popular: false, matches: [] },
      { name: "NBA G League", popular: false, matches: [] },
    ],
  },

  {
    popular: false,
    country: "Spain",
    leagues: [
      {
        name: "Liga ACB",
        popular: true,
        matches: [
          { home: "Real Madrid", away: "Barcelona", date: "2025-01-20", time: "18:00", popular: true },
        ]
      },
      { name: "LEB Oro", popular: false, matches: [] },
    ],
  },
];

export const tennisLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "International",
    leagues: [
      {
        name: "ATP Tour",
        popular: true,
        matches: [
          { home: "Novak Djokovic", away: "Carlos Alcaraz", date: "2025-02-04", time: "14:00", popular: true },
        ]
      },
      {
        name: "WTA Tour",
        popular: true,
        matches: [
          { home: "Iga Świątek", away: "Coco Gauff", date: "2025-02-07", time: "15:30", popular: true },
        ]
      },
      { name: "ITF World Tennis Tour", popular: false, matches: [] },
    ],
  },

  {
    popular: false,
    country: "Grand Slam Tournaments",
    leagues: [
      {
        name: "Wimbledon",
        popular: true,
        matches: [
          { home: "Carlos Alcaraz", away: "Jannik Sinner", date: "2025-07-02", time: "13:00", popular: true },
        ]
      },
      { name: "US Open", popular: true, matches: [] },
      { name: "Australian Open", popular: true, matches: [] },
      { name: "French Open (Roland Garros)", popular: true, matches: [] },
    ],
  },
];

export const americanFootballLeagues: CountryLeagues[] = [
  {
    popular: true,
    country: "United States",
    leagues: [
      {
        name: "NFL (National Football League)",
        popular: true,
        matches: [
          { home: "Kansas City Chiefs", away: "Baltimore Ravens", date: "2025-01-19", time: "16:25", popular: true },
          { home: "Cowboys", away: "49ers", date: "2025-01-21", time: "20:20", popular: true },
        ]
      },
      {
        name: "NCAA College Football",
        popular: false,
        matches: [
          { home: "Ohio State", away: "Michigan", date: "2025-01-11", time: "15:00", popular: false },
        ]
      },
      { name: "XFL", popular: false, matches: [] },
      { name: "USFL", popular: false, matches: [] },
    ],
  },

  {
    popular: false,
    country: "Canada",
    leagues: [
      {
        name: "CFL (Canadian Football League)",
        popular: true,
        matches: [
          { home: "Toronto Argonauts", away: "BC Lions", date: "2025-06-10", time: "18:00", popular: false },
        ]
      },
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