import React from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

interface Props {
  value: boolean;
  onToggle: () => void;
}

const RadioButton: React.FC<Props> = ({ value, onToggle }) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // knob movement left to right
  });

  const knobBg = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [ "#FFD700","#ffffff"], // white → gold
  });

  const bgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#FFD700"], // white → gold
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onToggle}>
      <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
        <Animated.View style={[styles.knob, { transform: [{ translateX }], backgroundColor: knobBg}]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    elevation: 2,
  },
});

export default RadioButton;
