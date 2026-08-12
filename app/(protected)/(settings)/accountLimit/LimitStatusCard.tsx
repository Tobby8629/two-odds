import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useAccountLimitStore } from "@/store/accountLimitStore";
import { useDepositLimits } from "@/hooks/useDepositLimits";
import { formatCurrency } from "@/constants/functions";

interface LimitStatusCardProps {
  onInfoPress: () => void;
}

export const LimitStatusCard: React.FC<LimitStatusCardProps> = ({ onInfoPress }) => {
  const selectedCurrency = useAccountLimitStore(
    (state) => state.selectedCurrency
  );

  const { limits, isPending, isError } =
    useDepositLimits(selectedCurrency);

  const renderLimit = (label: string, value: string | null) => (
    <View className="flex-row justify-between py-1">
      <Text className="text-black text-base font-medium">{label}</Text>
      <Text className="text-[#FFB500] text-base font-semibold">
        {value !== null
          ? formatCurrency(value, selectedCurrency)
          : "No Limits"}
      </Text>
    </View>
  );

  const allNull = !limits.daily && !limits.weekly && !limits.monthly;

  return (
    <View className="bg-[#E3F2FD] p-7 rounded-2xl mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-1">
          <Text className="text-black font-regular text-lg">
            {isError
              ? "Could not load deposit limits"
              : allNull
                ? "No Active Deposit Limits"
                : "Active Deposit Limits"}
          </Text>
        </View>

        {isPending && <ActivityIndicator color="#FFB500" />}
      </View>

      {/* Limits */}
      {renderLimit("Daily Limit:", limits.daily)}
      {renderLimit("Weekly Limit:", limits.weekly)}
      {renderLimit("Monthly Limit:", limits.monthly)}
    </View>
  );
};
export default LimitStatusCard;
