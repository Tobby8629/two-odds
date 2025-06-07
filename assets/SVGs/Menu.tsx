import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const Menu = ({ color = "#010101", ...props}: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_1037_2127)">
      <Path
        d="M21 18.0008V20.0008H3V18.0008H21ZM17.05 3.55078L22 8.50078L17.05 13.4508V3.55078ZM12 11.0008V13.0008H3V11.0008H12ZM12 4.00078V6.00078H3V4.00078H12Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1037_2127">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Menu;
