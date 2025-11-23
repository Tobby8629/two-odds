import { BettingMarket, CountryLeagues, sports } from "@/interface";

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
    popular: false,
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
];

export const basketballLeagues: CountryLeagues[] = [
  {
    country: "USA",
    popular: true,
    leagues: [
      {
        name: "NBA",
        popular: true,
        matches: [
          {
            home: "Los Angeles Lakers",
            away: "Golden State Warriors",
            date: "2025-11-16",
            time: "19:30",
            popular: true,
            odds: {
              home: "1.85",
              draw: "3.40",
              away: "2.10",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]

            }
          },
          {
            home: "Boston Celtics",
            away: "Miami Heat",
            date: "2025-11-16",
            time: "20:00",
            popular: true,
            odds: {
              home: "1.65",
              draw: "2.40",
              away: "2.35",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Phoenix Suns",
            away: "Denver Nuggets",
            date: "2025-11-17",
            time: "21:00",
            popular: true,
            odds: {
              home: "2.05",
              draw: "3.40",
              away: "1.85",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ],
            }
          },
          {
            home: "Dallas Mavericks",
            away: "LA Clippers",
            date: "2025-11-18",
            time: "19:30",
            popular: false,
            odds: {
              home: "1.75",
              draw: "2.40",
              away: "2.20",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ], 

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Brooklyn Nets",
            away: "New York Knicks",
            date: "2025-11-18",
            time: "20:00",
            popular: true,
            odds: {
              home: "2.40",
              draw: "3.40",
              away: "1.65",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Chicago Bulls",
            away: "Cleveland Cavaliers",
            date: "2025-11-19",
            time: "19:00",
            popular: false,
            odds: {
              home: "2.10",
              draw: "3.40",
              away: "1.80",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Memphis Grizzlies",
            away: "New Orleans Pelicans",
            date: "2025-11-19",
            time: "20:30",
            popular: false,
            odds: {
              home: "1.88",
              draw: "3.40",
              away: "2.02",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Minnesota Timberwolves",
            away: "Oklahoma City Thunder",
            date: "2025-11-20",
            time: "19:30",
            popular: true,
            odds: {
              home: "2.15",
              draw: "3.40",
              away: "1.78",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ],
            }
          },
          {
            home: "Portland Trail Blazers",
            away: "Sacramento Kings",
            date: "2025-11-20",
            time: "22:00",
            popular: false,
            odds: {
              home: "2.25",
              draw: "3.40",
              away: "1.72",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
              
            }
          },
          {
            home: "Utah Jazz",
            away: "San Antonio Spurs",
            date: "2025-11-21",
            time: "18:00",
            popular: false,
            odds: {
              home: "1.92",
              draw: "3.40",
              away: "1.98",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]

            }
          },
          {
            home: "Houston Rockets",
            away: "Atlanta Hawks",
            date: "2025-11-21",
            time: "20:00",
            popular: false,
            odds: {
              home: "1.80",
              draw: "3.40",
              away: "2.10",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Charlotte Hornets",
            away: "Detroit Pistons",
            date: "2025-11-22",
            time: "19:00",
            popular: false,
            odds: {
              home: "1.95",
              draw: "3.40",
              away: "1.95",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Indiana Pacers",
            away: "Toronto Raptors",
            date: "2025-11-22",
            time: "19:30",
            popular: false,
            odds: {
              home: "1.70",
              draw: "3.40",
              away: "2.25",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Washington Wizards",
            away: "Orlando Magic",
            date: "2025-11-23",
            time: "18:00",
            popular: false,
            odds: {
              home: "2.30",
              draw: "3.40",
              away: "1.68",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Golden State Warriors",
            away: "Los Angeles Lakers",
            date: "2025-11-23",
            time: "22:30",
            popular: true,
            odds: {
              home: "1.78",
              draw: "3.40",
              away: "2.12",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Denver Nuggets",
            away: "Phoenix Suns",
            date: "2025-11-24",
            time: "20:00",
            popular: true,
            odds: {
              home: "1.85",
              draw: "3.40",
              away: "2.05",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Miami Heat",
            away: "Boston Celtics",
            date: "2025-11-24",
            time: "19:30",
            popular: true,
            odds: {
              home: "2.20",
              away: "1.75",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      },
      {
        name: "NCAA Regular Season",
        popular: false,
        matches: [
          {
            home: "Duke Blue Devils",
            away: "North Carolina Tar Heels",
            date: "2025-11-16",
            time: "18:00",
            popular: true,
            odds: {
              home: "1.72",
              draw: "3.40",
              away: "2.20",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Kentucky Wildcats",
            away: "Louisville Cardinals",
            date: "2025-11-16",
            time: "19:00",
            popular: true,
            odds: {
              home: "1.65",
              draw: "3.40",
              away: "2.35",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Kansas Jayhawks",
            away: "Villanova Wildcats",
            date: "2025-11-17",
            time: "17:00",
            popular: false,
            odds: {
              home: "1.80",
              draw: "3.40",
              away: "2.10",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Gonzaga Bulldogs",
            away: "UCLA Bruins",
            date: "2025-11-17",
            time: "21:00",
            popular: true,
            odds: {
              home: "1.88",
              draw: "3.40",
              away: "2.02",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Michigan State Spartans",
            away: "Ohio State Buckeyes",
            date: "2025-11-18",
            time: "18:30",
            popular: false,
            odds: {
              home: "1.95",
              draw: "2.40",
              away: "2.95",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Arizona Wildcats",
            away: "Oregon Ducks",
            date: "2025-11-18",
            time: "22:00",
            popular: false,
            odds: {
              home: "1.92",
              draw: "3.40",
              away: "1.98",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Texas Longhorns",
            away: "Baylor Bears",
            date: "2025-11-19",
            time: "19:00",
            popular: false,
            odds: {
              home: "1.75",
              draw: "3.40",
              away: "2.15",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Syracuse Orange",
            away: "Georgetown Hoyas",
            date: "2025-11-19",
            time: "20:00",
            popular: false,
            odds: {
              home: "2.05",
              
              away: "1.85",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Florida Gators",
            away: "Tennessee Volunteers",
            date: "2025-11-20",
            time: "18:00",
            popular: false,
            odds: {
              home: "2.10",
              away: "1.80",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Auburn Tigers",
            away: "Alabama Crimson Tide",
            date: "2025-11-20",
            time: "19:30",
            popular: false,
            odds: {
              home: "1.88",
              away: "2.02",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      },
      {
        name: "WNBA",
        popular: false,
        matches: [
          {
            home: "Las Vegas Aces",
            away: "Seattle Storm",
            date: "2025-11-16",
            time: "15:00",
            popular: true,
            odds: {
              home: "1.70",
              away: "2.25",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "New York Liberty",
            away: "Connecticut Sun",
            date: "2025-11-16",
            time: "16:00",
            popular: true,
            odds: {
              home: "1.85",
              away: "2.05",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Chicago Sky",
            away: "Indiana Fever",
            date: "2025-11-17",
            time: "14:00",
            popular: false,
            odds: {
              home: "1.95",
              away: "1.95",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Phoenix Mercury",
            away: "Los Angeles Sparks",
            date: "2025-11-17",
            time: "17:00",
            popular: false,
            odds: {
              home: "1.80",
              away: "2.10",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Minnesota Lynx",
            away: "Dallas Wings",
            date: "2025-11-18",
            time: "15:30",
            popular: false,
            odds: {
              home: "1.75",
              away: "2.15",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    country: "Spain",
    popular: false,
    leagues: [
      {
        name: "Liga ACB",
        popular: false,
        matches: [
          {
            home: "Real Madrid",
            away: "FC Barcelona",
            date: "2025-11-16",
            time: "20:30",
            popular: true,
            odds: {
              home: "1.92",
              away: "1.98",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Valencia Basket",
            away: "Baskonia",
            date: "2025-11-17",
            time: "19:00",
            popular: false,
            odds: {
              home: "1.85",
              away: "2.05",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    country: "Germany",
    popular: false,
    leagues: [
      {
        name: "BBL",
        popular: false,
        matches: [
          {
            home: "Bayern Munich",
            away: "Alba Berlin",
            date: "2025-11-16",
            time: "18:00",
            popular: false,
            odds: {
              home: "1.78",
              away: "2.12",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    country: "Italy",
    popular: false,
    leagues: [
      {
        name: "Lega Basket Serie A",
        popular: false,
        matches: [
          {
            home: "Olimpia Milano",
            away: "Virtus Bologna",
            date: "2025-11-17",
            time: "20:00",
            popular: false,
            odds: {
              home: "1.70",
              away: "2.25",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    country: "France",
    popular: false,
    leagues: [
      {
        name: "LNB Pro A",
        popular: false,
        matches: [
          {
            home: "ASVEL",
            away: "Monaco",
            date: "2025-11-16",
            time: "19:00",
            popular: false,
            odds: {
              home: "1.88",
              away: "2.02",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    country: "Turkey",
    popular: false,
    leagues: [
      {
        name: "BSL",
        popular: false,
        matches: [
          {
            home: "Fenerbahce",
            away: "Anadolu Efes",
            date: "2025-11-18",
            time: "18:30",
            popular: false,
            odds: {
              home: "2.05",
              away: "1.85",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    country: "International",
    popular: false,
    leagues: [
      {
        name: "EuroLeague",
        popular: true,
        matches: [
          {
            home: "Panathinaikos",
            away: "Olympiacos",
            date: "2025-11-19",
            time: "20:00",
            popular: true,
            odds: {
              home: "1.82",
              away: "2.08",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          },
          {
            home: "Maccabi Tel Aviv",
            away: "Zalgiris Kaunas",
            date: "2025-11-19",
            time: "19:00",
            popular: false,
            odds: {
              home: "1.75",
              away: "2.15",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],

              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ]
            }
          }
        ]
      }
    ]
  }
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
          {
            home: "Novak Djokovic",
            away: "Carlos Alcaraz",
            date: "2025-02-04",
            time: "14:00",
            popular: true,
            odds: {
              home: "1.75",
              away: "2.15",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ],
            },
          },
           {
            home: "Novak Djokovic",
            away: "Carlos Alcaraz",
            date: "2025-02-04",
            time: "14:00",
            popular: true,
            odds: {
              home: "1.75",
              away: "2.15",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ],
            },
          },

           {
            home: "Novak Djokovic",
            away: "Carlos Alcaraz",
            date: "2025-02-04",
            time: "14:00",
            popular: true,
            odds: {
              home: "1.75",
              away: "2.15",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ],
            },
          },

           {
            home: "Novak Djokovic",
            away: "Carlos Alcaraz",
            date: "2025-02-04",
            time: "14:00",
            popular: true,
            odds: {
              home: "1.75",
              away: "2.15",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.85", under: "1.95" },
                { line: "220.5", over: "2.82", under: "1.68" },
                { line: "230.5", over: "3.88", under: "1.92" },
                { line: "245.5", over: "2.85", under: "1.95" },
                { line: "250.5", over: "2.82", under: "1.98" },
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.90" },
                { line: "-2.5", home: "2.00", away: "1.85" },
                { line: "-3.5", home: "2.10", away: "1.80" },
                { line: "-4.5", home: "2.20", away: "1.75" },
                { line: "-5.5", home: "2.35", away: "1.65" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "+3.5", home: "1.70", away: "2.20" },
                { line: "+4.5", home: "1.65", away: "2.30" },
                { line: "+5.5", home: "1.60", away: "2.40" },
              ],
            },
          },
          
          {
            home: "Daniil Medvedev",
            away: "Stefanos Tsitsipas",
            date: "2025-02-06",
            time: "16:00",
            popular: true,
            odds: {
              home: "1.80",
              away: "2.05",
              overUnder: [
                { line: "200.5", over: "1.90", under: "1.95" },
                { line: "205.5", over: "1.78", under: "1.92" },
                { line: "210.5", over: "1.80", under: "1.95" },
                { line: "215.5", over: "1.88", under: "1.92" },
                { line: "220.5", over: "1.90", under: "1.95" },
                { line: "235.5", over: "1.88", under: "1.92" },
              ],
              handicap: [
                { line: "-1.5", home: "1.95", away: "1.85" },
                { line: "+2.5", home: "1.85", away: "1.95" },
                { line: "-2.5", home: "1.75", away: "1.85" },
                { line: "+2.5", home: "1.95", away: "1.95" },
                { line: "-3.5", home: "1.55", away: "1.85" },
                { line: "+4.5", home: "1.65", away: "1.95" },
              ],
            },
          },
        ],
      },
      {
        name: "WTA Tour",
        popular: true,
        matches: [
          {
            home: "Iga Świątek",
            away: "Coco Gauff",
            date: "2025-02-07",
            time: "15:30",
            popular: true,
            odds: {
              home: "1.70",
              away: "2.10",
              overUnder: [
                { line: "180.5", over: "1.85", under: "1.95" },
                { line: "185.5", over: "1.90", under: "1.88" },
                { line: "190.5", over: "1.75", under: "1.95" },
                { line: "175.5", over: "1.50", under: "1.88" },
                { line: "160.5", over: "1.45", under: "1.95" },
                { line: "155.5", over: "1.90", under: "1.88" },
                
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.85" },
                { line: "+1.5", home: "1.85", away: "1.90" },
                { line: "-2.5", home: "1.70", away: "1.85" },
                { line: "+3.5", home: "1.75", away: "1.90" },
                { line: "-3.5", home: "1.80", away: "1.85" },
                { line: "+4.5", home: "1.65", away: "1.90" },
              ],
            },
          },
          {
            home: "Ons Jabeur",
            away: "Jessica Pegula",
            date: "2025-02-08",
            time: "14:00",
            popular: true,
            odds: {
              home: "1.95",
              away: "1.80",
              overUnder: [
                { line: "165.5", over: "1.88", under: "1.92" },
                { line: "175.5", over: "1.88", under: "1.92" },
                { line: "185.5", over: "1.88", under: "1.92" },
                { line: "165.5", over: "1.88", under: "1.92" },
                { line: "145.5", over: "1.88", under: "1.92" },
                { line: "179.5", over: "1.88", under: "1.92" },


                
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.85" },
                { line: "+2.5", home: "1.85", away: "1.90" },
                { line: "+3.5", home: "1.85", away: "1.90" },
                { line: "+1.5", home: "1.85", away: "1.90" },
                { line: "+2.5", home: "1.85", away: "1.90" },
              ],
            },
          },
        ],
      },
      
      { name: " World Tennis Tour", 
        popular: false,
         matches: [

         ] },
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
          {
            home: "Carlos Alcaraz",
            away: "Jannik Sinner",
            date: "2025-07-02",
            time: "13:00",
            popular: true,
            odds: {
              home: "1.85",
              away: "1.90",
              overUnder: [
                { line: "210.5", over: "1.88", under: "1.92" },
                { line: "215.5", over: "1.98", under: "1.82" },
                { line: "220.5", over: "1.78", under: "1.72" },
                { line: "230.5", over: "1.68", under: "1.62" },
                { line: "240.5", over: "1.58", under: "1.52" },
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.85" },
                { line: "-2.5", home: "1.85", away: "1.90" },
                { line: "+1.5", home: "1.75", away: "1.50" },
                { line: "+2.5", home: "1.65", away: "1.70" },
                { line: "+3.5", home: "1.85", away: "1.60" },
              ],
            },
          },
        ],
      },
      {
        name: "US Open",
        popular: true,
        matches: [
          {
            home: "Novak Djokovic",
            away: "Casper Ruud",
            date: "2025-08-25",
            time: "14:30",
            popular: true,
            odds: {
              home: "1.78",
              away: "2.05",
              overUnder: [
                { line: "215.5", over: "1.88", under: "1.92" },
                { line: "220.5", over: "1.95", under: "1.90" },
                { line: "230.5", over: "1.75", under: "1.75" },
                { line: "240.5", over: "1.65", under: "1.85" },
                { line: "250.5", over: "1.85", under: "1.70" },
                { line: "260.5", over: "1.55", under: "1.65" },
              ],
              handicap: [
                { line: "-1.5", home: "2.00", away: "1.85" },
                { line: "-2.5", home: "1.80", away: "2.00" },
                { line: "-3.5", home: "1.95", away: "3.00" },
                { line: "+1.5", home: "1.75", away: "2.10" },
                { line: "+2.5", home: "1.85", away: "2.15" },
              ],
            },
          },
          {
            home: "Iga Świątek",
            away: "Emma Raducanu",
            date: "2025-08-26",
            time: "15:00",
            popular: true,
            odds: {
              home: "1.80",
              away: "2.00",
              overUnder: [
                { line: "210.5", over: "1.90", under: "1.88" },
                { line: "215.5", over: "1.95", under: "1.78" },
                { line: "220.5", over: "1.70", under: "1.98" },
                { line: "230.5", over: "1.75", under: "1.85" },
                { line: "240.5", over: "1.60", under: "1.80" },
                
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.85" },
                { line: "-2.5", home: "1.85", away: "1.70" },
                 { line: "-3.5", home: "1.70", away: "1.65" },
                { line: "+1.5", home: "1.65", away: "1.50" },
                 { line: "+2.5", home: "1.60", away: "1.95" },
                { line: "+3.5", home: "1.95", away: "1.90" },
              ],
            },
          },
        ],
      },

      { name: "Australian Open",
        popular: 
        true,
            matches: [
          {
            home: "Novak Djokovic",
            away: "Casper Ruud",
            date: "2025-08-25",
            time: "14:30",
            popular: true,
            odds: {
              home: "1.78",
              away: "2.05",
              overUnder: [
                { line: "215.5", over: "1.88", under: "1.82" },
                { line: "220.5", over: "1.75", under: "1.75" },
                { line: "230.5", over: "1.79", under: "1.85" },
                { line: "240.5", over: "1.65", under: "1.55" },
                { line: "250.5", over: "1.85", under: "1.75" },
                { line: "260.5", over: "1.95", under: "1.85" },
              ],
              handicap: [
                { line: "-1.5", home: "2.00", away: "1.85" },
                { line: "-2.5", home: "1.75", away: "2.00" },
                { line: "+1.5", home: "1.85", away: "2.00" },
                { line: "+2.5", home: "1.95", away: "2.00" },
                { line: "+3.5", home: "1.65", away: "2.00" },
              ],
            },
          },
          {
            home: "Iga Świątek",
            away: "Emma Raducanu",
            date: "2025-08-26",
            time: "15:00",
            popular: true,
            odds: {
              home: "1.80",
              away: "2.00",
              overUnder: [
                { line: "210.5", over: "1.70", under: "1.88" },
                { line: "215.5", over: "1.60", under: "1.78" },
                { line: "220.5", over: "1.50", under: "1.68" },
                { line: "230.5", over: "1.80", under: "1.98" },
                { line: "240.5", over: "1.70", under: "1.75" },
                
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.85" },
                { line: "+1.5", home: "1.85", away: "1.90" },
                 { line: "-2.5", home: "1.90", away: "1.85" },
                { line: "+2.5", home: "1.85", away: "1.90" },
                 { line: "-3.5", home: "1.90", away: "1.85" },
                { line: "+3.5", home: "1.85", away: "1.90" },
              ],
            },
          },
        ],
      },

      {
  name: "ITF World Tennis Tour",
  popular: false,
  matches: [
    {
      home: "Liam Broady",
      away: "Tomas Machac",
      date: "2025-05-11",
      time: "11:00",
      popular: false,
      odds: {
        home: "2.40",
        away: "1.65",
        overUnder: [
          { line: "175.5", over: "1.90", under: "1.90" },
          { line: "180.5", over: "1.92", under: "1.85" },
          { line: "185.5", over: "2.05", under: "1.75" },
          { line: "190.5", over: "2.25", under: "1.60" },
          { line: "195.5", over: "2.45", under: "1.55" },
          { line: "200.5", over: "2.60", under: "1.50" },
        ],
        handicap: [
          { line: "-1.5", home: "2.10", away: "1.80" },
          { line: "+1.5", home: "1.80", away: "2.10" },
          { line: "-2.5", home: "2.25", away: "1.65" },
          { line: "+2.5", home: "1.65", away: "2.25" },
          { line: "-3.5", home: "2.45", away: "1.55" },
          { line: "+3.5", home: "1.55", away: "2.45" },
        ],
      },
    },

    {
      home: "Arthur Fils",
      away: "Filip Misolic",
      date: "2025-05-12",
      time: "13:30",
      popular: false,
      odds: {
        home: "1.75",
        away: "2.05",
        overUnder: [
          { line: "178.5", over: "1.88", under: "1.92" },
          { line: "183.5", over: "1.90", under: "1.90" },
          { line: "188.5", over: "2.00", under: "1.75" },
          { line: "193.5", over: "2.20", under: "1.65" },
          { line: "198.5", over: "2.40", under: "1.55" },
          { line: "203.5", over: "2.60", under: "1.50" },
        ],
        handicap: [
          { line: "-1.5", home: "1.95", away: "1.85" },
          { line: "+1.5", home: "1.85", away: "1.95" },
          { line: "-2.5", home: "2.10", away: "1.70" },
          { line: "+2.5", home: "1.70", away: "2.10" },
          { line: "-3.5", home: "2.30", away: "1.60" },
          { line: "+3.5", home: "1.60", away: "2.30" },
        ],
      },
    },

    {
      home: "Dalma Galfi",
      away: "Eva Lys",
      date: "2025-05-13",
      time: "10:15",
      popular: false,
      odds: {
        home: "1.85",
        away: "1.95",
        overUnder: [
          { line: "170.5", over: "1.88", under: "1.92" },
          { line: "175.5", over: "1.92", under: "1.88" },
          { line: "180.5", over: "1.95", under: "1.85" },
          { line: "185.5", over: "2.10", under: "1.70" },
          { line: "190.5", over: "2.30", under: "1.60" },
          { line: "195.5", over: "2.55", under: "1.50" },
        ],
        handicap: [
          { line: "-1.5", home: "1.90", away: "1.90" },
          { line: "+1.5", home: "1.90", away: "1.90" },
          { line: "-2.5", home: "2.05", away: "1.75" },
          { line: "+2.5", home: "1.75", away: "2.05" },
          { line: "-3.5", home: "2.25", away: "1.60" },
          { line: "+3.5", home: "1.60", away: "2.25" },
        ],
      },
    }
  ],
},


        { 
        name: "French Open (Roland Garros)",
        popular: true, 
        matches: [
          {
            home: "Rafael Nadal",
            away: "Carlos Alcaraz",
            date: "2025-06-01",
            time: "13:00",
            popular: true,
            odds: {
              home: "2.10",
              away: "1.75",
              overUnder: [
                { line: "185.5", over: "1.88", under: "1.92" },
                { line: "190.5", over: "1.90", under: "1.90" },
                { line: "195.5", over: "1.92", under: "1.85" },
                { line: "200.5", over: "2.10", under: "1.70" },
                { line: "205.5", over: "2.35", under: "1.60" },
                { line: "210.5", over: "2.55", under: "1.55" },
              ],
              handicap: [
                { line: "-1.5", home: "2.15", away: "1.75" },
                { line: "+1.5", home: "1.75", away: "2.15" },
                { line: "-2.5", home: "2.30", away: "1.65" },
                { line: "+2.5", home: "1.65", away: "2.30" },
                { line: "-3.5", home: "2.55", away: "1.55" },
                { line: "+3.5", home: "1.55", away: "2.55" },
              ],
            },
          },

          {
            home: "Novak Djokovic",
            away: "Jannik Sinner",
            date: "2025-06-02",
            time: "14:30",
            popular: true,
            odds: {
              home: "1.80",
              away: "2.05",
              overUnder: [
                { line: "180.5", over: "1.85", under: "1.95" },
                { line: "185.5", over: "1.88", under: "1.92" },
                { line: "190.5", over: "1.90", under: "1.90" },
                { line: "195.5", over: "2.00", under: "1.75" },
                { line: "200.5", over: "2.15", under: "1.65" },
                { line: "205.5", over: "2.30", under: "1.60" },
              ],
              handicap: [
                { line: "-1.5", home: "1.95", away: "1.85" },
                { line: "+1.5", home: "1.85", away: "1.95" },
                { line: "-2.5", home: "2.10", away: "1.75" },
                { line: "+2.5", home: "1.75", away: "2.10" },
                { line: "-3.5", home: "2.25", away: "1.65" },
                { line: "+3.5", home: "1.65", away: "2.25" },
              ],
            },
          },

          {
            home: "Stefanos Tsitsipas",
            away: "Casper Ruud",
            date: "2025-06-03",
            time: "12:45",
            popular: true,
            odds: {
              home: "1.95",
              away: "1.85",
              overUnder: [
                { line: "175.5", over: "1.88", under: "1.92" },
                { line: "180.5", over: "1.90", under: "1.88" },
                { line: "185.5", over: "1.92", under: "1.85" },
                { line: "190.5", over: "2.05", under: "1.70" },
                { line: "195.5", over: "2.20", under: "1.65" },
                { line: "200.5", over: "2.40", under: "1.55" },
              ],
              handicap: [
                { line: "-1.5", home: "1.90", away: "1.85" },
                { line: "+1.5", home: "1.85", away: "1.90" },
                { line: "-2.5", home: "2.05", away: "1.75" },
                { line: "+2.5", home: "1.75", away: "2.05" },
                { line: "-3.5", home: "2.20", away: "1.65" },
                { line: "+3.5", home: "1.65", away: "2.20" },
              ]
            }
          }
        ]
      }
    ]
  }
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
      return basketballLeagues;
    case "tennis":
      return tennisLeagues;
    case "americafootball":
      return americanFootballLeagues;
    default:
      return footballLeagues;
  }
}