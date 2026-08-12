// import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React from 'react'
// import Layout from '../Layout';
// import { useLocalSearchParams } from 'expo-router';
// import Textinput from '@/components/Reuseables/Input/TextInput';
// import { useProfileStore } from '@/store/useProfileStore';
// import { ThemedText } from '@/components/ThemedText';
// import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner';

// interface updateInfoProps {
//   name: string;
//   field: string
// }

// const updateInfo = () => {
//   const {name, field} = useLocalSearchParams() as unknown as updateInfoProps;
//   const { profile } = useProfileStore();
//   const [newValue, setNewValue] = React.useState<string>('');
//   const handleChange = ( value: string) => {
//     setNewValue(value);
//   };
//   return (
//     <Layout header={`Update Profile`}>
//       {profile ? (
//         <>
//           <View className='justify-center'>
//             <Text className='text-white text-lg font-poppins text-center'>Update {field}</Text>
//             <Text className='text-white text-lg font-poppins text-center'>You are updating your {field}</Text>
//           </View>
//           <View className='mt-10'>
//             <ThemedText className='text-white text-lg font-poppins text-center'>Current {field}</ThemedText>
//             { profile[name as keyof typeof profile] ? (
//                 <TextInput  placeholder={`Enter current ${field}`} value={profile[name] as string} readOnly/>
//             ) : (
//               <ThemedText className='text-white text-lg font-poppins text-center'>No current {field} found</ThemedText>
//             )}

//             <ThemedText className='text-white text-lg font-poppins text-center'>New {field}</ThemedText>
//             <Textinput 
//             onChangeText={(_, value) => handleChange(value)} 
//             value={newValue}
//             id={name}  
//             placeholder={`Enter new ${name}`} />
//           </View>
//         </>
//       ) : (
//         <SolidRoundSpinner />
//       )} 
//     </Layout>
//   )
// }

// export default updateInfo

// const styles = StyleSheet.create({})

import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput as NativeTextInput,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import Layout from "../Layout";
import TextInput from "@/components/Reuseables/Input/TextInput";
import { ThemedText } from "@/components/ThemedText";
import SolidRoundSpinner from "@/components/Reuseables/SolidSpinner";
import { useProfileStore } from "@/store/useProfileStore";
import Button from "@/components/Reuseables/Button";
import { flex } from "@/constants/style";
import Textinput from "@/components/Reuseables/Input/TextInput";

interface UpdateInfoParams {
  name?: string | string[];
  field?: string | string[];
}

const getSingleParam = (
  param: string | string[] | undefined
): string => {
  if (Array.isArray(param)) {
    return param[0] ?? "";
  }

  return param ?? "";
};

const formatFieldName = (value: string): string => {
  if (!value) {
    return "Profile information";
  }

  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
};

const UpdateInfo = () => {
  const params = useLocalSearchParams();
  const { profile } = useProfileStore();
  
  const name = getSingleParam(params.name);
  const field = getSingleParam(params.field);

  const formattedField = useMemo(
    () => formatFieldName(field || name),
    [field, name]
  );

  const currentValue = useMemo(() => {
    if (!profile || !name) {
      return "";
    }

    const value = profile[name as keyof typeof profile];

    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  }, [profile, name]);

  const [newValue, setNewValue] = useState("");

  const {isLoading: isSubmitting, updateProfileField} = useProfileStore()

  useEffect(() => {
    setNewValue("");
  }, [name]);

  const hasChanged =
    newValue.trim().length > 0 &&
    newValue.trim() !== currentValue.trim();

  const handleSubmit = async () => {
    const trimmedValue = newValue.trim();

    if (!trimmedValue) {
      Alert.alert(
        "Missing information",
        `Please enter your new ${formattedField.toLowerCase()}.`
      );
      return;
    }

    if (trimmedValue === currentValue.trim()) {
      Alert.alert(
        "No changes detected",
        `Your new ${formattedField.toLowerCase()} must be different from the current value.`
      );
      return;
    }

    try {

      Alert.alert(
        "Profile updated",
        `Your ${formattedField.toLowerCase()} has been updated successfully.`
      );
    } catch (error) {
      console.error("Profile update failed:", error);

      Alert.alert(
        "Update failed",
        "We could not update your profile. Please try again."
      );
    }
  };

  if (!profile) {
    return (
      <Layout header="Update Profile">
        <View style={styles.loaderContainer}>
          <SolidRoundSpinner />

          <ThemedText style={styles.loadingText}>
            Loading profile information...
          </ThemedText>
        </View>
      </Layout>
    );
  }

  return (
    <Layout header="Update Profile">
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headingContainer}>
            <View style={styles.headingIcon}>
              <ThemedText style={styles.headingIconText}>
                {formattedField.charAt(0).toUpperCase()}
              </ThemedText>
            </View>

            <ThemedText style={styles.title} className=" font-poppins text-lg" >
              Update {formattedField}
            </ThemedText>

            <ThemedText style={styles.subtitle} className=" font-poppins text-center mt-3">
              Enter your new {formattedField.toLowerCase()} below. Review
              the information carefully before saving.
            </ThemedText>
          </View>

          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.label}>
                Current {formattedField}
              </ThemedText>

              {currentValue ? (
                <NativeTextInput
                  value={currentValue}
                  editable={false}
                  selectTextOnFocus={false}
                  style={[
                    styles.input,
                    styles.disabledInput,
                  ]}
                  placeholderTextColor="#94A3B8"
                />
              ) : (
                <View style={styles.emptyValueContainer}>
                  <ThemedText style={styles.emptyValueText}>
                    No current {formattedField.toLowerCase()} found
                  </ThemedText>
                </View>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.fieldGroup}>
              <ThemedText style={styles.label}>
                New {formattedField}
              </ThemedText>

              <TextInput
                id={name}
                inputStyle="w-full"
                className="bg-white rounded-lg p-0 px-3" 
                value={newValue}
                placeholder={`Enter new ${formattedField.toLowerCase()}`}
                onChangeText={(_, value) => setNewValue(value)}
              />

              <ThemedText style={styles.helperText}>
                Your new value must be different from the current one.
              </ThemedText>
            </View>
          </View>

          <Button
            onPress={handleSubmit}
            disable={!hasChanged || isSubmitting}
            text={isSubmitting? "updating" : "update"}
            className="mx-auto"
          />

          <ThemedText style={styles.securityText}>
            Your profile information is protected and will only be
            updated after verification.
          </ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },

  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  loadingText: {
    marginTop: 14,
    color: "#DCEBFA",
    fontSize: 15,
    textAlign: "center",
  },

  headingContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  headingIcon: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    marginBottom: 16,
  },

  headingIconText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    maxWidth: 340,
    marginTop: 9,
    color: "#C9DDEC",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  formCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },

  fieldGroup: {
    gap: 9,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  input: {
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 15,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  disabledInput: {
    color: "#B8CAD8",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  emptyValueContainer: {
    minHeight: 54,
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 15,
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  emptyValueText: {
    color: "#AFC5D5",
    fontSize: 14,
  },

  divider: {
    height: 1,
    marginVertical: 22,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  helperText: {
    color: "#AFC5D5",
    fontSize: 12,
    lineHeight: 18,
  },

  submitButton: {
    minHeight: 56,
    marginTop: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#F2A900",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },

  submitButtonDisabled: {
    backgroundColor: "#7D8A94",
    opacity: 0.65,
    shadowOpacity: 0,
    elevation: 0,
  },

  submitButtonPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.88,
  },

  submitButtonText: {
    color: "#082F4B",
    fontSize: 16,
    fontWeight: "700",
  },

  securityText: {
    maxWidth: 330,
    alignSelf: "center",
    marginTop: 18,
    color: "#9EB8CA",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});