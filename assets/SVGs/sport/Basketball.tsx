import * as React from "react";
import Svg, {
  SvgProps,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const Basketball = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={30} height={30} fill="url(#pattern0_878_1805)" />
    <Defs>
      <Pattern
        id="pattern0_878_1805"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_878_1805" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_878_1805"
        width={48}
        height={48}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfElEQVR4nO2ZSWsUURDHfxMXvCmSnDR6MI4YF7yol+AaUERz1k/gchBXcnHJ0cSbBL+AiRKNHvUqelTPatQPYDwYx4PiMiMF1VA8Znp93TPC+8ODoaq6qv7d0/WqXkNAQEBAQI9hDbAf2GVk8nuf6noSg8BN4D3Q0jVh9BNGLjY39JquYwMwD/w1CSYRiNYf4FG3iPQBl4DvbRJLSyBa4uOi+qwEK4EHMQllJdDS9RhYVXbyy4FnKZLJQ6ClviVGqRgCZkogcE99V4bjwJIHAl+BY2UnWwcuAwOOfBuwWIDAZ2Cr43NAY0lMb3iiARtafWpGtwf4mYPAD2C3samp74bqpTx7wRag6QSXKrTC2FzNQUDucgTxNefom76ewu0Oj3/a2Ejl+JiBwIJTbe52iDHlg8BCzAt40NidzUDgtNEdjvH/zkerEFf6nhvbfuB3CgK/gLVG9zIhxvoiBI4mOG86vcybFAReGfnGFPvDkSIEpMLcSljDxv6UkY8a+aiRnzTy4RT+JYeA/xY7gfGEtcnYjxn5iJGPGLnYRBhK4V9y6KmX+HWVL/FgBWX0RUKMdRSEnXPddcDYncuwkZ0xukNlbmRxrcQdp5f5lIHAB6eVmO4QY9IHgXqbZm7WSWA8RzN3xbkB7pgqMTfjCfPq9BtwwWmn9+Zsp+Uau0nVdLiP2mk5sfA+0MiLarED+FJgoFkEtjs++8sYaNphTJ9I0ZFyCThBhaiXdKxy3+d/vlvHKk+BZVUcbM2WQGBGfVeCPq1GDQ8EGsB5p7JVBpmWHupBbVYCcs2cj1bBF5HruvU3YwiI7i1wreioWCZW68eMdh84RBcQEBAQQM/gH+gBC9tSSaH5AAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default Basketball;
