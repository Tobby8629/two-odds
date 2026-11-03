import * as React from "react";
import Svg, { Image as SvgImage, SvgProps } from "react-native-svg";

const PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVR4nO3VSwrCMBCA4f8Iiq70PIqih+qyIoiH0IsoHsKFig9aly51NVKIICFNS5NGFAdmU2b6kUnTQPWIgNihvzIqKuNPoBIKjwxo8JWLyuAhf/jn4e+PPnC0nFPXvAJjE5zUiIrK1AS/F5w8TvKsvTsXztCBR3io4blwUXSBJXBTuQA6JfrEBW4DB8Pe7YFWnfDc8uHMfMEbYK3V2I5bNgks/VIWzppWWs3DAt+1Wr1fXEZt2t9X7gp6xQWeWuBJnXAT2BrQ7FnDFT6rQ+8rRsClDBz8l5kGuCQSEzxWV1dd6BHoeZzkPygVT3Jx9K2p3BQpAAAAAElFTkSuQmCC";

const MoneyTransfer = ({ ...props }: SvgProps) => (
  <Svg width={15} height={18} viewBox="0 0 15 18" fill="none" {...props}>
    <SvgImage
      width={15}
      height={18}
      preserveAspectRatio="none"
      href={{ uri: PNG }}
    />
  </Svg>
);

export default MoneyTransfer;
