import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import Layout from "../Layout";
import { ThemedText } from "@/components/ThemedText";
import OTPInput from "@/components/ui/Otp";
import Button from "@/components/Reuseables/Button";
import {
  pinErrorMessage,
  useChangePin,
  useForgotPin,
  useResetPin,
  useSetPin,
} from "@/hooks/useWithdrawalPin";

/** change = current PIN then new PIN. reset = emailed code then new PIN. set = first PIN only. */
type PinMode = "change" | "reset" | "set";
type PinStep = "first" | "second";

const empty = () => Array(4).fill("");

const WithdrawalPin = () => {
  const [mode, setMode] = useState<PinMode>("change");
  const [step, setStep] = useState<PinStep>("first");

  const [first, setFirst] = useState<string[]>(empty);
  const [newPin, setNewPin] = useState<string[]>(empty);
  const [error, setError] = useState<string | null>(null);
  const [needsFirstPin, setNeedsFirstPin] = useState(false);

  const setPin = useSetPin();
  const changePin = useChangePin();
  const forgotPin = useForgotPin();
  const resetPin = useResetPin();

  const isPending =
    setPin.isPending ||
    changePin.isPending ||
    forgotPin.isPending ||
    resetPin.isPending;

  const value = step === "first" ? first : newPin;
  const setValue = step === "first" ? setFirst : setNewPin;
  const complete = /^\d{4}$/.test(value.join(""));

  const title =
    step === "second" || mode === "set"
      ? "Create New Pin"
      : mode === "reset"
        ? "Enter Reset Code"
        : "Enter Withdrawal Pin";

  const blurb =
    step === "second" || mode === "set"
      ? "Choose a 4-digit PIN. You will use it to approve withdrawals."
      : mode === "reset"
        ? "Enter the 4-digit code we sent to your email."
        : "Enter your current 4-digit withdrawal PIN to continue.";

  const handleConfirm = async () => {
    if (!complete || isPending) return;

    setError(null);

    if (step === "first" && mode !== "set") {
      setStep("second");
      return;
    }

    try {
      if (mode === "set") {
        await setPin.mutateAsync({ pin: value.join("") });
      } else if (mode === "change") {
        await changePin.mutateAsync({
          currentPin: first.join(""),
          newPin: newPin.join(""),
        });
      } else {
        await resetPin.mutateAsync({
          code: first.join(""),
          newPin: newPin.join(""),
        });
      }

      Alert.alert(
        mode === "set" ? "Withdrawal PIN created" : "Withdrawal PIN updated",
        undefined,
        [
          { text: "OK", onPress: () => router.back() },
        ]
      );
    } catch (e) {
      const message = pinErrorMessage(
        e,
        "Something went wrong. Please try again."
      );

      /* The backend only tells us the account has no PIN by rejecting. */
      if (mode === "change" && /no pin/i.test(message)) {
        setNeedsFirstPin(true);
        setError(null);
      } else {
        setError(message);
      }

      setStep("first");
      setFirst(empty());
      setNewPin(empty());
    }
  };

  const handleForgot = async () => {
    if (isPending) return;

    setError(null);

    try {
      await forgotPin.mutateAsync();
      setMode("reset");
      setStep("first");
      setFirst(empty());
      setNewPin(empty());
      Alert.alert("Reset code sent", "Check your email for a 4-digit code.");
    } catch (e) {
      setError(pinErrorMessage(e, "Could not send a reset code."));
    }
  };

  return (
    <Layout header="Withdrawal Pin" navigator="xmark">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 items-center pt-16 px-6">
          <ThemedText className="text-white mb-3 text-2xl font-semibold">
            {title}
          </ThemedText>

          <ThemedText className="text-gray-400 mb-10 text-center text-xs">
            {blurb}
          </ThemedText>

          <OTPInput
            key={`${mode}-${step}`}
            length={4}
            otp={value}
            setOtp={setValue}
            onSubmit={() => {}}
          />

          {error && (
            <Text className="text-red-400 text-sm text-center mt-6">
              {error}
            </Text>
          )}

          {needsFirstPin && (
            <View className="items-center mt-6">
              <Text className="text-gray-300 text-xs text-center">
                You haven't set a withdrawal PIN yet.
              </Text>

              <Button
                text="create pin"
                textStyle="lowercase !text-base !font-normal"
                className="mt-3 !w-[200px] !h-[38px] rounded-md !bg-sec"
                onPress={() => {
                  setNeedsFirstPin(false);
                  setError(null);
                  setFirst(empty());
                  setNewPin(empty());
                  setMode("set");
                  setStep("first");
                }}
              />
            </View>
          )}

          <Button
            text={isPending ? "please wait" : "confirm"}
            disable={!complete || isPending}
            onPress={handleConfirm}
            textStyle="lowercase !text-base !font-normal"
            className={`mt-12 !w-[200px] !h-[38px] rounded-md ${
              !complete || isPending ? "!bg-cus-purple" : "!bg-sec"
            }`}
          />

          {/* Only the current-PIN screen offers a reset. */}
          {step === "first" && mode === "change" && (
            <Pressable onPress={handleForgot} disabled={isPending}>
              <Text className="text-sec mt-4 text-xs">Forgot Pin?</Text>
            </Pressable>
          )}

        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default WithdrawalPin;

const styles = StyleSheet.create({});
