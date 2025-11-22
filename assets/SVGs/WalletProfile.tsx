import * as React from "react";
import Svg, {
  SvgProps,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const WalletProfile = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Rect width={20} height={20} fill="url(#pattern0_2384_2854)" />
    <Defs>
      <Pattern
        id="pattern0_2384_2854"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_2384_2854" transform="scale(0.0333333)" />
      </Pattern>
      <Image
        id="image0_2384_2854"
        width={30}
        height={30}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3VsQmAMBBG4Ve5hDqITqCb6T6ivW6ixDVOhAgWFgbFA3MP/jL5mkDAirEEaIEVkAebQuHmIXhsDIWdP1jwceJXasHy0hag1oD3zVqwGHyVwRK4DkiBDOi/hLPTXXkUcO/xHR2ieFxiMDdhpwU3Wt9i4nH3Ilrdga1/tQEirqIJujpQ5QAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default WalletProfile;
