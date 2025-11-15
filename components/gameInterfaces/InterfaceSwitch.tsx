import { sports } from "@/interface";
import BasketBall from "./BasketBall";
import Tennis from "./Tennis";
import AmericaFootball from "./AmericaFootball";
import Football from "./Football";

const interfaceSwitch = (selectedsport: sports) => {
  switch (selectedsport) {
    case "basketball":
      return <BasketBall />;
    case "americafootball":
      return <AmericaFootball />;
    case "tennis":
      return <Tennis />;
  
    default:
      return <Football />
      break;
  }
}

export default interfaceSwitch