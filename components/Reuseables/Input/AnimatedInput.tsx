import { Animated, TextInput, NativeSyntheticEvent, StyleSheet, Text, TextInputFocusEventData, View } from 'react-native'
import React, { useState } from 'react'

interface textinput {
  id: InputField
  onFocus?: () => void
  onBlur?: () => void
  onChangeText: (value: string, id?: InputField) => void 
  className?: string
  setShift?: React.Dispatch<React.SetStateAction<string>>;
  secure?: boolean
  placeholder: string
  inputStyle: string
}

const AnimatedInput = ({inputStyle, className, placeholder, id, secure, onChangeText, setShift}: textinput) => {
  const [focus, setFocus] = useState({
    [id]: false,
  });
  

  const [inputValue, setInputValue] = useState('')

  const animatedValue = React.useRef<Record<InputField, Animated.Value>>({
    email: new Animated.Value(0),
    password: new Animated.Value(0),
    confirm_password: new Animated.Value(0) 
  }).current;

  const handleFocus = (id: InputField) => {
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

  const handleBlur = (id: InputField) => {
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

  const getAnimatedStyle = (id: InputField) => ({
    transform: [
      {
        translateY: animatedValue[id].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -23], 
        }),
      },
    ],

    color: focus[id] ? 'gold' : '#999',
  });

  const update = (value: string) => {
    setInputValue(value); 
    onChangeText(value, id as InputField);
  };

  return (
      <View className={`w-[267px] h-[45px] mb-5 ${className}`} style={styles.inputWrapper}>
        <Animated.Text
          style={[styles.placeholder, getAnimatedStyle(id as InputField)]}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          id={id}
          onBlur={() => handleBlur(id as InputField)}
          secureTextEntry={secure}
          onFocus={() => handleFocus(id as InputField)}
          className={`w-full h-full rounded-xl p-2 ${inputStyle}`}
          value={inputValue}
          onChangeText={update}
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
    left: '5%',
    fontSize: 16,
    textTransform: "capitalize",
  },
});