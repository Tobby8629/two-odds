import { BettingMarket, MatchProps, sports } from "@/interface";
import BasketBall from "./BasketBall";
import AmericaFootball from "./AmericaFootball";
import Football from "./Football";

interface InterfaceSwitchProps {
  selectedsport: sports;
  matches: MatchProps[];
  markets: BettingMarket[];
  setMarkets: React.Dispatch<React.SetStateAction<BettingMarket[]>>;
}

const interfaceSwitch = ({ selectedsport, matches, markets, setMarkets }: InterfaceSwitchProps) => {
  switch (selectedsport) {
    case "basketball":
      return <BasketBall matches={matches} markets={markets} setMarkets={setMarkets} />;
    case "americafootball":
      return <AmericaFootball  />;
    case "tennis":
      return <BasketBall matches={matches} markets={markets} setMarkets={setMarkets}/>;
    default:
      return <Football matches={matches} markets={markets} setMarkets={setMarkets}/>; 
  }
};

export default interfaceSwitch;
