import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycStep } from "@/store/kycFormStore";

const STEPS = ["Personal Info", "Document", "Address"];

/** Circle is ticked once passed, amber while current, grey ahead. */
const Stepper = ({ step }: { step: KycStep }) => (
  <View className="flex-row items-center justify-center px-4 mb-6">
    {STEPS.map((label, i) => {
      const done = i < step;
      const current = i === step;

      return (
        <View key={label} className="flex-row items-center">
          <View className="items-center" style={{ width: 78 }}>
            <View
              className="w-7 h-7 rounded-full items-center justify-center"
              style={{
                backgroundColor: done || current ? "#FFC107" : "#2E5A7F",
              }}
            >
              {done ? (
                <Ionicons name="checkmark" size={16} color="#0A3A5C" />
              ) : (
                <Text
                  className="text-xs font-semibold"
                  style={{ color: current ? "#0A3A5C" : "#9FB6C9" }}
                >
                  {i + 1}
                </Text>
              )}
            </View>

            <Text
              numberOfLines={1}
              className="text-[10px] mt-1"
              style={{ color: done || current ? "#FFC107" : "#9FB6C9" }}
            >
              {label}
            </Text>
          </View>

          {i < STEPS.length - 1 && (
            <View
              style={{
                width: 26,
                height: 1,
                marginBottom: 14,
                backgroundColor: i < step ? "#FFC107" : "#2E5A7F",
              }}
            />
          )}
        </View>
      );
    })}
  </View>
);

export default Stepper;
