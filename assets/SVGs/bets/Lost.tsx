import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
const Lost = (props: SvgProps) => (
  <Svg
    width={13}
    height={13}
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={6.5} cy={6.5} r={6.5} fill="#FF1414" />
    <Path
      d="M5 4.5L9 8.5"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 8.5L9 4.5"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Lost;
