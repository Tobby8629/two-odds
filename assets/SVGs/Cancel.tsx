import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Cancel = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.75806 17.2438L12.0011 12.0008L17.2441 17.2438M17.2441 6.75781L12.0001 12.0008L6.75806 6.75781"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Cancel;
