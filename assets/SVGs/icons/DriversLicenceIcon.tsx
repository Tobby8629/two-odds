import * as React from "react";
import Svg, { Image as SvgImage, Rect, SvgProps } from "react-native-svg";

const PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADQUlEQVR4nO2aPWgUURDHJ2jEbwJaqLGxtlAsRMRWSMSPykIEyxBNCkUEfe9gm4iNhQiCsYl63rxjqxgFC4uAoga9GIvLzF5AAyYi0SrxOygrL4mYu8tedt/exd1zf7Dd483/v+9jZpcBSEhISEiIMZadXyEUdQrFA1LxZ6nYLXqQRoVyWmutI5UZPqBjlcXXmpCfSaQOrTVUEAt5i1D8coEgRY9QNAY1RiKNL6ZDIg+KNG0OsbK8qNmlMqxj+NPCubbuXKNJgE5fAZDeSHRaauKySI/TOhPLhyapnJMGAXigeBLq01scIoawC80C+V6J6afBJ0L+VLSSdqEZIoqVHtlacpFOBZ5ElmwTiDih9crEcAhct+EC0n6pKD17ydFXgfxeKL5pnEaiatjKOBuFogeVbnmBdDqFw9tNY1RFr5xX1WhRJiIsO782QC7/JZFTJnGqolfovKdobCbhG+ZZidTlL2/ON25WplZDbyiO2u4yoehjYMPIDyGOpLKFHUHNzm3tb1Z//3KIGxKdFhPD+rHs/CaIG1LxXmPD6ZH1EDfO3n61RiB/CW6YXkNckYqvBTaM1AVxRSBdMbi0rkJcEeWfbX4M34W4IpFTgQ1n6BTEFasvt7pSHb3A+e3VBQvEGZGlXb5X905+J9QDQvENH2f3OtQLZ+y3q4Six95bmR/pMVBPWD1DTZ6VVc9QE9Qj0sMw1CWu2+Bp2HUboN6QWT5eIR0dg3rh/C3aIBVdloqnK9zS03qMHgtxxOoZXSkyfEgi2QL5R4DC46f+4yGydOJcL6+DqGPpP5RIF4WiycBfSeXmpwTyJT0nRBGZcfYJRROhjZYXJBN6bogS0na2VWVVvU1P6hgQFSSyqpXZv6YZITJlIwa4mMzP9Hd9GdbMiFDOEYn0QZ+hFPJhz3FZ2lNzs39WOVPYHVavJ0LRu3lvd9xznE4/S2Q4pehgWL2elAaDiBNar0wMR5vEcFAk0tR/1dQiStqW9D/mKJqeM3s/dNuSROrwWRD8617L8nyN3G7UeiiRB30FiEqv5Wy7w3Oj1kON7rDRvYvx6bWkF6G7gtq6c426d1EgPSntzotCr6XWNKet3XhlExISEhIgGvwGtNnECOCPQyYAAAAASUVORK5CYII=";

const DriversLicenceIcon = ({ ...props }: SvgProps) => (
  <Svg width={32} height={30} viewBox="0 0 32 30" fill="none" {...props}>
    <Rect width={32} height={30} rx={5} fill="#E7F0FA" />
    <SvgImage
      x={6}
      y={5}
      width={20}
      height={20}
      preserveAspectRatio="none"
      href={{ uri: PNG }}
    />
  </Svg>
);

export default DriversLicenceIcon;
