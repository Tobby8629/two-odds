import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RelativePathString, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Layout from "../Layout";
import Textinput from "@/components/Reuseables/Input/TextInput";
import { InputID } from "@/interface";
import useMutate from "@/hooks/useMutate";
import AlertBanner from "@/components/Reuseables/AlertBanner";

/* Mirrors the 8-character minimum on POST /auth/change-password. */
const PASSWORD_RULES = [
  "At least 8 characters long",
  "Contains an uppercase and a lowercase letter",
  "Contains at least one number",
];

interface ChangePasswordForm {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
}

export default function ChangePassword() {
  const [banner, setBanner] = useState<
    { message: string; variant: "error" | "success" } | null
  >(null);
  const [data, setData] = useState<ChangePasswordForm>({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldpassword: false,
    newpassword: false,
    confirmpassword: false,
  });

  const check = Object.entries(data).some(([key, value])=> value === "" )


  const handleChange = (id: InputID, value: string) => {
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleVisibility = (id: keyof ChangePasswordForm) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const {
  mutateAsync,
  isPending,
} = useMutate({
  link: "/(settings)/(security)" as RelativePathString,
});

  const handleSubmit = async () => {
    setBanner(null);

    if (check) {
      setBanner({ message: "Please fill in all fields", variant: "error" });
      return;
    }

    if (data.newpassword.length < 8) {
      setBanner({
        message: "Password must be at least 8 characters",
        variant: "error",
      });
      return;
    }

    if (data.newpassword !== data.confirmpassword) {
      setBanner({ message: "The two passwords do not match", variant: "error" });
      return;
    }

    try {
      await mutateAsync({
        url: "auth/change-password",
        data: {
          currentPassword: data.oldpassword,
          newPassword: data.newpassword,
        },
      });
    } catch (error) {
      console.error("Error changing password:", error);

      setBanner({
        message: "Current password is incorrect",
        variant: "error",
      });
    }
  };
  return (
    <Layout header="Change Password">
      <View className="px-5 pt-4 mt-7">
        {Object.entries(data).map(([key, value]) => (
          
          <View key={key} className="mb-5">
            <Text className="text-gray-200 mb-2 capitalize">
              {key.replace("password", " password")}
              <Text className="text-red-600 text-lg font-bold">*</Text>
            </Text>
            <View className="flex-row items-center bg-light-blue rounded-xl px-3">
              <Textinput
                id={key}
                value={value}
                secure={!showPassword[key as keyof ChangePasswordForm]}
                onChangeText={handleChange}
                placeholder={`Enter your ${key.replace("password", " password")}`}
                className="flex-1"
                placeholderTextColor="#9AA8B5"
                inputStyle=" !bg-transparent !h-[30px] !text-black"
              />

              <Pressable onPress={() => toggleVisibility(key as keyof ChangePasswordForm)}>
                <FontAwesome5
                  name={
                    showPassword[key as keyof ChangePasswordForm]
                      ? "eye"
                      : "eye-slash"
                  }
                  size={18}
                  color="#0A3A5C"
                />
              </Pressable>
            </View>
          </View>
        ))}

        <Pressable
          onPress={handleSubmit}
          disabled= {check || isPending}
          className={`${check ? "bg-gray-400": "bg-sec"} rounded-xl py-4 mt-8`}
        >
          <Text className="text-center text-white text-lg font-semibold">
           { isPending ? "Updating..." : "Update Password" }
          </Text>
        </Pressable>
      </View>
      <View className="px-5 pt-4">
        <ThemedText className="text-lg mb-3 !text-sec  font-semibold">Password Requirements</ThemedText>
      
      {PASSWORD_RULES.map((rule) => (
        <View key={rule} className="flex-row items-baseline mb-3 gap-2">
          <View className="w-1 h-1 rounded-full bg-[#B9CBD9]"/>
          <ThemedText className="leading-7 !text-[#B9CBD9] text-sm">{rule}</ThemedText>
        </View>
      ))}
      </View>
    </Layout>
  );
}
