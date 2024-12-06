import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const Verify = (props: SvgProps) => (
  <Svg
    width={108}
    height={108}
    viewBox="0 0 108 108"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="mask0_331_2502"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={9}
      y={7}
      width={90}
      height={94}
    >
      <Path
        d="M53.9999 9L65.8191 17.622L80.4509 17.595L84.9441 31.518L96.7971 40.095L92.2499 54L96.7971 67.905L84.9441 76.482L80.4509 90.405L65.8191 90.378L53.9999 99L42.1806 90.378L27.5489 90.405L23.0556 76.482L11.2026 67.905L15.7499 54L11.2026 40.095L23.0556 31.518L27.5489 17.595L42.1806 17.622L53.9999 9Z"
        fill="white"
        stroke="white"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M38.25 54L49.5 65.25L72 42.75"
        stroke="black"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Mask>
    <G mask="url(#mask0_331_2502)">
      <Path d="M0 0H108V108H0V0Z" fill="#FFC107" />
    </G>
  </Svg>
);
export default Verify;


