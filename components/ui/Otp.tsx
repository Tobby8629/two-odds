import { router } from "expo-router";
import React, { useState, useRef } from "react";
import { TextInput, View, StyleSheet, Keyboard } from "react-native";

const OTPInput = ({ length = 4, onSubmit }: { length?: number; onSubmit: (otp: string) => void }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // Allow only numbers

    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    // Move to the next input if there's a value
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // If OTP is fully entered, submit it
    if (updatedOtp.every((digit) => digit !== "")) {
      Keyboard.dismiss();
      onSubmit(updatedOtp.join(""));
      router.replace('/Onboarding/Verified')
    }
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }, index: number) => {
    if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
      inputs.current[index - 1]?.clear();
      inputs.current[index - 1]?.focus();
    }
  };



  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[index]}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(ref) => (inputs.current[index] = ref)}
          className="bg-slate-200 text-4xl font-bold"
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
    
    borderRadius: 3,
  },
});

export default OTPInput;
