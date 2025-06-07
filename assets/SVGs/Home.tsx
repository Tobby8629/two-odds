import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Home = ({ color = "#010101", ...props}: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8913 10L11.89 3.99867L5.88867 10H5.89001V20H17.89V10H17.8913ZM19.89 11.9987V20C19.89 21.1046 18.9946 22 17.89 22H5.89001C4.78545 22 3.89001 21.1046 3.89001 20V11.9987L2.4132 13.4755L1 12.0623L10.477 2.58529C11.2574 1.8049 12.5226 1.8049 13.303 2.58529L22.78 12.0623L21.3668 13.4755L19.89 11.9987Z"
      fill={color}
    />
  </Svg>
);
export default Home;
