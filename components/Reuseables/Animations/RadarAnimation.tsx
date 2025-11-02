import React, { useRef, useEffect } from 'react';
import { View, Animated, Image } from 'react-native';

interface RadarAnimationProps {
  isSearching: boolean;
}

export default function RadarAnimation({ isSearching }: RadarAnimationProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  const startRadarAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    if (isSearching) startRadarAnimation();
  }, [isSearching]);

  return (
    <View
      className="items-center justify-center"
      style={{ width: 320, height: 320, marginBottom: 60 }}
    >

      {[285, 236, 195, 154].map((size, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1.5,
            borderColor: '#000000',
            backgroundColor: index === 3 ?
            '#012746' : 'transparent',
          }}
        />
      ))}

      {/* Animated Pulse */}
      {isSearching && (
        <Animated.View
          style={{
            position: 'absolute',
            width: 154,
            height: 154,
            borderRadius: 77,
            borderWidth: 3,
            borderColor: '#0066CC',
            opacity: pulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 0],
            }),
            transform: [
              {
                scale: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.85],
                }),
              },
            ],
          }}
        />
      )}

      <View
        className="rounded-full items-center justify-center overflow-hidden"
        style={{
          width: 62,
          height: 62,
          backgroundColor: '#FFFFFF',
          borderWidth: 1.5,
          zIndex: 10,
        }}
      >
        <Image
          source={require('@/assets/images/user.png')}
          style={{ width: 62, height: 62 }}
          resizeMode="cover"
        />
      </View>

     { /* R4 - Outer ring, moved DOWN */}
      <View
        className="rounded-full items-center justify-center overflow-hidden absolute"
        style={{
          width: 27,
          height: 27,
          borderWidth: 1.5,
          borderColor: '#000000',
          top: '25%', 
          right: 25,
          marginTop: -16,
        }}
      >
        <Image
          source={require('@/assets/images/user.png')}
          style={{ width: 32, height: 32 }}
          resizeMode="cover"
        />
      </View>

      {/* R3 - 3rd ring, better aligned */}
      <View
        className="rounded-full items-center justify-center overflow-hidden absolute"
        style={{
          width: 27,
          height: 27,
          backgroundColor: '#E5E5E5',
          borderWidth: 1.5,
          borderColor: '#000000',
          top: '55%', 
          right: 32, 
          marginTop: -14,
        }}
      >
        <Image
          source={require('@/assets/images/user.png')}
          style={{ width: 28, height: 28 }}
          resizeMode="cover"
        />
      </View>

      {/* L4 - Outer ring, corrected position */}
      <View
        className="rounded-full items-center justify-center overflow-hidden absolute"
        style={{
          width: 27,
          height: 27,
          backgroundColor: '#E5E5E5',
          borderWidth: 1.5,
          borderColor: '#000000',
          bottom: '12%', 
          left: 70,
          marginBottom: -16,
        }}
      >
        <Image
          source={require('@/assets/images/user.png')}
          style={{ width: 32, height: 32 }}
          resizeMode="cover"
        />
      </View>

      {/* L3 - 3rd ring, better aligned */}
      <View
        className="rounded-full items-center justify-center overflow-hidden absolute"
        style={{
          width: 28,
          height: 28,
          backgroundColor: '#E5E5E5',
          borderWidth: 1.5,
          borderColor: '#000000',
          top: '40%', 
          left: 55,
          marginTop: -14,
        }}
      >
        <Image
          source={require('@/assets/images/user.png')}
          style={{ width: 28, height: 28 }}
          resizeMode="cover"
        />
      </View>


      {/* Top ring, redirected */}
      <View
        className="rounded-full items-center justify-center overflow-hidden absolute"
        style={{
          width: 27,
          height: 27,
          backgroundColor: '#E5E5E5',
          borderWidth: 1.5,
          borderColor: '#000000',
          top: 200,
          right: '80%',
          marginLeft: 25,
        }}
      >
        <Image
          source={require('@/assets/images/user.png')}
          style={{ width: 32, height: 32 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}