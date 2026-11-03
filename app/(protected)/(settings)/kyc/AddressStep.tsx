import React from "react";
import { Text, View } from "react-native";
import Field from "./Field";
import SelectField from "./SelectField";
import UploadBox from "./UploadBox";
import { useKycFormStore } from "@/store/kycFormStore";
import { NIGERIAN_STATES } from "@/constants/kyc";
import { useImagePicker } from "@/hooks/useImagePicker";

/* Sizes come straight from the Figma frames. */
const HALF_WIDTH = 160;
const HALF_INPUT_HEIGHT = 40;
const FULL_WIDTH = 353;
const STREET_INPUT_HEIGHT = 74;

const AddressStep = ({ showErrors }: { showErrors: boolean }) => {
  const { address, setAddress, uploads, setUpload } = useKycFormStore();
  const { pickFromLibrary } = useImagePicker();

  const missing = (value: string) => showErrors && !value.trim();

  return (
    <View>
      <Text className="text-white text-xl text-center font-semibold">
        Address Verification
      </Text>
      <Text className="text-[#B9CBD9] text-xs text-center mt-1 mb-6">
        Provide your residential address
      </Text>

      <View className="flex-row justify-between" style={{ width: FULL_WIDTH }}>
        <Field
          variant="outline"
          width={HALF_WIDTH}
          inputHeight={HALF_INPUT_HEIGHT}
          label="City"
          placeholder="Enter your city"
          value={address.city}
          invalid={missing(address.city)}
          onChangeText={(v) => setAddress("city", v)}
        />
        <SelectField
          variant="outline"
          width={HALF_WIDTH}
          inputHeight={HALF_INPUT_HEIGHT}
          label="State"
          placeholder="Enter your state"
          options={NIGERIAN_STATES}
          value={address.state}
          invalid={missing(address.state)}
          onChange={(v) => setAddress("state", v)}
        />
      </View>

      <Field
        variant="outline"
        width={FULL_WIDTH}
        inputHeight={STREET_INPUT_HEIGHT}
        multiline
        label="Street Address"
        placeholder="Enter your address"
        value={address.streetAddress}
        invalid={missing(address.streetAddress)}
        onChangeText={(v) => setAddress("streetAddress", v)}
      />

      <View style={{ width: FULL_WIDTH, gap: 16 }}>
        <Field
          variant="outline"
          width={FULL_WIDTH}
          label="Postal Code"
          optional
          keyboardType="number-pad"
          value={address.postalCode}
          onChangeText={(v) => setAddress("postalCode", v)}
        />

        <UploadBox
          label="Utility Bill"
          hint="Upload your any utility bill - Your address must match"
          value={uploads.utilityBill}
          onPress={async () => {
            const picked = await pickFromLibrary();
            if (picked) setUpload("utilityBill", picked.uri);
          }}
        />
      </View>
    </View>
  );
};

export default AddressStep;
