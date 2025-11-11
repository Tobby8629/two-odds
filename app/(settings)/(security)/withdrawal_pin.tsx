import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Layout from "../Layout";
import { ThemedText } from "@/components/ThemedText";
import OTPInput from "@/components/ui/Otp";
import Button from "@/components/Reuseables/Button";

const WithdrawalPin = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const handleSubmit = () => {
    console.log("PIN entered:", otp.join(""));
  };


  return (
    <Layout header="Withdrawal Pin" navigator="xmark">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 items-center pt-24 px-6">
          <ThemedText className="text-white mb-5 text-2xl font-semibold">
            Enter Withdrawal Pin
          </ThemedText>

          <ThemedText className="text-gray-400 mb-6 text-center">
            Please enter your 4-digit withdrawal PIN below to proceed.
          </ThemedText>

        <View className="my-6">
          <OTPInput
            otp={otp}
            setOtp={setOtp}
            length={4}
            onSubmit={handleSubmit}
          />
        </View>

          <Button text="Confirm" onPress={handleSubmit} className="mt-6 w-1/2 mx-auto" />

          <Pressable onPress={() => console.log("Forgot PIN pressed")}>
            <Text className="text-sec mt-4 text-sm underline">
              Forgot PIN?
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default WithdrawalPin;

const styles = StyleSheet.create({});
