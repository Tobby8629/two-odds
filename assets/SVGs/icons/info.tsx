import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const Info = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_1672_2796)">
      <Path
        d="M7.99992 14.6673C11.6818 14.6673 14.6666 11.6825 14.6666 8.00065C14.6666 4.31875 11.6818 1.33398 7.99992 1.33398C4.31802 1.33398 1.33325 4.31875 1.33325 8.00065C1.33325 11.6825 4.31802 14.6673 7.99992 14.6673Z"
        stroke="white"
        strokeOpacity={0.8}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6.00001C6 3.66665 9.66667 3.66667 9.66667 6.00001C9.66667 7.66667 8 7.33327 8 9.33327"
        stroke="white"
        strokeOpacity={0.8}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 12.0111L8.01 12"
        stroke="white"
        strokeOpacity={0.8}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1672_2796">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Info;
