import * as React from "react";
import Svg, { Image as SvgImage, Rect, SvgProps } from "react-native-svg";

const PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVR4nO2aTYwURRTHH6gBokKINw9c8BuO3DiyngwHQghE1IMHgxoV+chOvzdxDHDchBDksDG4gJl6Y588oAkaRQ/qykL4mn5v2IQAawyBgwZZdwkoY2pmQ9ZhcLqnu6Ra+5e8ZDLpqq5/vXrVVa8KoKCgoKDgf8z2T/VRNLKGjA4Ty4/IepFYJ60h6zga+SioNVZC3tl66NTDZLSMLNeItdnLkPXAa8PHH4I8UmJ5iljOxxH6N9FGD0HeCGqynIxcTSp2lv2CRr/Fqq4F33k3nFiArPUUYjtM9oDPkNEd2Ym9M8xfBR956/PxechyxYHgy3bkgG8QR+uzFntHtI/xTKz7XAkm1g/BN5D1uDMPGzkGvoEsPzvzsJGr4BvIMu1Q8A3wDTR63aHg38A30Ig4jOEG+Aax7HcmmPUA+AZWdbVDD68BTzcNtx3E7+2yiZaBbyDLV84mLdYvwDfI6CWHMXwRfAONfukuhvUI+AYa2exQ8NvgG5WRC/OJ9RsHk9bXdusJvkJGwgzFhuA7AeuLWQkOarIBfKdy9OiDyHImvXc1yk3aNjDyfKpFiC1biwYgT5CRXSm8uwPyRqXSnIusH/Qhdq8tC3mFEgqGvEOFYC0E039FMNWigcSLDY5WQR4phfUn0OhEH7P0JeLxpZAXBsPzi4illCaLacsiy6CtC3ykEtYfaZ8tyScz1xmaGdlku85ovX3HfRVZOiiPYU1emdkdZSmyu9dZpm2Socz6TsXo4/+OymZzDhp5AVk/IyN/uBZ57zhvvfuwbYttkxOtaHQFsYylbOhU6wzKaGSt/Vum0nWAjNm2ZSo2MLoVjd7qYxheIyMjgWm8VA716W7esOvmoNp4xj5jE+5xb/10THK3iGVLJmKRlZI3QBpU04027ZP0ffa0nzh62d7hSt7BSqkXDsjyZ4Kevo5GN9kkQBaJBOLG60k+b7at/S9cms05xHI6fnzqiXI1evKfqlwXNh8YDOtL7CmFNfvb/tf7zpeeTDC6TvU1kVGCZSEa+a7y8fjCbvWU+dyzyLITWUe7niG3JjIdtZv+VpzfczGj38fu/H6yJcQyFNOzZ+19ys7y1oMzn6/4qZ72s4eDsP5c1zubse+AyVBiwWh7vXfM/n5X41qhoNuI9WbSSWeW3ew2684c2PX+jBn9oQ/B8lOMnnyvs5y9PZdCaKftvrt+fT+GIyYSC6YePWm/l6XqmcUdZd7MUGz7PVV5ozOekfXXHqExlVhwQUFBQQHcf/4ClWIWx48nCWUAAAAASUVORK5CYII=";

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
