import * as React from "react";
import Svg, { Image as SvgImage, Rect, SvgProps } from "react-native-svg";

const PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAACbklEQVR4nO2azWoUQRDHGy9+4MWLwa+LF08qXjyKR7140IcQIol4cZPqgfEFBMkLRBKnKjsKgsQVn8BLTqtbvRsEQa8qmoOioCO9i4j71TOzmZ30bP2hLjPd/+7f1k731NBKiUQikcgzaXp9ShM/0cg7mkySJoD4A6C5H8ZvDivfYAHNp7SgA4Hm1UJje7/yRdpmNi/s32wjh8oX6Qx/49FZ5m9LUee08kF6UtiyA3kHyDwNYnNmNoD/xWe7Hs0SsM12PFPAQPx1poA1mUSA+1X2BAWY9h7wT0B+EGDrQvhs61C49vaojsxNIP5eOWAg/hWguTbUZ6N1CYgfVwpYI6+O8wrDZB+QeV4dYDKXnX7YvlIZ4KWoecTlt4zNucoA34nfH3T52TaVAV7G9jmXX/DInHX4bELcOaEyKlzfPqmRG1MFBmpfdfnZNuM87MSzwv7/KWqqGW7OTfoMewWskW85/dAsODwaeaC7396IX0wb+Des87FRXvaebZNnsdmtULsK3HvbWhkJTLxSJqwuqniAyNzo9wmIr5cNqwuslu4NZBc5LBtWF5dhnh8Ajng+ZX9/9mHdDa6Hq+8ODHvDSlMtebMtAZqXEHUuuvxsG9vWa2BAs5h1cgGZ217uw0DmocopQLM26SKUNdSkwMFG53xe4BSFxN4D1p6FEuA+lT1BASYBTgSYBDgR4LyHWgDND42tuyGa4zaAuNa9VvDEc42L/EW5ZA+EjB2YuDbYh2uFA+cal+tOYHv6pXcgZLiJ/XX7+9hrRQPnGPdj6qKkW3Yhx/aMRNpnomjgtOP25sz1ScpOkUgkEolEIpHKoT8/PGsh37zniwAAAABJRU5ErkJggg==";

const NinIcon = ({ ...props }: SvgProps) => (
  <Svg width={32} height={30} viewBox="0 0 32 30" fill="none" {...props}>
    <Rect width={32} height={30} rx={5} fill="#E7F0FA" />
    <SvgImage
      x={6}
      y={5}
      width={20}
      height={20}
      preserveAspectRatio="none"
      href={{ uri: PNG }}
    />
  </Svg>
);

export default NinIcon;
