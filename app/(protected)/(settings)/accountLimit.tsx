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

export default function AccountLimitScreen() {
  const {
    limits,
    selectedPeriod,
    amount,
    setSelectedPeriod,
    setAmount,
    setLimit,
    error,
    setError,
  } = useAccountLimitStore();

  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Prefill amount when changing period
  useEffect(() => {
    if (selectedPeriod && limits[selectedPeriod] !== null) {
      setAmount(String(limits[selectedPeriod]));
    } else {
      setAmount("");
    }
  }, [selectedPeriod]);

  const validate = () => {
    if (!amount || Number(amount) < 5) {
      setError("Minimum is $5");
      return false;
    }

    if (isNaN(Number(amount))) {
      setError("Invalid amount");
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

    setLoading(true);

    setTimeout(() => {
      setLimit(selectedPeriod, Number(amount)); // update Zustand store
      setLoading(false);
      setAmount(""); // reset form
    }, 1000);
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
              disabled={loading}
              onPress={handleSubmit}
              style={{
                backgroundColor: "#FFA500",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              {loading ? (
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