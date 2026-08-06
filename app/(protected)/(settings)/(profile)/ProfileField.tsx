import React from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

interface ProfileFieldProps {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isFirst?: boolean;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, icon, isFirst }) => {
  return (
    <Pressable
      className={`pt-8 pb-4 flex-row items-center justify-between mx-5 ${
        !isFirst ? "border-t border-gray-400" : ""
      }`}
    >
      <View className="flex-row items-center">
        <ThemedText className="capitalize text-lg">{label}</ThemedText>
      </View>
      <ThemedText className="text-base text-white">{value}</ThemedText>
    </Pressable>
  );
};

export default ProfileField;
