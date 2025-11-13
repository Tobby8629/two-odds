import { CountryLeagues, sports } from "@/interface";
import { LeagueTemplate } from "./template";
import { footballLeagues } from "@/constants/dataOne";
import { FontAwesome6 } from "@expo/vector-icons";

export const popular = (arry: CountryLeagues[]) => {
  const list = arry.filter((e)=> e.popular === true)
  return list
}


 export const allsport = (selectedsport: sports) => {
    switch (selectedsport) {
      case "basketball":
        
        return (
          <LeagueTemplate<CountryLeagues>
            subHeader={2}
            header1= "popular leagues"
            header2= "All leagues"
            sport={<FontAwesome6 name="basketball" color="gold"/>}
            firstArr={popular(footballLeagues)}
            secArr={footballLeagues}
          />
        )
        
        break;
    
      default:
        
        return (
          <LeagueTemplate<CountryLeagues>
            subHeader={2}
            header1= "popular leagues"
            header2= "All leagues"
            sport={<FontAwesome6 name="futbol" color="gold"/>}
            firstArr={popular(footballLeagues)}
            secArr={footballLeagues}
          />
        )
        break;
    }
  }