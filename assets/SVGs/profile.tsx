import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Profile = ({color, ...props}: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 14C14.7614 14 17 11.3137 17 8C17 4.68629 14.7614 2 12 2C9.23858 2 7 4.68629 7 8C7 11.3137 9.23858 14 12 14Z"
      fill={color}
    />
    <Path
      d="M21.8 19.0992C20.9 17.2992 19.2 15.7992 17 14.8992C16.4 14.6992 15.7 14.6992 15.2 14.9992C14.2 15.5992 13.2 15.8992 12 15.8992C10.8 15.8992 9.79997 15.5992 8.79997 14.9992C8.29997 14.7992 7.59997 14.6992 6.99997 14.9992C4.79997 15.8992 3.09997 17.3992 2.19997 19.1992C1.49997 20.4992 2.59997 21.9992 4.09997 21.9992H19.9C21.4 21.9992 22.5 20.4992 21.8 19.0992Z"
      fill={color}
    />
  </Svg>
);
export default Profile;
