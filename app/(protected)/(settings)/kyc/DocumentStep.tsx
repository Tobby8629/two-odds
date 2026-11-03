import React from "react";
import { Pressable, Text, View } from "react-native";
import Field from "./Field";
import UploadBox from "./UploadBox";
import { useKycFormStore } from "@/store/kycFormStore";
import { useImagePicker } from "@/hooks/useImagePicker";
import { KYC_ALERT_RED, KYC_DOC_LABELS, KYC_DOC_OPTIONS } from "@/constants/kyc";

const Heading = () => (
  <>
    <Text className="text-white text-xl text-center font-semibold">
      Identity Verification
    </Text>
    <Text className="text-[#B9CBD9] text-xs text-center mt-1 mb-6">
      Upload your identification documents
    </Text>
  </>
);

/** Radio list shown until a document type is picked. */
const TypeChooser = ({ showErrors }: { showErrors: boolean }) => {
  const { docType, setDocType } = useKycFormStore();
  const unpicked = showErrors && !docType;

  return (
    <View>
      <Heading />

      {KYC_DOC_OPTIONS.map((option) => {
        const selected = docType === option.type;

        return (
          <Pressable
            key={option.type}
            onPress={() => setDocType(option.type)}
            className="bg-white rounded-lg px-3 py-3 mb-3 flex-row items-center"
            style={{
              borderWidth: selected || unpicked ? 2 : 0,
              borderColor: selected
                ? "#FFA500"
                : unpicked
                  ? KYC_ALERT_RED
                  : "transparent",
            }}
          >
            <option.icon />

            <View className="flex-1 ml-3">
              <Text className="text-black text-sm font-semibold">
                {option.name}
              </Text>
              <Text className="text-[#7A8A99] text-[10px]">{option.hint}</Text>
            </View>

            <View
              className="w-5 h-5 rounded-full items-center justify-center"
              style={{
                borderWidth: 2,
                borderColor: selected ? "#FFA500" : "#C3CDD6",
              }}
            >
              {selected && (
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "#FFA500" }}
                />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

/** Title plus the type chip and "Change type" link. */
const SelectedHeader = ({ title }: { title: string }) => {
  const { docType, setDocSubStep } = useKycFormStore();

  return (
    <View className="items-center mb-6">
      <Text className="text-white text-xl font-semibold">{title}</Text>

      <View className="flex-row items-center mt-2">
        <View className="bg-sec rounded-full px-2 py-0.5">
          <Text className="text-[10px] text-[#0A3A5C] font-semibold">
            {docType ? KYC_DOC_LABELS[docType] : ""}
          </Text>
        </View>

        <Pressable onPress={() => setDocSubStep("choose")} className="ml-3">
          <Text className="text-[#B9CBD9] text-xs">Change type</Text>
        </Pressable>
      </View>
    </View>
  );
};

const DocumentStep = ({ showErrors }: { showErrors: boolean }) => {
  const { docType, docSubStep, idNumber, setIdNumber, uploads, setUpload } =
    useKycFormStore();
  const { pickFromLibrary, takePhoto } = useImagePicker();

  /* The selfie is the only upload the API takes, and it needs base64. */
  const choose = async (slot: string, opts?: { camera?: boolean; base64?: boolean }) => {
    const picked = opts?.camera
      ? await takePhoto(opts?.base64)
      : await pickFromLibrary(opts?.base64);

    if (picked) setUpload(slot, picked.uri, picked.base64);
  };

  if (docSubStep === "choose" || !docType) return <TypeChooser showErrors={showErrors} />;



  const missingId = showErrors && !idNumber.trim();

  if (docType === "nin") {
    return (
      <View>
        <SelectedHeader title="NIN Verification" />

        <Field
          label="National Identification Number"
          placeholder="Enter your 11- digit NIN"
          keyboardType="number-pad"
          maxLength={11}
          value={idNumber}
          invalid={missingId}
          onChangeText={setIdNumber}
        />
        <Text className="text-[#9FB6C9] text-[10px] mb-4 -mt-2">
          Dial *346# to retrieve your NIN
        </Text>

        <UploadBox
          label="NIN Slip"
          hint="Upload your NIN slip or NIMC card - Name must match personal info"
          value={uploads.ninSlip}
          onPress={() => choose("ninSlip")}
        />
      </View>
    );
  }

  if (docType === "bvn") {
    return (
      <View>
        <SelectedHeader title="BVN Verification" />

        <Field
          label="BVN Number"
          placeholder="Enter your 10 digit BVN"
          keyboardType="number-pad"
          maxLength={11}
          value={idNumber}
          invalid={missingId}
          onChangeText={setIdNumber}
        />
        <Text className="text-[#9FB6C9] text-[10px] mb-4 -mt-2">
          Dial *565*0# to retrieve your BVN
        </Text>

        <UploadBox
          label="Selfie"
          prompt="Take a selfie or browse"
          hint="Your BVN doesn't give us access to your bank accounts"
          value={uploads.selfie}
          onPress={() => choose("selfie", { camera: true, base64: true })}
        />
      </View>
    );
  }

  /* Driver's licence and voter's card share the front/back layout. */
  const title =
    docType === "drivers_licence" ? "Driver's License" : "Voter's Card";

  return (
    <View>
      <SelectedHeader title={title} />

      <UploadBox
        label="ID Front"
        value={uploads.idFront}
        onPress={() => choose("idFront")}
      />
      <UploadBox
        label="ID Back"
        hint="All four corners visible, no glare, details readable"
        value={uploads.idBack}
        onPress={() => choose("idBack")}
      />
    </View>
  );
};

export default DocumentStep;
