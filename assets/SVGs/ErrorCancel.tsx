import Svg, {
  SvgProps,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const ErrorCancel = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={48} height={48} fill="url(#pattern0_764_1902)" />
    <Defs>
      <Pattern
        id="pattern0_764_1902"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_764_1902" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_764_1902"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACn0lEQVR4nO3dTWrDQAwFYK1LL2RteuYWunM3vVGD9ioBB7IwIbHn5z1JD7zX+LNg4iGySKVSqVQqlUqlUqnEy5uIfInIh/BGReRbRN4lAMaPiLiIGCmKisjftoZfZpR7DCdF0TsMZ0bZw2BD0R0MSpRHGCwo+gCDCuUZDHQUfQKDAuUVDFQUfQEDGuUIBhqKHsCARDmDgYKiJzCgUFpgzEbRBhgQKC0xZqFoQ4ypKD0wfDBKD4wpKD0xfBBKT4yhKCMwvDPKCIwhKCMxvBPKSIyuKDMwvDHKDIwuKDMxvBHKTIzmKJ+TF+Lbddlu7BGMC0D9vt3L01kAni4/2ClKXHs4FCWsOSyKEtUaHkUJakyDosC1pUNRwJqGBmk7eQGr5cj2PFynOMA1+6CtUAQM45bsnWJIGNlRDBEjK4ohY2RDMQaMLCjGhBEdxRgxoqIYM0Y0FIuAEQXFImGwo1hEDFYUi4zBhmIZMFhQLBMGOoplxEBFscwYAnbs6tlB0DA8MwoqhmdEQcfwTCgsGJ4BhQ3DI6OwYnhEFHYMj4QSBcMjoETDcGaUqBjOiBIdw5lQsmA4A0o2DEdGyYrhiCjZMRwJpTAEB6X+0iY4f2lD6gzbnkqk4+ChnYKIcUs6FGSMdCgMGGlQmDDCozBihEapAWaCNcDsOuJvJX+6FoBOaT53cSVv9SXKEMyZKNZ4hzIDpfvs3pV8D79EGaQ8EsU6/8odgTJ8/vtK/h5oiTKMvyeKDX593QNl+jdEVvKzhCXKB11aosw+bVuifPKoBcpsjBYoUBhnUFAwzqBAYhxBQcM4ggKN8QoKKsYrKBQYz6CgYzyDQoXxCIUF4xEKJcYeChvGHgo1xj3K58zx2w2i2xqua6lUKpVKpVKpVCoViZR/OA3RWfvvChoAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default ErrorCancel;
