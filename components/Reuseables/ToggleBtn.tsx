import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface ToggleButtonProps {
  value: boolean;
  onValueChange: (value: boolean) => void;

  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;

  disabled?: boolean;

  width?: number;
  height?: number;

  style?: ViewStyle;
}

const ToggleButton = ({
  value,
  onValueChange,
  activeColor = "#F4B000",
  inactiveColor = "#9CA3AF",
  thumbColor = "#FFFFFF",
  disabled = false,
  width = 68,
  height = 34,
  style,
}: ToggleButtonProps) => {
  const padding = 3;
  const thumbSize = height - padding * 2;

  const thumbTranslateX = value
    ? width - thumbSize - padding * 2
    : 0;

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{
        checked: value,
        disabled,
      }}
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: value
            ? activeColor
            : inactiveColor,
          padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: thumbColor,
            transform: [
              {
                translateX: thumbTranslateX,
              },
            ],
          },
        ]}
      />
    </Pressable>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  thumb: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    elevation: 2,
  },
});