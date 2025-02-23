import { Animated, TextInput, StyleSheet,  View } from 'react-native'
import React, { useState } from 'react'

interface textinput {
  type?: InputField
  id: InputID
  onFocus?: () => void
  onBlur?: () => void
  onChangeText: (value: string, id?: InputID) => void 
  className?: string
  setShift?: React.Dispatch<React.SetStateAction<string>>;
  secure?: boolean
  placeholder: string
  inputStyle?: string
}

const AnimatedInput = ({inputStyle, id,  className, placeholder, type, secure, onChangeText, setShift}: textinput) => {
  const [focus, setFocus] = useState({
    [id]: false,
  });
  

  const [inputValue, setInputValue] = useState('')

  const animatedValue = React.useRef<Record<InputID, Animated.Value>>({
    email: new Animated.Value(0),
    password: new Animated.Value(0),
    confirm_password: new Animated.Value(0),
    reset_code: new Animated.Value(0), 
  }).current;

  const handleFocus = (id: InputID) => {
    setFocus((prev) => ({ ...prev, [id]: true }));
    Animated.timing(animatedValue[id], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if(setShift) {
      setShift("mt-[-200px]")
    }
  };  

  const handleBlur = (id: InputID) => {
    if (inputValue === '') {
      setFocus((prev) => ({ ...prev, [id]: false }));
      Animated.timing(animatedValue[id], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if(setShift) {
      setShift("mt-[0]")
    }
  };

  const getAnimatedStyle = (id: InputID) => ({
    transform: [
      {
        translateY: animatedValue[id].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25], 
        }),
      },
    ],

    color: focus[id] ? '#111827fc' : '#999',
    backgroundColor: focus[id] ? '#fbac0bf2' : 'transparent',
    // padding: focus[id] ? "0px, 2px" : 0,
    zIndex: 999,
    
  });

  const update = (value: string, id: InputID) => {
    setInputValue(value); 
    onChangeText(value, id);
  };

  return (
      <View className={`w-[85%] mx-auto h-[55px] ${className}`} style={styles.inputWrapper}>
        <Animated.Text
          className="font-bold px-2 py-[1px] rounded-xl"
          style={[styles.placeholder, getAnimatedStyle(id as InputID)]}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          id={id}
          onBlur={() => handleBlur(id as InputID)}
          secureTextEntry={secure}
          onFocus={() => handleFocus(id as InputID)}
          className={`w-full h-full rounded-xl p-2 ${inputStyle}`}
          value={inputValue}
          onChangeText={(value)=>update(value, id)}
        />
      </View>
      )
}

export default AnimatedInput

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },

  inputWrapper: {
    position: 'relative',
  },
  placeholder: {
    position: 'absolute',
    zIndex: 99,
    top: '35%',
    left: '3%',
    fontSize: 16,
    textTransform: "capitalize",
  },
});

// #111827fc
// #fbac0b