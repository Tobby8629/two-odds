import * as React from "react";
import Svg, { Image as SvgImage, Rect, SvgProps } from "react-native-svg";

const PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADOklEQVR4nO2ZO2gUURSGJ8S3jTY2IoIIgg/EVKIgCBY+wG5F8VFGEFOIBHfOHVjQxtouVSRkzx2nUFSwUUinBuKDmDlnE6LRmCqBaKr4HrmbbNxMJm52HslMcn/4m2Vyzv3u45y5E8PQ0tLS0tIqq9A+tA4ktwLSh7Ilt6rfjGUnz2sQdimnIIVkr9og6TNIbs45XqOxHCRs9xhIfu0HnWNkV02KkVVZ6O4B5Mc1QeeCPwObmoysSMh32wRym0D6VTfsDDT9EUhOvti/w0ir8sXezQL5NkiaDA3qP9/I39XkFToGtxhpUcHpW6OKjkAajQs0wOMg6cY1Z3h9KiuvSMhLVtHFQitvUl6sim6FrbzJgSdT0UUclXfac2NHhY6xoucTqLyxA8dV0a2ie1JVx7i3YVLAVR5XY68LNud4jSBpLM6BgOSXIOmqPxcU6YpAfhErNNJoXZU8NwU8EQ8oTQqkc7VyiiJfju3oIH2tu3UJ6V5UqwySP6prXGhgmy75Y7c8GVgb9BJhYulMhB3UqlZWjdnE0gUjlDyv4d8EhJlpdqtjmDbtrd6+0738UHVKtfXD5AoacySF3M53fDGeB6zMl8Kjng2VZwCpEAk4LolwwLdmx6Duec7ciJD0XjlssUwJMN+tjpF3+naCpIcC6VvYs5pqYIE0er3j7UZ/LPWbafNRISkPyE+F5B/LA1iWVxkLXV2r/he70P5mk0BuUe0k88CibOq2kE/X+kKpLidhoVMGzNOrTRMg+QEgmcJ2j6iPB/48IFksG2ARMAHqHM8Ctqkps8AgqRck9ygL5E/zPWfapcMzeTrd7ZkFttA9UPl7q5P3Bd2nQdJvy+FdlefApoOZBQYkszoGIJ0SyK8q4CB5wLTp7Kw8yDezCyxpDJz+rf5YzW09q4MuD2o7q1fNzAKLqVUm0+nbXSu+ZffvB6TBsHlSAyymrN6k7gubzwdfCekeIP+MkiNtwN58A0sqrgauVysC2FJfLpGG4hpU4kYaAlk6ERoYkIeXHKJ+6BENvFCp7bGY/x2M6vJYsXR8wYBaWlrZlpW1vhu1L0MW21CUNgUrDlhmq+/WMui+rKWlpaWlZaRJfwF+AiHOHxLV9QAAAABJRU5ErkJggg==";

const BvnIcon = ({ ...props }: SvgProps) => (
  <Svg width={32} height={30} viewBox="0 0 32 30" fill="none" {...props}>
    <Rect width={32} height={30} rx={5} fill="#E7F0FA" />
    <SvgImage
      x={6}
      y={5}
      width={19}
      height={19}
      preserveAspectRatio="none"
      href={{ uri: PNG }}
    />
  </Svg>
);

export default BvnIcon;
