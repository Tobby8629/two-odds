import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAccountLimitStore } from "@/store/accountLimitStore";
interface LimitStatusCardProps {
  onInfoPress: () => void;
}

export const LimitStatusCard: React.FC<LimitStatusCardProps> = ({ onInfoPress }) => {
  const { limits } = useAccountLimitStore();

  const renderLimit = (label: string, value: number | null) => (
    <View className="flex-row justify-between py-1">
      <Text className="text-black text-base font-medium">{label}</Text>
      <Text className="text-[#FFB500] text-base font-semibold">
        {value ? `$${value.toFixed(2)}` : "No Limits"}
      </Text>
    </View>
  );

  const allNull = !limits.daily && !limits.weekly && !limits.monthly;

  return (
    <View className="bg-[#E3F2FD] p-7 rounded-2xl mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-1">
          <Text className="text-black font-regular text-lg">No Active Deposit Limits</Text>
        </View>
      </View>

      {/* Limits */}
      {renderLimit("Daily Limit:", limits.daily)}
      {renderLimit("Weekly Limit:", limits.weekly)}
      {renderLimit("Monthly Limit:", limits.monthly)}
    </View>
  );
};
export default LimitStatusCard;