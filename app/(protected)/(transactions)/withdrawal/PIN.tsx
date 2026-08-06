import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import OTPInput from "@/components/ui/Otp";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Reuseables/Button";
import { router } from "expo-router";
import Cancel from "@/assets/SVGs/Cancel";
import Header from "@/components/Reuseables/Header";
import { useWithdrawal } from "@/store/useStore";

const PIN = () => {
  const isPending = false;
  const { updateWithdrawStatus } = useWithdrawal();
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));

  const handleSubmit = (code: string) => {
    console.log("Submitted OTP:", code);
    updateWithdrawStatus();
    router.push("/(tabs)");
  };

  return (
    <View className="h-screen bg-pry">
      <Header>
        <Pressable onPress={() => router.back()}>
          <Cancel />
        </Pressable>
        <ThemedText className="w-[90%] text-center font-semibold text-2xl">
          Withdrawal
        </ThemedText>
      </Header>

      <View className="justify-center mt-[20%]">
        <ThemedText className="text-center font-semibold text-2xl mb-5">
          Enter Withdrawal Pin
        </ThemedText>
        <ThemedText className="text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </ThemedText>

        <View className="my-5">
          <OTPInput length={4} otp={otp} setOtp={setOtp} onSubmit={handleSubmit} />
        </View>

        <Button
          disable={isPending}
          text={isPending ? "Verifying" : "Confirm"}
          onPress={() => handleSubmit(otp.join(""))}
          className={` m-auto mt-14 h-[45px] rounded-3xl ${
            isPending ? "bg-gray-400" : "bg-sec"
          } `}
        />

        <Pressable>
          <ThemedText className="!text-sec text-center text-xl my-3">
            Forgot Pin?
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
};

export default PIN;

const styles = StyleSheet.create({});
