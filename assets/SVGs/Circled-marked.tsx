import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CircledMarked = ({...props}) => (
  <Svg
    width={87}
    height={87}
    viewBox="0 0 87 87"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M43.5 0C19.4753 0 0 19.4753 0 43.5C0 67.5247 19.4753 87 43.5 87C67.5247 87 87 67.5247 87 43.5C87 19.4753 67.5247 0 43.5 0ZM55.5114 41.6096L38.2202 58.9008L38.2111 58.8918L37.2487 59.8506L37.236 59.8397L37.2233 59.8506L35.0664 57.6973L35.0791 57.6828L21.0159 43.6196L24.9944 39.6412L37.2614 51.9118L51.5348 37.6366L51.5185 37.6203L61.9875 27.1494L65.9768 31.1406L55.5114 41.6096Z"
      fill="#FFC107"
    />
  </Svg>
);
export default CircledMarked;
