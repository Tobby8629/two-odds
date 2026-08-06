import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const GoldX = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.6875 5.6875L20.3125 20.3125"
      stroke="#FFA500"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.6875 20.3125L20.3125 5.6875"
      stroke="#FFA500"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default GoldX;
