export const betSlipOptionSwitches = (type: string) => {
  const value = type.toLowerCase();

  if (value.includes("over")) {
    return type;
  }

  if (value.includes("under")) {
    return type;
  }
  switch (type) {
    case("homeTeam"): return "Home";
    case("home"): return "Home";
    case("away"): return "Away";
    case("awayTeam"): return "Away";
    case("draw"): return "Draw"
    case("home_draw"): return "Home or Draw"
    case("away_draw"): return "Away or Draw"
    case("home_away"): return "Home or Away"
    default:
      null;
  }
}