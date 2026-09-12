import React from "react";
import { Text, View } from "react-native";
import Field from "./Field";
import SelectField from "./SelectField";
import { useKycFormStore } from "@/store/kycFormStore";
import { COUNTRIES } from "@/constants/kyc";

const PersonalInfoStep = ({ showErrors }: { showErrors: boolean }) => {
  const { personal, setPersonal } = useKycFormStore();

  const missing = (value: string) => showErrors && !value.trim();

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
          invalid={missing(personal.firstName)}
          onChangeText={(v) => setPersonal("firstName", v)}
        />
        <Field
          className="flex-1"
          label="Last Name"
          placeholder="Enter last name"
          value={personal.lastName}
          invalid={missing(personal.lastName)}
          onChangeText={(v) => setPersonal("lastName", v)}
        />
      </View>

      <Field
        label="Email Address"
        placeholder="@email.com"
        keyboardType="email-address"
        value={personal.email}
        invalid={missing(personal.email)}
        onChangeText={(v) => setPersonal("email", v)}
      />

      <Field
        label="Phone Number"
        placeholder="+23400000000"
        keyboardType="phone-pad"
        value={personal.phoneNumber}
        invalid={missing(personal.phoneNumber)}
        onChangeText={(v) => setPersonal("phoneNumber", v)}
      />

      <Field
        label="Date of Birth"
        placeholder="mm/dd/yy"
        value={personal.dateOfBirth}
        invalid={missing(personal.dateOfBirth)}
        onChangeText={(v) => setPersonal("dateOfBirth", v)}
      />

      <SelectField
        label="Country"
        placeholder="Select your country"
        options={COUNTRIES}
        value={personal.country}
        invalid={missing(personal.country)}
        onChange={(v) => setPersonal("country", v)}
      />
    </View>
  );
};

export default PersonalInfoStep;
