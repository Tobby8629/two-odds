import * as React from "react";
import Svg, { SvgProps, Rect } from "react-native-svg";
const Bar = (props: SvgProps) => (
  <Svg
    width={131}
    height={4}
    viewBox="0 0 131 4"
    fill="none"
    {...props}
  >
    <Rect width={131} height={4} rx={2} fill="#010101" />
  </Svg>
);
export default Bar;
