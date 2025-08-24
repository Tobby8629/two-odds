interface errorInt {
  error: string | []
  className?: string,
  setError: React.Dispatch<React.SetStateAction<Err>>
}

import React, { useRef } from 'react';
import Animated, { ZoomIn, ZoomInDown, ZoomInUp } from 'react-native-reanimated';
import { PanResponder, Animated as RNAnimated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Err } from '@/interface';

const Error = ({ error, setError, className }: errorInt) => {
  const positionY = useRef(new RNAnimated.Value(0)).current; // starts visible

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 10;
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          // allow upward drag
          positionY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -50) {
          RNAnimated.timing(positionY, {
            toValue: -200,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setError({message: "", status: false}));
        } else {
          RNAnimated.spring(positionY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!error) return null;

  return (
    <Animated.View className={`absolute top-0 w-full h-fit ${className}`} entering={ZoomInUp.duration(10000).springify()}>
        <RNAnimated.View
        style={[styles.banner, { transform: [{ translateY: positionY }] }]}
        {...panResponder.panHandlers}
        >
        <Text style={styles.text}>{error}</Text>
        </RNAnimated.View>
    </Animated.View>
  );
}

export default Error

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 25,
    zIndex: 999,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "500",
  },
});



