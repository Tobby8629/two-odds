import React from "react";
import { Text, View } from "react-native";
import Field from "./Field";
import { useKycFormStore } from "@/store/kycFormStore";
import { validatePersonal } from "@/constants/kyc";

const PersonalInfoStep = ({ showErrors }: { showErrors: boolean }) => {
  const { personal, setPersonal } = useKycFormStore();

  const errors = showErrors ? validatePersonal(personal) : {};

  return (
    <View>
      <Text className="text-white text-xl text-center font-semibold">
        Personal Information
      </Text>
      <Text className="text-[#B9CBD9] text-xs text-center mt-1 mb-6">
        Please provide your basic details to get started
      </Text>

      <View className="flex-row" style={{ gap: 12 }}>
        <Field
          className="flex-1"
          label="First Name"
          placeholder="Enter first name"
          value={personal.firstName}
          error={errors.firstName}
          onChangeText={(v) => setPersonal("firstName", v)}
        />
        <Field
          className="flex-1"
          label="Last Name"
          placeholder="Enter last name"
          value={personal.lastName}
          error={errors.lastName}
          onChangeText={(v) => setPersonal("lastName", v)}
        />
      </View>

      <Field
        label="Email Address"
        placeholder="@email.com"
        keyboardType="email-address"
        value={personal.email}
        error={errors.email}
        onChangeText={(v) => setPersonal("email", v)}
      />

      <Field
        label="Phone Number"
        placeholder="08012345678"
        keyboardType="phone-pad"
        maxLength={11}
        value={personal.phoneNumber}
        error={errors.phoneNumber}
        onChangeText={(v) => setPersonal("phoneNumber", v)}
      />

      <Field
        label="Date of Birth"
        placeholder="mm/dd/yy"
        value={personal.dateOfBirth}
        error={errors.dateOfBirth}
        onChangeText={(v) => setPersonal("dateOfBirth", v)}
      />

      <Field
        label="Country"
        placeholder="Enter your country"
        value={personal.country}
        error={errors.country}
        onChangeText={(v) => setPersonal("country", v)}
      />
    </View>
  );
};

export default PersonalInfoStep;
