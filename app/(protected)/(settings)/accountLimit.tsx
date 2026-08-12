import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LimitStatusCard } from "./accountLimit/LimitStatusCard";
import { TimePeriodDropdown } from "./accountLimit/TimePeriodDropdown";
import { AmountInput } from "./accountLimit/AmountInput";
import { InfoModal } from "./accountLimit/InfoModal";
import Layout from "./Layout";
import { Ionicons } from "@expo/vector-icons";
import { useAccountLimitStore } from "@/store/accountLimitStore";
import {
  useDepositLimits,
  useUpdateDepositLimits,
} from "@/hooks/useDepositLimits";
import { CURRENCY_SYMBOLS } from "@/constants/functions";

export default function AccountLimitScreen() {
  const {
    selectedPeriod,
    selectedCurrency,
    amount,
    setSelectedPeriod,
    setAmount,
    error,
    setError,
  } = useAccountLimitStore();

  const [showInfo, setShowInfo] = useState(false);

  const { limits, isPending: isLoadingLimits } =
    useDepositLimits(selectedCurrency);

  const { mutateAsync: updateLimits, isPending: isSaving } =
    useUpdateDepositLimits();

  const symbol = CURRENCY_SYMBOLS[selectedCurrency];

  /*
   * Prefill from the saved limit whenever the period changes, and again once
   * the limits finish loading, otherwise the first render prefills from an
   * empty cache and the field stays blank.
   */
  useEffect(() => {
    const saved = limits[selectedPeriod];

    setAmount(saved !== null ? String(Number(saved)) : "");
  }, [selectedPeriod, limits, setAmount]);

  const validate = () => {
    if (!amount || isNaN(Number(amount))) {
      setError("Invalid amount");
      return false;
    }

    if (Number(amount) < 5) {
      setError(`Minimum is ${symbol}5`);
      return false;
    }

    if (Number(amount) > 999999) {
      setError("Amount too large");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      /*
       * Only the period being edited is sent. Including the others would
       * resend stale values, and an explicit null removes a limit.
       */
      await updateLimits({
        currency: selectedCurrency,
        [selectedPeriod]: Number(amount),
      });

      setError(null);
    } catch {
      setError("Could not update your deposit limit. Please try again.");
    }
  };

  return (
    <Layout header="Account Limit">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust for header
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, alignItems: "center" }}
        >
          {/* Deposit Limits Row with Ionicons */}
          <View
            style={{
              width: 342,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: "#9CA3AF",
              paddingBottom: 8,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "400",
                marginRight: 6,
              }}
            >
              Deposit Limits
            </Text>
            <TouchableOpacity onPress={() => setShowInfo(true)}>
              <Ionicons name="help-circle-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Status Card */}
          <View
            style={{
              width: 342,
              borderBottomWidth: 1,
              borderBottomColor: "#9CA3AF",
              marginBottom: 24,
              
            }}
          >
            <LimitStatusCard onInfoPress={() => setShowInfo(true)} />
          </View>

          {/* Unified Form Card */}
          <View
            style={{
              width: 342,
              borderRadius: 8,
              paddingTop: 25,
              paddingRight: 15,
              paddingLeft: 15,
              paddingBottom: 25,
              gap: 5,
              backgroundColor: "#E3F2FD",
            }}
          >
            {/* Time Period Dropdown */}
            <TimePeriodDropdown value={selectedPeriod} onChange={setSelectedPeriod} />

            {/* Amount Input */}
            <AmountInput />

            {/* Submit Button */}
            <TouchableOpacity
              disabled={isSaving || isLoadingLimits}
              onPress={handleSubmit}
              style={{
                backgroundColor: "#FFA500",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
                opacity: isSaving || isLoadingLimits ? 0.6 : 1,
              }}
            >
              {isSaving ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "400" }}
                >
                  Update Deposit Limits
                </Text>
              )}
            </TouchableOpacity>

            {/* Error Message */}
            {error && (
              <Text style={{ color: "red", textAlign: "center", marginTop: 8 }}>
                {error}
              </Text>
            )}
          </View>

          {/* Info Modal */}
          <InfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}