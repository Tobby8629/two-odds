import * as React from "react";
import Svg, {
  SvgProps,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const AmericanFootball = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={30} height={30} fill="url(#pattern0_878_1807)" />
    <Defs>
      <Pattern
        id="pattern0_878_1807"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_878_1807" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_878_1807"
        width={48}
        height={48}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVklEQVR4nO2Zz2oTURSHv1J00UIUbal/wJUWV6LtTlBcSNtIF4roxpWx7YvoGxSF0jcodlXtezRJFal9gIKNixaaGOqVCycwDDPJvTPnTgLOB4cwSebO75x77jl3ZqCkpKTkf2UauA/MA7eBG8AYI8oksAysA3vAKWAS7DewDVQZAWw0l4BdoJ0i2PSxHaAyDOEXgRWgmUG0SXCiUB4B3xSEm4gtFiH8MrAB/FUWb4Ct0OJtBfkRQLgROw5ZnZ4ArYDijdhMCPGvgU4B4o3MsnrkO55psBf7zh67zp5teGrc9Uyb40gKrAJd+bTMOI71QLPaHHpOv410lDux44bDGFe1HNjImMNrKeOtOZx7otmkstb5bkLk7XHX4dy61vbAtcPa/z0HPgDnYrUcM7Cp4cA7j2i/iJ0XFx8vifUB473JK952wX0PB973GasWq0LXZAudNtYf4EpeB6qe+Z6WMjX5LZrbrQFjfUWBXc8m5eqAiy1q3Em1PZtU2oJFFrar+IbGJm7Zs0nFF2hNFnKPlx4OvEWB9RxNqpcy5xJ5W52+O4pvSunOzaASl7dJmZQi8BAlThwu2CuJWZqUSbBPWuKnFDZqLjNoInYAXNJyYN7hgq0+W+VBTSqpos2iyJzjhVsJkXZpUlGzpfoxysxmzGFfawOvCMD1AsT/ChH5HmOSl6HE/5Tb06BsBxBu6/zHop57VpXFNzSblCs7CsLrsre5wBCoAJ8ziD4DvgALo/Li4qk8aD1KEdyRFLEbwGfABCPMTeCe5LNteLeA8WGLKikpKaFw/gEtLOOASBfKaQAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default AmericanFootball;
