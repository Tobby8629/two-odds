import React from "react";
import { Text, TextInput, View } from "react-native";
import { KYC_ALERT_RED } from "@/constants/kyc";

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "number-pad";
  multiline?: boolean;
  maxLength?: number;
  optional?: boolean;
  /** Turns the border red when the field is required and empty. */
  invalid?: boolean;
  /** "outline" is the white-border, white-text style used on the address step. */
  variant?: "filled" | "outline";
  width?: number;
  inputHeight?: number;
  gap?: number;
  className?: string;
  /** Android tints autofilled fields yellow; off by default here. */
  autoFill?: boolean;
}

const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline,
  maxLength,
  optional,
  invalid,
  variant = "filled",
  width,
  inputHeight,
  gap = 7,
  className,
  autoFill = false,
}: FieldProps) => {
  const outline = variant === "outline";
  const height = inputHeight ?? (multiline ? 74 : 44);

  return (
    <View className={`mb-4 ${className ?? ""}`} style={width ? { width } : undefined}>
      <Text className="text-white text-sm" style={{ marginBottom: gap }}>
        {label}
        {optional ? " (Optional)" : ""}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={outline ? "#B9CBD9" : "#9AA8B5"}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
        autoComplete={autoFill ? undefined : "off"}
        importantForAutofill={autoFill ? "auto" : "no"}
        selectionColor="#0A3A5C"
        className={`rounded-md px-3 ${outline ? "text-white" : "bg-white text-black"}`}
        style={{
          height,
          width: width ?? undefined,
          textAlignVertical: multiline ? "top" : "center",
          paddingTop: multiline ? 10 : 0,
          backgroundColor: outline ? "transparent" : "#fff",
          borderWidth: outline || invalid ? 1 : 0,
          borderColor: invalid ? KYC_ALERT_RED : outline ? "#FFFFFF" : "transparent",
        }}
      />
    </View>
  );
};

export default Field;
