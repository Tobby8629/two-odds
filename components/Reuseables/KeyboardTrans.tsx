import { Animated, Easing, Keyboard, KeyboardEvent, useWindowDimensions } from "react-native";
import { useEffect, useRef } from "react";

interface RNKeyboardEvent {
  endCoordinates: { height: number };
  duration: number;
  easing: string;
}

const useKeyboardTranslation = (extraOffset = 10) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const onKeyboardShow = (e: RNKeyboardEvent) => {
    const keyboardHeight = e.endCoordinates.height;
    Animated.timing(translateY, {
      toValue: -(keyboardHeight - extraOffset),
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease
    }).start();
  };

  const onKeyboardHide = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", onKeyboardShow as any);
    const hideSub = Keyboard.addListener("keyboardDidHide", onKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return {translateY};
};

export default useKeyboardTranslation;
