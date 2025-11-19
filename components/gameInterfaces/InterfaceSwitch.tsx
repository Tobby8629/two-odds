import { Match, sports } from "@/interface";
import BasketBall from "./BasketBall";
import Tennis from "./Tennis";
import AmericaFootball from "./AmericaFootball";
import Football from "./Football";

interface InterfaceSwitchProps {
  selectedsport: sports;
  matches: Match[];
}

const interfaceSwitch = ({ selectedsport, matches }: InterfaceSwitchProps) => {
  switch (selectedsport) {
    case "basketball":
      return <BasketBall matches={matches} />;
    case "americafootball":
      return <AmericaFootball />;
    case "tennis":
      return <Tennis matches={matches} />;
    default:
      return <Football />; 
  }
};

export default interfaceSwitch;
