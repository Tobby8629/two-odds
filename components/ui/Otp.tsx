// import { useRef, useLayoutEffect, useEffect } from "react";
// import { TextInput, View, StyleSheet, Keyboard } from "react-native";

// interface otpInt {
//   length: number;
//   onSubmit: (otp: string) => void;
//   otp: string[];
//   setOtp: React.Dispatch<React.SetStateAction<string[]>>;
// }

// const OTPInput = ({ length, onSubmit, otp, setOtp }: otpInt) => {
//   const inputs = useRef<(TextInput | null)[]>([]);

//   // Log refs after render
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       inputs.current[0]?.focus(); // 👈 This opens the keyboard automatically
//     }, 300);
//     return () => clearTimeout(timer);
//   },[]);



//   // const handleChangeText = (text: string, index: number) => {
//   //   if (!/^\d*$/.test(text)) return;

//   //   const updatedOtp = [...otp];
//   //   updatedOtp[index] = text;
//   //   setOtp(updatedOtp);

//   //   if (text && index < length - 1) {
//   //     inputs.current[index + 1]?.focus();
//   //   }

//   //   if (updatedOtp.every((digit) => digit !== "")) {
//   //     Keyboard.dismiss();
//   //     onSubmit(updatedOtp.join("") + inputs.current[0]?.props.value); // Call onSubmit with the complete OTP
//   //   }
//   // };

//   // const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }, index: number) => {
//   //   if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
//   //     const updatedOtp = [...otp];
//   //     updatedOtp[index - 1] = "";
//   //     setOtp(updatedOtp);
//   //     inputs.current[index - 1]?.clear();
//   //     inputs.current[index - 1]?.focus();
//   //   }
//   // };
// const handleChangeText = (text: string, index: number) => {
//   // Allow only numbers
//   if (!/^\d*$/.test(text)) return;

//   // Keep only the last entered digit
//   const digit = text.slice(-1);

//   const updatedOtp = [...otp];
//   updatedOtp[index] = digit;

//   setOtp(updatedOtp);

//   if (digit && index < length - 1) {
//     inputs.current[index + 1]?.focus();
//   }

//   if (
//     updatedOtp.length === length &&
//     updatedOtp.every((value) => value !== "")
//   ) {
//     const completedOtp = updatedOtp.join("");

//     Keyboard.dismiss();
//     onSubmit(completedOtp);
//   }
// };

// const handleKeyPress = (
//   { nativeEvent }: { nativeEvent: { key: string } },
//   index: number
// ) => {
//   if (nativeEvent.key !== "Backspace") return;

//   const updatedOtp = [...otp];

//   if (updatedOtp[index]) {
//     updatedOtp[index] = "";
//     setOtp(updatedOtp);
//     return;
//   }

//   if (index > 0) {
//     updatedOtp[index - 1] = "";
//     setOtp(updatedOtp);

//     inputs.current[index - 1]?.clear();
//     inputs.current[index - 1]?.focus();
//   }
// };

//   return (
//     <View style={styles.container}>
//       {otp.map((_, index) => (
//         <TextInput
//           key={index}
//           style={styles.input}
//           keyboardType="number-pad"
//           maxLength={1}
//           value={otp[index]}
//           onChangeText={(text) => handleChangeText(text, index)}
//           onKeyPress={(e) => handleKeyPress(e, index)}
//           ref={(ref) => {
//             if (ref) inputs.current[index] = ref; // ✅ safe assignment
//           }}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   input: {
//     width: 50,
//     height: 50,
//     marginHorizontal: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     textAlign: "center",
//     fontSize: 20,
//     borderRadius: 3,
//     backgroundColor: "#e2e8f0",
//     fontWeight: "bold",
//   },
// });

// export default OTPInput;


import { useEffect, useRef } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface OTPInputProps {
  length: number;
  onSubmit: (otp: string) => void;
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTPInput = ({
  length,
  onSubmit,
  otp,
  setOtp,
}: OTPInputProps) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const submittedOtp = useRef("");

  // Ensure the OTP state always has the correct number of fields
  useEffect(() => {
    if (otp.length !== length) {
      setOtp(Array.from({ length }, () => ""));
    }
  }, [length, otp.length, setOtp]);

  // Automatically focus the first input
  useEffect(() => {
    const timer = setTimeout(() => {
      inputs.current[0]?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Submit only after React updates all OTP digits
  useEffect(() => {
    const isComplete =
      otp.length === length &&
      otp.every((digit) => /^\d$/.test(digit));

    if (!isComplete) {
      submittedOtp.current = "";
      return;
    }

    const completedOtp = otp.join("");

    // Prevent duplicate submissions
    if (submittedOtp.current === completedOtp) return;

    submittedOtp.current = completedOtp;

    Keyboard.dismiss();
    onSubmit(completedOtp);
  }, [otp, length, onSubmit]);

  const handleChangeText = (text: string, index: number) => {
    const numbersOnly = text.replace(/\D/g, "");

    // Handle deleting the current value
    if (numbersOnly.length === 0) {
      setOtp((currentOtp) => {
        const updatedOtp = [...currentOtp];
        updatedOtp[index] = "";
        return updatedOtp;
      });

      return;
    }

    // Use the final typed digit
    const digit = numbersOnly.slice(-1);

    setOtp((currentOtp) => {
      const updatedOtp = [...currentOtp];
      updatedOtp[index] = digit;
      return updatedOtp;
    });

    if (index < length - 1) {
      requestAnimationFrame(() => {
        inputs.current[index + 1]?.focus();
      });
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key !== "Backspace") return;

    if (otp[index] !== "") {
      setOtp((currentOtp) => {
        const updatedOtp = [...currentOtp];
        updatedOtp[index] = "";
        return updatedOtp;
      });

      return;
    }

    if (index > 0) {
      setOtp((currentOtp) => {
        const updatedOtp = [...currentOtp];
        updatedOtp[index - 1] = "";
        return updatedOtp;
      });

      requestAnimationFrame(() => {
        inputs.current[index - 1]?.focus();
      });
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={styles.input}
          value={otp[index] ?? ""}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          maxLength={1}
          selectTextOnFocus
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 3,
    backgroundColor: "#e2e8f0",
    fontWeight: "bold",
  },
});

export default OTPInput;