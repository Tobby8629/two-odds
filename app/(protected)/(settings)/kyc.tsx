import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from "react-native";
import Layout from "./Layout";
import Button from "@/components/Reuseables/Button";
import Stepper from "./kyc/Stepper";
import PersonalInfoStep from "./kyc/PersonalInfoStep";
import DocumentStep from "./kyc/DocumentStep";
import AddressStep from "./kyc/AddressStep";
import SubmittedScreen from "./kyc/SubmittedScreen";
import { useKycFormStore } from "@/store/kycFormStore";
import { useKycStatus, useSubmitKyc } from "@/hooks/useKyc";
import { SubmitKycInput } from "@/types/kyc.types";
import { validatePersonal } from "@/constants/kyc";
import AlertBanner from "@/components/Reuseables/AlertBanner";
import Loading from "@/components/Reuseables/Loading";

/** Figma shows mm/dd/yy; the API wants ISO. */
const toIsoDate = (input: string) => {
  const parts = input.split(/[/\-.]/).map((p) => p.trim());
  if (parts.length !== 3) return input;

  const [mm, dd, rawYear] = parts;
  const yy = rawYear.length === 2 ? `20${rawYear}` : rawYear;

  return `${yy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
};

export default function KycScreen() {
  const {
    step,
    setStep,
    personal,
    docType,
    docSubStep,
    setDocSubStep,
    idNumber,
    uploadsBase64,
    address,
    showRequiredAlert,
    setShowRequiredAlert,
    reset
  } = useKycFormStore();

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: kycStatus, isPending: isLoadingStatus } = useKycStatus();
  const { mutateAsync: submitKyc, isPending: isSubmitting } = useSubmitKyc();

  const stepIsValid = () => {
    if (step === 0) {
      return Object.keys(validatePersonal(personal)).length === 0;
    }

    if (step === 1) {
      if (docSubStep === "choose") return Boolean(docType);
      /* Licence and voter's card carry no number field in the design. */
      if (docType === "nin" || docType === "bvn") return idNumber.trim().length > 0;
      return true;
    }

    return Boolean(
      address.city.trim() && address.state.trim() && address.streetAddress.trim()
    );
  };

  const handleNext = () => {
    if (!stepIsValid()) {
      setShowRequiredAlert(true);
      return;
    }

    setShowRequiredAlert(false);

    /* Picking a type advances within the document step, not past it. */
    if (step === 1 && docSubStep === "choose") {
      setDocSubStep("form");
      return;
    }

    setStep((step + 1) as 0 | 1 | 2);
  };

  const handlePrevious = () => {
    if (step === 1 && docSubStep === "form") {
      setDocSubStep("choose");
      return;
    }

    setStep((step - 1) as 0 | 1 | 2);
  };

  const handleSubmit = async () => {
    if (!stepIsValid()) {
      setShowRequiredAlert(true);
      return;
    }

    setSubmitError(null);

    /* The API only accepts a BVN or NIN plus date of birth. */
    const payload: SubmitKycInput = {
      dateOfBirth: toIsoDate(personal.dateOfBirth),
      ...(docType === "bvn" ? { bvn: idNumber } : {}),
      ...(docType === "nin" ? { nin: idNumber } : {})
    };

    if (!payload.bvn && !payload.nin) {
      setSubmitError(
        "Only NIN and BVN can be verified at the moment. Go back and choose one of those."
      );
      return;
    }

    try {
      await submitKyc(payload);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "We could not submit your verification. It may already be in progress."
      );
    }
  };

  const alreadyDone =
    kycStatus?.kycStatus === "VERIFIED" || kycStatus?.kycStatus === "PENDING";

  if (isLoadingStatus) {
    return (
      <Layout header="KYC">
        <View className="flex-1 items-center justify-center">
          <Loading inline size={72} />
        </View>
      </Layout>
    );
  }

  if (submitted || alreadyDone) {
    return (
      <Layout header="KYC">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <SubmittedScreen
            status={kycStatus?.kycStatus ?? "PENDING"}
            rejectedReason={kycStatus?.latestSubmission?.rejectedReason}
            onCheckLater={() => {
              reset();
              setSubmitted(false);
            }}
          />
        </ScrollView>
      </Layout>
    );
  }

  const isLastStep = step === 2;

  return (
    <Layout header="KYC">
      {showRequiredAlert && (
        <AlertBanner message="Fill in all required fields" />
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-white text-xl text-center font-semibold mt-2">
            Complete Your KYC
          </Text>
          <Text className="text-[#B9CBD9] text-xs text-center mt-1 mb-6 px-4">
            Complete identity verification to stake with crypto or Naira and
            withdraw your winnings.
          </Text>

          <Stepper step={step} />

          {step === 0 && <PersonalInfoStep showErrors={showRequiredAlert} />}
          {step === 1 && <DocumentStep showErrors={showRequiredAlert} />}
          {step === 2 && <AddressStep showErrors={showRequiredAlert} />}

          {submitError && (
            <Text className="text-red-400 text-xs text-center mt-3">
              {submitError}
            </Text>
          )}

          <View className="flex-row items-center justify-between mt-6">
            <Button
              text="Previous"
              className="!bg-transparent !w-auto"
              textStyle="!text-base !font-normal"
              disable={step === 0}
              onPress={handlePrevious}
            />

            <Button
              text={
                isSubmitting
                  ? "Submitting..."
                  : isLastStep
                    ? "Submit"
                    : "Next"
              }
              className="!w-[110px] !h-[40px]"
              textStyle="!text-base"
              disable={isSubmitting}
              onPress={isLastStep ? handleSubmit : handleNext}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
