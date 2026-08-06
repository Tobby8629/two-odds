import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const QuestionMarkCircle = ({...props}) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_1680_3093)">
      <Path
        d="M8.00016 14.6654C11.682 14.6654 14.6668 11.6806 14.6668 7.9987C14.6668 4.3168 11.682 1.33203 8.00016 1.33203C4.31826 1.33203 1.3335 4.3168 1.3335 7.9987C1.3335 11.6806 4.31826 14.6654 8.00016 14.6654Z"
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
      <ClipPath id="clip0_1680_3093">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default QuestionMarkCircle;
