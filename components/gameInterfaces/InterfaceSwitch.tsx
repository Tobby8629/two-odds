import { BettingMarket, sports } from "@/interface";
import BasketBall from "./BasketBall";
import AmericaFootball from "./AmericaFootball";
import Football from "./Football";
import { useSport } from "@/store/useSports";
import { SportId } from "@/hooks/idCheck";
import { useMatches } from "@/hooks";
import SolidRoundSpinner from "../Reuseables/SolidSpinner";
import { Match as Matchh } from "@/constants/dataOne";
import { useEffect } from "react";
import { Match } from "@/hooks/matchInterface/matchInterface";


interface InterfaceSwitchProps {
  id: string
  markets: BettingMarket[];
  setMarkets: React.Dispatch<React.SetStateAction<BettingMarket[]>>;
}

const interfaceSwitch = ({ markets, setMarkets,id }: InterfaceSwitchProps) => {
 
  const { menuSelectedsport: selectedsport} = useSport()
  const matches = useMatches(id).data?.data as Match[]
  const { refetch } = useMatches(id)
  const { isLoading } = useMatches(id)
  // const { dataArry } = useSport()
  // const matchh: Matchh[] = dataArry
  // .flatMap(c=>c.leagues)
  // .flatMap(l=>l.matches)
  // .filter((m): m is Matchh => m !== undefined) 
  // const { isLoading} = useMatches(selectedsport)
  const  name  = SportId(selectedsport)
  // console.log(selectedsport)
  useEffect(()=>{
    refetch()
  },[id])
  if(isLoading ) return <SolidRoundSpinner />
  if(!isLoading && matches)
  switch (name) {
    case "Basketball":
      return <BasketBall matches={matches} markets={markets} setMarkets={setMarkets} />;
    case "football":
      return <AmericaFootball  />;
    case "Tennis":
      return <BasketBall matches={matches} markets={markets} setMarkets={setMarkets}/>;
    default:
      return <Football matches={matches} markets={markets} setMarkets={setMarkets}/>; 
  }
};

export default interfaceSwitch;
