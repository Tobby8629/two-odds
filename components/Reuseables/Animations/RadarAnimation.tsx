import React, { useRef, useEffect } from 'react';
import { View, Animated, ViewStyle, Image } from 'react-native';

interface RadarAnimationProps {
  isSearching: boolean;
  centerAvatar?: React.ReactNode;
}

interface SurroundingIcon {
  size: number;
  avatarSize: number;
  position: ViewStyle;
}

const SURROUNDING_ICONS: SurroundingIcon[] = [
  { 
    size: 27, 
    avatarSize: 32, 
    position: { top: '25%', right: 25, marginTop: -16 } as ViewStyle
  },
  { 
    size: 27, 
    avatarSize: 28, 
    position: { top: '55%', right: 32, marginTop: -14 } as ViewStyle
  },
  { 
    size: 27, 
    avatarSize: 32, 
    position: { bottom: '12%', left: 70, marginBottom: -16 } as ViewStyle
  },
  { 
    size: 28, 
    avatarSize: 28, 
    position: { top: '40%', left: 55, marginTop: -14 } as ViewStyle
  },
  { 
    size: 27, 
    avatarSize: 32, 
    position: { top: 200, right: '80%', marginLeft: 25 } as ViewStyle
  },
];

export default function RadarAnimation({ isSearching, centerAvatar }: RadarAnimationProps) {
  const pulse = useRef(new Animated.Value(0)).current;
  const iconsOpacity = useRef(new Animated.Value(0)).current;

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
    if (isSearching) {
      startRadarAnimation();
      Animated.timing(iconsOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      iconsOpacity.setValue(0);
    }
  }, [isSearching]);

  return (
    <View
      className="items-center justify-center"
      style={{ width: 320, height: 320, marginBottom: 60 }}
    >
      {/* Static Rings */}
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
            backgroundColor: index === 3 ? '#012746' : 'transparent',
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

      {/* Center Avatar (ALWAYS VISIBLE) */}
      <View
        className="rounded-full items-center justify-center overflow-hidden"
        style={{
          width: 75,
          height: 75,
          backgroundColor: '#FFFFFF',
          borderWidth: 1.5,
          zIndex: 10,
        }}
      >
        {centerAvatar}
      </View>

      {/* Surrounding Icons (ONLY visible when searching) */}
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: iconsOpacity,
        }}
      >
        {SURROUNDING_ICONS.map((icon, index) => (
          <View
            key={index}
            className="rounded-full items-center justify-center overflow-hidden absolute"
            style={{
              width: icon.size,
              height: icon.size,
              backgroundColor: '#E5E5E5',
              borderWidth: 1.5,
              borderColor: '#000000',
              ...icon.position,
            }}
          >
            <Image
              source={require('@/assets/images/user.png')}
              style={{ width: icon.avatarSize, height: icon.avatarSize }}
              resizeMode="cover"
            />
          </View>
        ))}
      </Animated.View>
    </View>
  );
}