import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface UploadBoxProps {
  label: string;
  /** Line under the box, e.g. the "All four corners visible" guidance. */
  hint?: string;
  prompt?: string;
  value?: string;
  onPress: () => void;
  invalid?: boolean;
}

const UploadBox = ({
  label,
  hint,
  prompt = "Drag & drop or browse",
  value,
  onPress,
  invalid,
}: UploadBoxProps) => (
  <View className="mb-4">
    <Text className="text-white text-sm mb-2">{label}</Text>

    <Pressable
      onPress={onPress}
      className="rounded-md items-center justify-center"
      style={{
        height: 86,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: invalid ? "#E53935" : "#6E90AC",
      }}
    >
      <MaterialIcons
        name={value ? "check-circle" : "cloud-upload"}
        size={22}
        color={value ? "#4CAF50" : "#9FB6C9"}
      />

      <Text className="text-[#DCE6EE] text-xs mt-1">
        {value ? "File selected" : prompt}
      </Text>

      {!value && (
        <Text className="text-[#9FB6C9] text-[10px] mt-1">
          PNG, JPG up to 5MB
        </Text>
      )}
    </Pressable>

    {hint && (
      <Text className="text-[#9FB6C9] text-[10px] mt-1">{hint}</Text>
    )}
  </View>
);

export default UploadBox;
