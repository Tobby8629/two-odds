import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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

type PinMode = "change" | "set" | "reset";

const empty = () => Array(4).fill("");

const WithdrawalPin = () => {
  const [mode, setMode] = useState<PinMode>("change");

  const [currentPin, setCurrentPin] = useState<string[]>(empty);
  const [newPin, setNewPin] = useState<string[]>(empty);
  const [confirmPin, setConfirmPin] = useState<string[]>(empty);
  const [code, setCode] = useState<string[]>(empty);

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const setPin = useSetPin();
  const changePin = useChangePin();
  const forgotPin = useForgotPin();
  const resetPin = useResetPin();

  const isPending =
    setPin.isPending ||
    changePin.isPending ||
    forgotPin.isPending ||
    resetPin.isPending;

  const join = (value: string[]) => value.join("");
  const isFour = (value: string[]) => /^\d{4}$/.test(join(value));

  const switchMode = (next: PinMode) => {
    setMode(next);
    setError(null);
    setNotice(null);
    setCurrentPin(empty());
    setNewPin(empty());
    setConfirmPin(empty());
    setCode(empty());
  };

  const done = (message: string) => {
    setNotice(message);
    setError(null);
    setCurrentPin(empty());
    setNewPin(empty());
    setConfirmPin(empty());
    setCode(empty());
  };

  const handleSubmit = async () => {
    setError(null);
    setNotice(null);

    if (!isFour(newPin)) {
      setError("Your PIN must be 4 digits.");
      return;
    }

    if (join(newPin) !== join(confirmPin)) {
      setError("The two PINs do not match.");
      return;
    }

    try {
      if (mode === "set") {
        await setPin.mutateAsync({ pin: join(newPin) });
        done("Your withdrawal PIN has been set.");
        return;
      }

      if (mode === "change") {
        if (!isFour(currentPin)) {
          setError("Enter your current 4-digit PIN.");
          return;
        }

        await changePin.mutateAsync({
          currentPin: join(currentPin),
          newPin: join(newPin),
        });
        done("Your withdrawal PIN has been changed.");
        return;
      }

      if (!isFour(code)) {
        setError("Enter the 4-digit code sent to your email.");
        return;
      }

      await resetPin.mutateAsync({
        code: join(code),
        newPin: join(newPin),
      });
      done("Your withdrawal PIN has been reset.");
    } catch (e) {
      setError(pinErrorMessage(e, "Something went wrong. Please try again."));
    }
  };

  const handleForgot = async () => {
    setError(null);
    setNotice(null);

    try {
      await forgotPin.mutateAsync();
      switchMode("reset");
      setNotice("We sent a reset code to your email.");
    } catch (e) {
      setError(pinErrorMessage(e, "Could not send a reset code."));
    }
  };

  const title =
    mode === "set"
      ? "Set Withdrawal Pin"
      : mode === "change"
        ? "Change Withdrawal Pin"
        : "Reset Withdrawal Pin";

  const blurb =
    mode === "set"
      ? "Choose a 4-digit PIN. You will enter it to approve withdrawals."
      : mode === "change"
        ? "Enter your current PIN, then choose a new one."
        : "Enter the code we emailed you, then choose a new PIN.";

  const Field = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
  }) => (
    <View className="my-3 w-full items-center">
      <ThemedText className="text-gray-300 mb-2 text-sm">{label}</ThemedText>
      <OTPInput length={4} otp={value} setOtp={onChange} onSubmit={() => {}} />
    </View>
  );

  return (
    <Layout header="Withdrawal Pin" navigator="xmark">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText className="text-white mb-3 text-2xl font-semibold">
            {title}
          </ThemedText>

          <ThemedText className="text-gray-400 mb-4 text-center">
            {blurb}
          </ThemedText>

          {mode === "change" && (
            <Field label="Current PIN" value={currentPin} onChange={setCurrentPin} />
          )}

          {mode === "reset" && (
            <Field label="Email code" value={code} onChange={setCode} />
          )}

          <Field label="New PIN" value={newPin} onChange={setNewPin} />
          <Field label="Confirm new PIN" value={confirmPin} onChange={setConfirmPin} />

          {error && (
            <Text className="text-red-400 text-sm text-center mt-2">{error}</Text>
          )}

          {notice && (
            <Text className="text-green-400 text-sm text-center mt-2">{notice}</Text>
          )}

          <Button
            text={isPending ? "Please wait..." : "Confirm"}
            disable={isPending}
            onPress={handleSubmit}
            className="mt-6 w-1/2 mx-auto"
          />

          {mode !== "reset" && (
            <Pressable onPress={handleForgot} disabled={isPending}>
              <Text className="text-sec mt-4 text-sm underline">Forgot PIN?</Text>
            </Pressable>
          )}

          {/* No endpoint reports whether a PIN exists, so the mode is chosen here. */}
          <Pressable
            onPress={() => switchMode(mode === "set" ? "change" : "set")}
            disabled={isPending}
          >
            <Text className="text-gray-400 mt-4 text-xs underline">
              {mode === "set"
                ? "Already have a PIN? Change it"
                : "Setting a PIN for the first time?"}
            </Text>
          </Pressable>

          {notice && (
            <Button
              text="Done"
              onPress={() => router.back()}
              className="mt-6 w-1/2 mx-auto !bg-transparent border border-gray-500"
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default WithdrawalPin;

const styles = StyleSheet.create({});
