import { sports } from "@/interface";

export interface CountryLeagues {
  popular: boolean;
  country: string;
  leagues: League[];
}

export interface League {
  name: string;
  popular: boolean;
  matches: Match[];
}

export interface Match {
  id: number;
  live: boolean;
  selected: {id: string, option: "Home" | "Away" | "Draw"}[];
  result: string;
  home: string;
  away: string;
  date: string;
  time: string;
  popular: boolean;
  odds?: {
    home: string;
      draw?: string;
    away: string;
    overUnder?: {
      line: string;
      over: string;
      under: string;
    }[];
    handicap?: {
      line: string; // e.g., "-1.5", "+2.5"
      home: string; // odds for home team with this handicap
      away: string; // odds for away team with this handicap
    }[];
  };
}


// export const basketballData: CountryLeagues[] = [
//   {
//     country: "USA",
//     popular: true,
//     leagues: [
//       {
//         name: "NBA",
//         popular: true,
//         matches: [
//           {
//             home: "Los Angeles Lakers",
//             away: "Golden State Warriors",
//             date: "2025-11-16",
//             time: "19:30",
//             popular: true,
//             odds: {
//               home: "1.85",
//               draw: "3.40",
//               away: "2.10",
//               overUnder: [
//                 { line: "210.5", over: "1.88", under: "1.92" },
//                 { line: "215.5", over: "1.85", under: "1.95" },
//               ],
//               handicap: [
//                 { line: "-2.5", home: "1.90", away: "1.90" },
//                 { line: "+2.5", home: "1.85", away: "2.00" },
//               ],
//             },
//           },
//           {
//             home: "Miami Heat",
//             away: "Boston Celtics",
//             date: "2025-11-16",
//             time: "20:00",
//             popular: true,
//             odds: {
//               home: "2.20",
//               draw: "3.60",
//               away: "1.75",
//               overUnder: [
//                 { line: "208.5", over: "1.90", under: "1.90" },
//                 { line: "212.5", over: "1.95", under: "1.85" },
//               ],
//               handicap: [
//                 { line: "-3.5", home: "2.10", away: "1.75" },
//                 { line: "+3.5", home: "1.70", away: "2.20" },
//               ],
//             },
//           },
//           {
//             home: "Brooklyn Nets",
//             away: "Philadelphia 76ers",
//             date: "2025-11-17",
//             time: "18:45",
//             popular: false,
//             odds: {
//               home: "2.05",
//               draw: "3.50",
//               away: "1.80",
//               overUnder: [
//                 { line: "218.5", over: "1.87", under: "1.93" },
//                 { line: "225.5", over: "2.05", under: "1.75" },
//               ],
//               handicap: [
//                 { line: "-1.5", home: "1.95", away: "1.85" },
//                 { line: "+1.5", home: "1.80", away: "2.05" },
//               ],
//             },
//           },
//           {
//             home: "Dallas Mavericks",
//             away: "Houston Rockets",
//             date: "2025-11-18",
//             time: "21:00",
//             popular: true,
//             odds: {
//               home: "1.70",
//               draw: "3.90",
//               away: "2.25",
//               overUnder: [
//                 { line: "216.5", over: "1.86", under: "1.94" },
//                 { line: "223.5", over: "2.00", under: "1.78" },
//               ],
//               handicap: [
//                 { line: "-4.5", home: "1.88", away: "1.92" },
//                 { line: "+4.5", home: "1.68", away: "2.30" },
//               ],
//             },
//           },
//           {
//             home: "Chicago Bulls",
//             away: "New York Knicks",
//             date: "2025-11-19",
//             time: "19:00",
//             popular: false,
//             odds: {
//               home: "2.40",
//               draw: "3.80",
//               away: "1.60",
//               overUnder: [
//                 { line: "214.5", over: "1.90", under: "1.90" },
//                 { line: "218.5", over: "2.10", under: "1.70" },
//               ],
//               handicap: [
//                 { line: "-6.5", home: "2.20", away: "1.65" },
//                 { line: "+6.5", home: "1.55", away: "2.45" },
//               ],
//             },
//           },
//           {
//             home: "Phoenix Suns",
//             away: "Denver Nuggets",
//             date: "2025-11-19",
//             time: "22:00",
//             popular: true,
//             odds: {
//               home: "1.95",
//               draw: "3.45",
//               away: "1.90",
//               overUnder: [
//                 { line: "221.5", over: "1.85", under: "1.95" },
//                 { line: "228.5", over: "2.15", under: "1.70" },
//               ],
//               handicap: [
//                 { line: "-1.5", home: "1.92", away: "1.88" },
//                 { line: "+1.5", home: "1.80", away: "2.10" },
//               ],
//             },
//           },
//           {
//             home: "San Antonio Spurs",
//             away: "Oklahoma City Thunder",
//             date: "2025-11-20",
//             time: "20:15",
//             popular: false,
//             odds: {
//               home: "2.60",
//               draw: "4.10",
//               away: "1.55",
//               overUnder: [
//                 { line: "213.5", over: "1.92", under: "1.88" },
//                 { line: "219.5", over: "2.05", under: "1.75" },
//               ],
//               handicap: [
//                 { line: "-7.5", home: "2.35", away: "1.60" },
//                 { line: "+7.5", home: "1.58", away: "2.40" },
//               ],
//             },
//           },
//           {
//             home: "Atlanta Hawks",
//             away: "Toronto Raptors",
//             date: "2025-11-21",
//             time: "19:45",
//             popular: false,
//             odds: {
//               home: "1.75",
//               draw: "3.85",
//               away: "2.15",
//               overUnder: [
//                 { line: "209.5", over: "1.90", under: "1.90" },
//                 { line: "217.5", over: "2.00", under: "1.78" },
//               ],
//               handicap: [
//                 { line: "-3.5", home: "1.88", away: "1.92" },
//                 { line: "+3.5", home: "1.75", away: "2.15" },
//               ],
//             },
//           },
//           {
//             home: "Utah Jazz",
//             away: "Portland Trail Blazers",
//             date: "2025-11-22",
//             time: "21:30",
//             popular: false,
//             odds: {
//               home: "1.60",
//               draw: "4.20",
//               away: "2.35",
//               overUnder: [
//                 { line: "207.5", over: "1.88", under: "1.92" },
//                 { line: "214.5", over: "2.05", under: "1.75" },
//               ],
//               handicap: [
//                 { line: "-5.5", home: "1.78", away: "2.25" },
//                 { line: "+5.5", home: "1.68", away: "2.30" },
//               ],
//             },
//           },
//           {
//             home: "Memphis Grizzlies",
//             away: "Minnesota Timberwolves",
//             date: "2025-11-23",
//             time: "19:15",
//             popular: true,
//             odds: {
//               home: "1.90",
//               draw: "3.55",
//               away: "1.85",
//               overUnder: [
//                 { line: "222.5", over: "1.85", under: "1.95" },
//                 { line: "231.5", over: "2.20", under: "1.68" },
//               ],
//               handicap: [
//                 { line: "-2.5", home: "1.90", away: "1.90" },
//                 { line: "+2.5", home: "1.80", away: "2.05" },
//               ],
//             },
//           }
//         ],
//       },
//     ],
//   },
// ];

export const footballData: CountryLeagues[] = [
  {
    country: "England",
    popular: true,
    leagues: [
      {
        name: "Premier League",
        popular: true,
        matches: [
          {
            id: 1,
            live: false,
            selected: [],
            result: "",
            home: "Arsenal",
            away: "Liverpool",
            date: "2025-01-18",
            time: "14:30",
            popular: true,
            odds: {
              home: "2.10",
              draw: "3.50",
              away: "3.10",
              overUnder: [
                { line: "2.5", over: "1.85", under: "1.95" },
                { line: "3.5", over: "2.40", under: "1.60" }
              ],
              handicap: [
                { line: "-1.5", home: "3.40", away: "1.30" },
                { line: "+1.5", home: "1.20", away: "4.00" }
              ]
            }
          },

          {
            id: 2,
            live: true,
            selected: [],
            result: "",
            home: "Chelsea",
            away: "Manchester United",
            date: "2025-01-18",
            time: "16:00",
            popular: true,
            odds: {
              home: "2.70",
              draw: "3.20",
              away: "2.60",
              overUnder: [{ line: "2.5", over: "1.90", under: "1.90" }],
              handicap: [{ line: "0", home: "1.85", away: "1.85" }]
            }
          },

          {
            id: 3,
            live: false,
            selected: [],
            result: "",
            home: "Manchester City",
            away: "Tottenham",
            date: "2025-01-19",
            time: "20:00",
            popular: true,
            odds: {
              home: "1.60",
              draw: "4.20",
              away: "5.20",
              overUnder: [{ line: "3.5", over: "2.10", under: "1.70" }],
              handicap: [{ line: "-1.5", home: "2.20", away: "1.60" }]
            }
          },

          {
            id: 4,
            live: false,
            selected: [],
            result: "",
            home: "Newcastle",
            away: "Aston Villa",
            date: "2025-01-20",
            time: "13:00",
            popular: false,
            odds: {
              home: "2.30",
              draw: "3.40",
              away: "2.90",
              overUnder: [{ line: "2.5", over: "2.00", under: "1.80" }],
              handicap: [{ line: "-0.5", home: "2.30", away: "1.60" }]
            }
          },

          {
            id: 5,
            live: false,
            selected: [],
            result: "",
            home: "West Ham",
            away: "Brighton",
            date: "2025-01-21",
            time: "15:00",
            popular: false,
            odds: {
              home: "2.50",
              draw: "3.30",
              away: "2.70",
              overUnder: [{ line: "2.5", over: "1.95", under: "1.85" }],
              handicap: [{ line: "+0.5", home: "1.60", away: "2.30" }]
            }
          },

          {
            id: 6,
            live: true,
            selected: [],
            result: "",
            home: "Leeds United",
            away: "Leicester City",
            date: "2025-01-22",
            time: "12:00",
            popular: false,
            odds: {
              home: "2.80",
              draw: "3.10",
              away: "2.50",
              overUnder: [{ line: "2.5", over: "1.88", under: "1.92" }],
              handicap: [{ line: "0", home: "1.90", away: "1.90" }]
            }
          },

          {
            id: 7,
            live: false,
            selected: [],
            result: "",
            home: "Southampton",
            away: "Sunderland",
            date: "2025-01-22",
            time: "18:00",
            popular: false,
            odds: {
              home: "2.00",
              draw: "3.60",
              away: "3.70",
              overUnder: [{ line: "2.5", over: "2.05", under: "1.75" }],
              handicap: [{ line: "-0.5", home: "1.95", away: "1.85" }]
            }
          },

          {
            id: 8,
            live: false,
            selected: [],
            result: "",
            home: "Norwich City",
            away: "Hull City",
            date: "2025-01-23",
            time: "16:00",
            popular: false,
            odds: {
              home: "2.40",
              draw: "3.20",
              away: "2.80",
              overUnder: [{ line: "2.5", over: "1.90", under: "1.90" }],
              handicap: [{ line: "+1.0", home: "1.30", away: "3.40" }]
            }
          },

          {
            id: 9,
            live: true,
            selected: [],
            result: "",
            home: "West Brom",
            away: "QPR",
            date: "2025-01-23",
            time: "19:30",
            popular: false,
            odds: {
              home: "1.95",
              draw: "3.50",
              away: "3.80",
              overUnder: [{ line: "2.0", over: "1.70", under: "2.20" }],
              handicap: [{ line: "-0.5", home: "2.00", away: "1.75" }]
            }
          },

          {
            id: 10,
            live: false,
            selected: [],
            result: "",
            home: "Blackburn",
            away: "Watford",
            date: "2025-01-24",
            time: "21:00",
            popular: false,
            odds: {
              home: "2.60",
              draw: "3.20",
              away: "2.60",
              overUnder: [{ line: "2.5", over: "1.92", under: "1.88" }],
              handicap: [{ line: "0", home: "1.92", away: "1.92" }]
            }
          }
        ]
      }
    ]
  }
];

export const basketballData: CountryLeagues[] = [
  {
    country: "USA",
    popular: true,
    leagues: [
      {
        name: "NBA",
        popular: true,
        matches: [
          {
            id: 101,
            live: false,
            selected: [],
            result: "",
            home: "Los Angeles Lakers",
            away: "Golden State Warriors",
            date: "2025-11-16",
            time: "19:30",
            popular: true,
            odds: {
              home: "1.85",
              away: "2.10",
              draw: undefined, // Basketball has no draws
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" }
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "+3.5", home: "1.70", away: "2.20" }
              ]
            }
          },

          {
            id: 102,
            live: true,
            selected: [],
            result: "",
            home: "Boston Celtics",
            away: "Milwaukee Bucks",
            date: "2025-11-16",
            time: "21:00",
            popular: true,
            odds: {
              home: "1.75",
              away: "2.20",
              draw: undefined,
              overUnder: [
                { line: "218.5", over: "1.90", under: "1.90" },
                { line: "225.5", over: "2.20", under: "1.70" }
              ],
              handicap: [
                { line: "-2.5", home: "1.95", away: "1.85" },
                { line: "+2.5", home: "1.70", away: "2.10" }
              ]
            }
          },

          {
            id: 103,
            live: false,
            selected: [],
            result: "",
            home: "Miami Heat",
            away: "Chicago Bulls",
            date: "2025-11-17",
            time: "19:00",
            popular: true,
            odds: {
              home: "1.90",
              away: "1.95",
              overUnder: [
                { line: "209.5", over: "1.92", under: "1.88" },
                { line: "215.5", over: "2.10", under: "1.70" }
              ],
              handicap: [
                { line: "-1.5", home: "1.85", away: "1.90" }
              ]
            }
          },

          {
            id: 104,
            live: false,
            selected: [],
            result: "",
            home: "Dallas Mavericks",
            away: "Phoenix Suns",
            date: "2025-11-17",
            time: "22:00",
            popular: true,
            odds: {
              home: "2.00",
              away: "1.80",
              overUnder: [
                { line: "216.5", over: "1.88", under: "1.92" },
                { line: "222.5", over: "2.40", under: "1.60" }
              ],
              handicap: [
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "-2.5", home: "2.10", away: "1.75" }
              ]
            }
          },

          {
            id: 105,
            live: true,
            selected: [],
            result: "",
            home: "Denver Nuggets",
            away: "Minnesota Timberwolves",
            date: "2025-11-18",
            time: "20:00",
            popular: false,
            odds: {
              home: "1.70",
              away: "2.20",
              overUnder: [
                { line: "214.5", over: "1.90", under: "1.88" }
              ],
              handicap: [
                { line: "-3.5", home: "1.95", away: "1.80" }
              ]
            }
          },

          {
            id: 106,
            live: false,
            selected: [],
            result: "",
            home: "Philadelphia 76ers",
            away: "Toronto Raptors",
            date: "2025-11-18",
            time: "19:00",
            popular: false,
            odds: {
              home: "1.65",
              away: "2.30",
              overUnder: [
                { line: "212.5", over: "1.85", under: "1.95" }
              ],
              handicap: [
                { line: "-4.5", home: "2.00", away: "1.75" }
              ]
            }
          },

          {
            id: 107,
            live: false,
            selected: [],
            result: "",
            home: "Atlanta Hawks",
            away: "New York Knicks",
            date: "2025-11-19",
            time: "19:30",
            popular: false,
            odds: {
              home: "1.88",
              away: "1.92",
              overUnder: [
                { line: "211.5", over: "1.90", under: "1.90" }
              ],
              handicap: [
                { line: "-1.5", home: "1.92", away: "1.88" }
              ]
            }
          },

          {
            id: 108,
            live: false,
            selected: [],
            result: "",
            home: "Houston Rockets",
            away: "San Antonio Spurs",
            date: "2025-11-19",
            time: "22:00",
            popular: false,
            odds: {
              home: "2.10",
              away: "1.75",
              overUnder: [
                { line: "218.5", over: "1.92", under: "1.88" }
              ],
              handicap: [
                { line: "+2.5", home: "1.85", away: "1.95" }
              ]
            }
          },

          {
            id: 109,
            live: true,
            selected: [],
            result: "",
            home: "Memphis Grizzlies",
            away: "Portland Trail Blazers",
            date: "2025-11-20",
            time: "19:00",
            popular: false,
            odds: {
              home: "1.85",
              away: "2.00",
              overUnder: [
                { line: "213.5", over: "1.90", under: "1.90" }
              ],
              handicap: [
                { line: "-2.0", home: "1.92", away: "1.85" }
              ]
            }
          },

          {
            id: 110,
            live: false,
            selected: [],
            result: "",
            home: "Utah Jazz",
            away: "Oklahoma City Thunder",
            date: "2025-11-20",
            time: "21:30",
            popular: false,
            odds: {
              home: "2.30",
              away: "1.65",
              overUnder: [
                { line: "219.5", over: "1.88", under: "1.92" }
              ],
              handicap: [
                { line: "+3.5", home: "1.90", away: "1.85" }
              ]
            }
          }
        ]
      }
    ]
  }
];

export const updateDataArry = (sport: sports) => {
  switch (sport) {
    case "basketball": 
      return basketballData
    // case "tennis":
    //     return tennisLeagues
    // case "americafootball":
    //   return americanFootballLeagues
    default:
      return footballData
      
  }
}