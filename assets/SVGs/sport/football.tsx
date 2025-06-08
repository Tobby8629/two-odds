import * as React from "react";
import Svg, {
  SvgProps,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const Football = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={30} height={30} fill="url(#pattern0_878_1798)" />
    <Defs>
      <Pattern
        id="pattern0_878_1798"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_878_1798" transform="scale(0.0104167)" />
      </Pattern>
      <Image
        id="image0_878_1798"
        width={96}
        height={96}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD+klEQVR4nO2cS29OQRzGn6Y7bFVV4hZqKZraoOISO9r4AkLcViglLCwslGr5CtgIli6NBE1dvoBLXBPlEyiqtKUZ+SfTt01zZt5z5sx5z4w+v2RWnZ7z/z/Pmcs7M+cAhBBCCCGEEEIIIYQQQgghhJBplgPoA/AawE8AqqRioqx4RItXAHoBLEMB1AE4DWC8xCRVwAbMLGMATvk24HIAialIDJgq0hq8sDuAZFSEBkhp99H1vA8gERWpAW+1hs60BpCEitgAKevyGHA4gARU5AYczGPA2QASUJEbIBo6cy6ABFTkBoiGNAA0gC3ABXZBYBekOAaUP5ApDsLli67m4iwoDfUAFgPYBeAmgMmCEpkAMACgyxJLl64zUVAMktsNADt1zpJ7cLQAGPKY9AiAHgALM8TQoFcjRzzG8SnvskItafBkwp2MwifFcdeT+HniKIXWHN3RXwBH8q4kauQanfqart1ONE/+bG45JryngFj2Oj4Q0udHS7tDwkcLjOeYQzwy4JZGml/Csk/cbfj/pozJ3kvR7Wxz/Bv0tfszxiSznSQupNwjr8linGxEJ1GfIdFvABZZYmkG8EzXNaF0HalrQgT9kSEu01RzPLTVUJsoaUqP5RqbAQxnuJfUbbPU66thXlEYMGZp6mtmiZ/2XsOWlrAkwxM8Jwx4aOmzn+e411PLmPKYBqAilOkg0w4PZpsG5jM0ABWRNhhEuu7BgKuGuptoACoirTCI9NGDAR8MdVfSAFREmmcQ6ZcHA0YNdefTAFREEjGSGPVggKyIJrGABqAmXZAcrUyCXRCqD8LXOAiXOw3d7uFeWwx1OQ3FtEiPDCLVzVj/cTHgieWH2EANHqxofgmP65XTJJodlyK+cikivQEKwCWLsG1a0LQGSN2Nnt74iaIF+FiO/g6g0RLLat2lVBNlEMAqS52m/205WgI5b0lWZSj9KTZktlr+Zhpwp5BrP8gYk2mVtrsWGzJ56ciYrNLbhkXR6RCPnHeKltsOCU8C2FdALPsdN+XlsFmUrM9xLGUSwHGPx1K6csYih82iQvZ2vzgmrGaU+1X2iavR6LAJn1SG9CGvaJ78zx6SVjM+A9CX0QgR/ornzykM6cNmwVGvZzsdus8v6nDuHz3FrHY4d1DXLSKGST0mtOucCz+cyzdkkNs0vqSHYloDDUigbLHZAlC+4OyCUL7oHAMQTuEgjIgN4Mc6UO7HOg4F0IRVQjGhAiwH8hjQEkACKnID1uZdSXwXQBIqUgPeoKRNFRoAv++X9QYguoqsBVyEZ04C+B1AYipwA0SjEyiIZfr4yEvPnwFQkRsgWrzQ77ktLUp8QgghhBBCCCGEEEIIIYQQQhAd/wB7k6ens7uVlwAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default Football;
