import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native';

const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    // Cleanup listeners on unmount
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  return (
    {
      isKeyboardVisible
    }
  )
}

export default useKeyboard