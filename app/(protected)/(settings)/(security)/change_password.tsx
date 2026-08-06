import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RelativePathString, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Layout from "../Layout";
import Textinput from "@/components/Reuseables/Input/TextInput";
import { InputID } from "@/interface";
import useMutate from "@/hooks/useMutate";
import { useAuthStore } from "@/store/useAuthStore";
import { tokenStorage } from "@/services/tokenStorage";
import { postQuery } from "@/components/api/QueryFn";
import { postRequest } from "@/components/api/Axois";

interface ChangePasswordForm {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
}

export default function ChangePassword() {
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
  link:
    "(protected)/(settings)/(security)/" as RelativePathString,
});

  const  accessToken  = tokenStorage.getAccessToken()
  // const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
  if (check) {
    alert("Please fill in all fields.");
    return;
  }

  if (
    data.newpassword !==
    data.confirmpassword
  ) {
    alert(
      "New password and confirm password do not match."
    );
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
    console.error(
      "Error changing password:",
      error
    );

    alert(
      "An error occurred while changing the password."
    );
  }
  };
  // const handleSubmit = async () => {
  //   if (check) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }
  //   try {
  //     if (data.newpassword !== data.confirmpassword) {
  //       alert("New password and confirm password do not match.");
  //       return;
  //     }
  //     setIsPending(true);

  //     console.log("Access token before request:", accessToken);
  //     console.log("Data being sent:", data.oldpassword);
  //     console.log("Data being sent:", data.newpassword);
  //     await postRequest("/auth/change-password", 
  //       {
  //         currentPassword: data.oldpassword,  
  //         newPassword: data.newpassword
  //       }, 
  //     {
  //     // headers: {
  //     //   Authorization: `Bearer ${accessToken}`,
  //     // },
  //   })
  //   } catch (error) {
  //     console.error("Error changing password:", error);
  //     alert("An error occurred while changing the password. Please try again.");
  //   }
  //   finally {
  //     setIsPending(false);
  //   }
  // };

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
                className="flex-1 text-white"
                inputStyle=" !bg-transparent !h-[30px]"
              />

              <Pressable onPress={() => toggleVisibility(key as keyof ChangePasswordForm)}>
                <FontAwesome5
                  name={
                    showPassword[key as keyof ChangePasswordForm]
                      ? "eye"
                      : "eye-slash"
                  }
                  size={18}
                  color="#ccc"
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
      
      {Array.from({length: 3,}).map((_, index)=>(
        <View key={index.toString()} className="flex-row items-baseline mb-3 gap-2">
          <View className="w-1 h-1 rounded-full bg-white"/>
          <ThemedText className="leading-7">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora obcaecati placeat nulla, fugit inventore magnam dicta tempore quasi in!</ThemedText>
        </View>
      ))}
      </View>
    </Layout>
  );
}







 {/* <TextInput
            secureTextEntry
            value={value}
            onChangeText={(text) => handleChange(key as keyof ChangePasswordForm, text)}
            placeholder={`Enter your ${key.replace("password", " password")}`}
            placeholderTextColor="#ccc"
            className="bg-[#1E3A5F] text-white rounded-xl px-4 py-3"
          /> */}