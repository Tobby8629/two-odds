import { useRef, useLayoutEffect } from "react";
import { TextInput, View, StyleSheet, Keyboard } from "react-native";

interface otpInt {
  length: number;
  onSubmit: (otp: string) => void;
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTPInput = ({ length, onSubmit, otp, setOtp }: otpInt) => {
  const inputs = useRef<(TextInput | null)[]>([]);

  // Log refs after render
  useLayoutEffect(() => {
    console.log("Refs after render:", inputs.current);
  }, [otp]);

  const handleChangeText = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      Keyboard.dismiss();
      onSubmit(updatedOtp.join(""));
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
          ref={(ref) => {
            if (ref) inputs.current[index] = ref; // ✅ safe assignment
          }}
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
