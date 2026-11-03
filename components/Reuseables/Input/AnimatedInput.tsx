// import { Animated, TextInput, StyleSheet,  View, Pressable } from 'react-native'
// import React, { useRef, useState } from 'react'
// import { InputField, InputID } from '@/interface'

// interface textinput {
//   type?: InputField
//   id: InputID
//   onFocus?: () => void  
//   onBlur?: () => void
//   onChangeText: (value: string, id?: InputID) => void 
//   className?: string
//   setShift?: React.Dispatch<React.SetStateAction<string>>;
//   secure?: boolean
//   placeholder: string
//   inputStyle?: string
// }

// const AnimatedInput = ({inputStyle, id, className, placeholder, type, secure, onChangeText, setShift}: textinput) => {
//   const [focus, setFocus] = useState({
//     [id]: false,
//   });
  

//   const [inputValue, setInputValue] = useState('')
//   const inputRef = useRef<TextInput | null>(null);
//   const animatedValue = React.useRef<Record<InputID, Animated.Value>>({
//     email: new Animated.Value(0),
//     password: new Animated.Value(0),
//     confirm_password: new Animated.Value(0),
//     reset_code: new Animated.Value(0), 
//   }).current;

//   const handleFocus = (id: InputID) => {
//     setFocus((prev) => ({ ...prev, [id]: true }));
//     Animated.timing(animatedValue[id], {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();

//     if(setShift) {
//       setShift("mt-[-200px]")
//     }
//   };  

//   const handleBlur = (id: InputID) => {
//     if (inputValue === '') {
//       setFocus((prev) => ({ ...prev, [id]: false }));
//       Animated.timing(animatedValue[id], {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     }
//     if(setShift) {
//       setShift("mt-[0]")
//     }
//   };

//   const getAnimatedStyle = (id: InputID) => ({
//     transform: [
//       {
//         translateY: animatedValue[id].interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, -25], 
//         }),
//       },
//     ],

//     color: focus[id] ? '#111827fc' : '#999',
//     backgroundColor: focus[id] ? '#fbac0bf2' : 'transparent',
//     // padding: focus[id] ? "0px, 2px" : 0,
//     zIndex: 999,
    
//   });

//   const update = (value: string, id: InputID) => {
//     setInputValue(value); 
//     onChangeText(value, id);
//   };

//   return (
//       <Pressable onPress={()=>inputRef.current?.focus() } className={`w-[85%] mx-auto h-[55px] ${className}`} style={styles.inputWrapper}>
//         <Animated.Text
//           className="font-bold px-2 py-[1px] rounded-xl"
//           style={[styles.placeholder, getAnimatedStyle(id as InputID)]}
//         >
//           {placeholder}
//         </Animated.Text>
//         <TextInput
//           id={id}
//           ref={(el) => {
//             inputRef.current = el as TextInput;
//           }}
//           onBlur={() => handleBlur(id as InputID)}
//           secureTextEntry={secure}
//           onFocus={() => handleFocus(id as InputID)}
//           className={`w-full h-full rounded-xl p-2 ${inputStyle}`}
//           value={inputValue}
//           onChangeText={(value)=>update(value, id)}
//         />
//       </Pressable>
//       )
// }

// export default AnimatedInput

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 16,
//   },

//   inputWrapper: {
//     position: 'relative',
//   },
//   placeholder: {
//     position: 'absolute',
//     zIndex: 99,
//     top: '35%',
//     left: '3%',
//     fontSize: 16,
//     textTransform: "capitalize",
//   },
// });

// // #111827fc
// // #fbac0b



import {
  Animated,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { InputField, InputID } from "@/interface";

interface AnimatedInputProps {
  type?: InputField;
  id: InputID;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText: (value: string, id?: InputID) => void;
  className?: string;
  setShift?: React.Dispatch<React.SetStateAction<string>>;
  secure?: boolean;
  placeholder: string;
  inputStyle?: string;
}

const AnimatedInput = ({
  inputStyle,
  id,
  className,
  placeholder,
  type,
  secure,
  onChangeText,
  setShift,
  onFocus,
  onBlur,
}: AnimatedInputProps) => {
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<TextInput>(null);

  // Each input has its own animation
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Animate floating label
  const animateLabel = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Handle input focus
  const handleFocus = () => {
    setFocus(true);
    animateLabel(1);

    if (setShift) {
      setShift("mt-[-200px]");
    }

    onFocus?.();
  };

  // Handle input blur
  const handleBlur = () => {
    setFocus(false);

    if (inputValue.trim() === "") {
      animateLabel(0);
    }

    if (setShift) {
      setShift("mt-[0]");
    }

    onBlur?.();
  };

  // Handle text changes
  const update = (value: string) => {
    setInputValue(value);
    onChangeText(value, id);

    // Keep label floating when input contains text
    if (value.length > 0) {
      animateLabel(1);
    } else if (!focus) {
      animateLabel(0);
    }
  };

  // Floating label animation
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

 const animatedStyle = {
  transform: [{ translateY }],
  color:
    focus || inputValue.length > 0
      ? "#111827fc"
      : "#999",
  backgroundColor:
    focus || inputValue.length > 0
      ? "#fbac0bf2"
      : "transparent",
  zIndex: 999,
};

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      className={`w-[85%] mx-auto h-[55px] ${className ?? ""}`}
      style={styles.inputWrapper}
    >
      <Animated.Text
        pointerEvents="none"
        className="font-bold px-2 py-[1px] rounded-xl"
        style={[styles.placeholder, animatedStyle]}
      >
        {placeholder}
      </Animated.Text>

      <TextInput
        ref={inputRef}
        secureTextEntry={secure}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full h-full rounded-xl p-2 ${inputStyle ?? ""}`}
        value={inputValue}
        onChangeText={update}
        autoCapitalize={
          id === "email" ? "none" : "sentences"
        }
        keyboardType={
          id === "email" ? "email-address" : "default"
        }
        autoCorrect={false}
      />
    </Pressable>
  );
};

export default AnimatedInput;

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
  },
  placeholder: {
    position: "absolute",
    zIndex: 99,
    top: "35%",
    left: "3%",
    fontSize: 16,
    textTransform: "capitalize",
  },
});
