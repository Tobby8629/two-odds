import * as React from "react";
import Svg, {
  SvgProps,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const Tennis = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={30} height={30} fill="url(#pattern0_878_1800)" />
    <Defs>
      <Pattern
        id="pattern0_878_1800"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_878_1800" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_878_1800"
        width={48}
        height={48}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO2YW4hOURTHf4zcc4mR8YS+IsSglER5pJRJueSF70XxoBSSkpQUkVsI86ikpEwuTcw7QuFBJoomMS7lmsHM1q711Wo35/i+sfYxp86/Vn2dvc9a//8561t7nQUFChQo0N8xGGgEGsghFgEdgBNrBurI0ZPvUOQrtrkGH0OAZcB24DzQClwFzgF7gcUxH0hjL+S9Xani3jnAWeBjgg9t74CjQL21gIaEgGdS7pkgxH9XQTy0z8AuYKCliOYgyFdgWsLeJcD7PhB3gbUAo6wE1EnO+7Q5nUJ+A9BlQN6JPY6RUqSQ7zEk78TuAENjk18K/IxA3okdi0ne5+nLiOQd0A0siCXgUGTyTuxaDPLjpSJlIaAHKFkL2JIReSe2w1rAzYwFtFgLeJuxgBeW5EdkTN4B363LZ8XxD+BNBgK6rNvsblUh5mUg4jXGaFfO5wMzIotosxZwQTnfJ9diijhpLaBJOX+qrscSsdxawHD5A1cCTI4oohMYRAS0qSCrgzVLEQeJhOMqyNZe1i1EdAJjYpD33623VKCNCfv+VcSmGORHS2/i1FkwNWV/X0VcAgZYk58JPAsCnVDrE+VcmBIEr1XEPWCYNfkVMvrQT36/pNNs+YbVJD7IMGCNtB/Virgr4xlT7FTtg7cvwCpZK1UxwPK9zAPgyV/2XZRm0RSHgyDPgVmyNlJGIJrofaketeT7K2AtETA3CHQbGCdrPscvq7Vvsh9JK/97N/AwgfQvqWRlaRCjYJsKeCM4EfcEhNan+PG1fKEMeptEnH970VFWBNvVyG9lMMw6Qj9FPfBJEX0kkzhdjVpj9SpWWJcyOvRnwlhygHLQfTr5sJ9OjlACTgHXgQPApP9NqECBAuQffwAIZMFHxsnHHgAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default Tennis;
