import React from "react";
import { Pressable, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

interface ProfileFieldProps {
  label: string;
  value: string;
  name: string
  icon?: keyof typeof Ionicons.glyphMap;
  editable?: boolean;
  isFirst?: boolean;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, name, value, icon, isFirst , editable}) => {
  return (
    <Pressable
      className={`pt-8 pb-4 flex-row items-center justify-between mx-5 ${
        !isFirst ? "border-t border-gray-400" : ""
      }`}
    >
      <View className="flex-row items-center">
        <ThemedText className="capitalize text-lg">{label}</ThemedText>
      </View>
      <View className="flex-row items-center gap-2">
      <ThemedText className="text-base text-white">{value}</ThemedText>
      { editable && 
      <Pressable onPress={()=>router.push({ pathname: `/updateInfo`, params: {field: label, name} })} className="bg-pry p-2 rounded-full">
        <FontAwesome name={"angle-right"} size={20} color="white" />
      </Pressable>
      }
      </View>
    </Pressable>
  );
};
export default ProfileField;