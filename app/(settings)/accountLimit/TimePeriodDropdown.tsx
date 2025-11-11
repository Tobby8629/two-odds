import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InfoModal } from "./InfoModal"; // your modal component

interface TimePeriodDropdownProps {
  value: "daily" | "weekly" | "monthly";
  onChange: (period: "daily" | "weekly" | "monthly") => void;
}

const options = [
  { key: "daily", label: "Daily Limit" },
  { key: "weekly", label: "Weekly Limit" },
  { key: "monthly", label: "Monthly Limit" },
] as const;

export const TimePeriodDropdown: React.FC<TimePeriodDropdownProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleSelect = (val: "daily" | "weekly" | "monthly") => {
    onChange(val);
    setOpen(false);
    setShowInfo(true); // Show modal after selection
  };

  return (
    <View className="mb-4">
      {/* Label Above */}
      <Text className="text-black mb-2 font-regular text-lg">Time Period</Text>

      {/* Main Selection Box */}
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="bg-white p-3 rounded-xl flex-row justify-between items-center border border-[#FFA500]"
      >
        <Text className="text-black font-medium">
          {options.find((o) => o.key === value)?.label}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#0A3A5C"
        />
      </TouchableOpacity>

      {/* Dropdown List */}
      {open && (
        <View className="bg-pry rounded-xl mt-2">
          {options.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => handleSelect(item.key)}
              className="flex-row justify-between items-center p-3"
            >
              <Text
                className={`font-medium ${
                  value === item.key ? "text-white" : "text-gray-200"
                }`}
              >
                {item.label}
              </Text>

              {/* Gold checkmark only inside dropdown */}
              {value === item.key && (
                <Ionicons name="checkmark" size={20} color="#FFA500" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Info Modal */}
      <InfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
    </View>
  );
};
export default TimePeriodDropdown;