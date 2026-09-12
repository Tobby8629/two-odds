import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KYC_ALERT_RED } from "@/constants/kyc";

interface SelectFieldProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  invalid?: boolean;
  variant?: "filled" | "outline";
  width?: number;
  inputHeight?: number;
  gap?: number;
  className?: string;
}

const SelectField = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  invalid,
  variant = "filled",
  width,
  inputHeight,
  gap = 7,
  className,
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const outline = variant === "outline";

  return (
    <View className={`mb-4 ${className ?? ""}`} style={width ? { width } : undefined}>
      <Text className="text-white text-sm" style={{ marginBottom: gap }}>
        {label}
      </Text>

      <Pressable
        onPress={() => setOpen(true)}
        className="rounded-md px-3 flex-row items-center justify-between"
        style={{
          height: inputHeight ?? 44,
          width: width ?? undefined,
          backgroundColor: outline ? "transparent" : "#fff",
          borderWidth: outline || invalid ? 1 : 0,
          borderColor: invalid ? KYC_ALERT_RED : outline ? "#FFFFFF" : "transparent",
        }}
      >
        <Text
          style={{
            color: value
              ? outline ? "#FFFFFF" : "#000000"
              : outline ? "#B9CBD9" : "#9AA8B5",
          }}
        >
          {value || placeholder}
        </Text>
        <Ionicons
          name="chevron-expand"
          size={16}
          color={outline ? "#FFFFFF" : "#0A3A5C"}
        />
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center px-8"
          onPress={() => setOpen(false)}
        >
          <View className="bg-white rounded-xl max-h-[60%] py-2">
            <ScrollView>
              {options.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className="px-5 py-3 flex-row items-center justify-between"
                >
                  <Text className="text-black text-base">{option}</Text>
                  {value === option && (
                    <Ionicons name="checkmark" size={18} color="#FFA500" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SelectField;
