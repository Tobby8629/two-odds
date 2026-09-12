import React from "react";
import { Text, View } from "react-native";

export const BANNER_COLOURS = {
  error: "#F00000",
  success: "#2E7D32",
} as const;

interface AlertBannerProps {
  message: string;
  variant?: keyof typeof BANNER_COLOURS;
}

/** Full-width banner pinned under the header, per the Figma frames. */
const AlertBanner = ({ message, variant = "error" }: AlertBannerProps) => (
  <View
    className="w-full items-center justify-center"
    style={{
      height: 75,
      backgroundColor: BANNER_COLOURS[variant],
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    }}
  >
    <Text className="text-white text-center text-base font-semibold">
      {message}
    </Text>
  </View>
);

export default AlertBanner;
