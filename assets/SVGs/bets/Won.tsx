import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
const Won = (props: SvgProps) => (
  <Svg
    width={13}
    height={13}
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={6.5} cy={6.5} r={6.5} fill="#008000" />
    <Path
      d="M9.30566 4L5.18066 8L3.30566 6.18182"
      stroke="white"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default Won;
