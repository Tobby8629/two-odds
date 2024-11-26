import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

interface SpinnerProps {
  style?: object; // Replace className with style for React Native
}

const SolidRoundSpinner = ({ style }: SpinnerProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true, // Ensure this is included
      }).start(() => spinAnimation());
    };
    spinAnimation();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            width: 40, 
            height: 40, 
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderColor: '#000',
            borderRadius: 9999,
            transform: [{ rotate: spin }],
          },
          style,
        ]}
      />
    </View>
  );
};

export default SolidRoundSpinner;

