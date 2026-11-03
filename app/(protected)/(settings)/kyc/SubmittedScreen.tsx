import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Button from "@/components/Reuseables/Button";
import { KycStatus } from "@/types/kyc.types";
import { useKycFormStore } from "@/store/kycFormStore";
import { KYC_ALERT_RED, KYC_DOC_OPTIONS } from "@/constants/kyc";

interface SubmittedScreenProps {
  status: KycStatus;
  rejectedReason?: string | null;
  onCheckLater: () => void;
}

const StatusRow = ({
  icon,
  title,
  subtitle,
  badge,
  badgeColour,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge: string;
  badgeColour: string;
}) => (
  <View className="flex-row items-center py-3">
    {icon}

    <View className="flex-1 ml-3">
      <Text className="text-black text-sm font-semibold">{title}</Text>
      <Text className="text-[#7A8A99] text-[10px]">{subtitle}</Text>
    </View>

    <View
      className="rounded-full px-3 py-1"
      style={{ backgroundColor: badgeColour }}
    >
      <Text className="text-white text-[9px] font-semibold">{badge}</Text>
    </View>
  </View>
);

const SubmittedScreen = ({
  status,
  rejectedReason,
  onCheckLater,
}: SubmittedScreenProps) => {
  const { docType, uploads } = useKycFormStore();

  const chosen = KYC_DOC_OPTIONS.find((option) => option.type === docType);
  const DocIcon = chosen?.icon;
  const fileCount = Object.values(uploads).filter(Boolean).length;

  const rejected = status === "REJECTED";
  const verified = status === "VERIFIED";

  const title = rejected
    ? "Verification Failed"
    : verified
      ? "Verification Complete!"
      : "Verification Submitted!";

  const blurb = rejected
    ? rejectedReason || "We could not verify your identity. Please try again."
    : verified
      ? "Your identity has been verified."
      : "Your documents are under review. Most verification complete under 10mins, we'll notify you as soon as it's cleared.";

  return (
    <View className="items-center px-2">
      <View
        className="rounded-full items-center justify-center mt-6 mb-6"
        style={{
          width: 99,
          height: 99,
          backgroundColor: rejected ? KYC_ALERT_RED : "#FFC107",
        }}
      >
        <Ionicons
          name={rejected ? "close" : "checkmark"}
          size={54}
          color="#0A3A5C"
        />
      </View>

      <Text className="text-white text-2xl font-semibold text-center">
        {title}
      </Text>
      <Text className="text-[#B9CBD9] text-xs text-center mt-2 mb-6 px-6">
        {blurb}
      </Text>

      <View className="bg-white rounded-xl w-full px-4 py-1 mb-8">
        <StatusRow
          icon={
            DocIcon ? (
              <DocIcon width={28} height={26} />
            ) : (
              <MaterialIcons name="badge" size={20} color="#0A3A5C" />
            )
          }
          title={chosen?.name ?? "Identity document"}
          subtitle={
            rejected
              ? "Rejected"
              : fileCount > 0
                ? fileCount + (fileCount > 1 ? " files submitted" : " file submitted")
                : "Submitted"
          }
          badge={rejected ? "REJECTED" : verified ? "VERIFIED" : "IN REVIEW"}
          badgeColour={rejected ? KYC_ALERT_RED : verified ? "#2E7D32" : "#E59A0B"}
        />

        <View className="h-[1px] bg-[#E3EAF0]" />

        <StatusRow
          icon={<MaterialIcons name="place" size={20} color="#0A3A5C" />}
          title="Personal info & address"
          subtitle="Confirmed"
          badge="VERIFIED"
          badgeColour="#2E7D32"
        />
      </View>

      <Button
        text="Back to Home"
        className="!w-full"
        onPress={() => router.replace("/(protected)/(tabs)")}
      />

      <Pressable onPress={onCheckLater} className="mt-3">
        <Text className="text-[#B9CBD9] text-xs">Check status later</Text>
      </Pressable>
    </View>
  );
};

export default SubmittedScreen;
