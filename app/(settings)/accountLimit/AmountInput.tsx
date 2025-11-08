import React from "react";
import { View, Text, TextInput } from "react-native";
import { useAccountLimitStore } from "../../../store/accountLimitStore";

export const AmountInput: React.FC = () => {
  const { amount, setAmount, error } = useAccountLimitStore();

  const handleChange = (text: string) => {
    // Allow only numbers and decimal points
    const numericValue = text.replace(/[^0-9.]/g, "");
    setAmount(numericValue);
  };

  return (
    <View className="mb-6">
      {/* Label */}
      <Text className="text-black mb-2 font-regular text-lg">Deposit Amount</Text>

      {/* Input container */}
      <View
        className={`flex-row items-center bg-white rounded-xl px-3 py-2`}
        style={{
          borderWidth: 1,
          borderColor: amount !== "" ? "#FFA500" : "#CCCCCC", // Gold border when typing
        }}
      >
        {/* Dollar sign on left */}
        <Text className="text-black text-lg mr-2">$</Text>

        {/* Amount input */}
        <TextInput
          value={amount}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder=""
          className="flex-1 text-black text-lg"
        />

        {/* Min: 5.00 inside input box, right-aligned */}
        <Text className="text-gray-400 text-sm ml-2">
          {amount === "" ? "Min: 5.00" : ""}
        </Text>
      </View>

      {/* Error message */}
      {error ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
};
export default AmountInput;