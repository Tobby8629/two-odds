import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const UserLogo = (props: SvgProps) => (
  <Svg
    width={22}
    height={20}
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11 12C13.7614 12 16 9.31371 16 6C16 2.68629 13.7614 0 11 0C8.23858 0 6 2.68629 6 6C6 9.31371 8.23858 12 11 12Z"
      fill="white"
    />
    <Path
      d="M20.8 17.0992C19.9 15.2992 18.2 13.7992 16 12.8992C15.4 12.6992 14.7 12.6992 14.2 12.9992C13.2 13.5992 12.2 13.8992 11 13.8992C9.79997 13.8992 8.79997 13.5992 7.79997 12.9992C7.29997 12.7992 6.59997 12.6992 5.99997 12.9992C3.79997 13.8992 2.09997 15.3992 1.19997 17.1992C0.499973 18.4992 1.59997 19.9992 3.09997 19.9992H18.9C20.4 19.9992 21.5 18.4992 20.8 17.0992Z"
      fill="white"
    />
  </Svg>
);
export default UserLogo;
