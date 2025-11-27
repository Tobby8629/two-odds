import { BettingMarket, sports } from "@/interface";
import BasketBall from "./BasketBall";
import AmericaFootball from "./AmericaFootball";
import Football from "./Football";
import { useSport } from "@/store/useSports";
import { Match } from "@/constants/dataOne";


interface InterfaceSwitchProps {
  selectedsport: sports;
  markets: BettingMarket[];
  setMarkets: React.Dispatch<React.SetStateAction<BettingMarket[]>>;
}

const interfaceSwitch = ({ selectedsport, markets, setMarkets }: InterfaceSwitchProps) => {
  const { dataArry } = useSport();
  const matches: Match[] = dataArry
  .flatMap(c => c.leagues)
  .flatMap(l => l.matches)
  .filter((m): m is Match => m !== undefined);

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
