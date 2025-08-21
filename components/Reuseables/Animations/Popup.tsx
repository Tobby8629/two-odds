// components/AnimatedPopup.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  View,
  BackHandler,
} from "react-native";

type PopupVariant = "center" | "bottom";

interface AnimatedPopupProps {
  visible: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
  variant?: PopupVariant;          // "center" | "bottom"
  closeOnBackdrop?: boolean;       // tap outside to close
  backdropOpacity?: number;        // 0..1
  enterDuration?: number;          // ms
  exitDuration?: number;           // ms
  maxHeight?: number | `${number}%` | "auto";    // e.g., 520 or "80%"
}

const AnimatedPopup: React.FC<AnimatedPopupProps> = ({
  visible,
  onClose,
  children,
  className,
  variant = "center",
  closeOnBackdrop = true,
  backdropOpacity = 0.4,
  enterDuration = 220,
  exitDuration = 160,
  maxHeight = "80%",
}) => {
  // Keep mounted until exit animation finishes
  const [mounted, setMounted] = useState(visible);

  // anim values
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;     // center variant
  const translateY = useRef(new Animated.Value(24)).current;  // bottom variant

  // Back handler: close on Android hardware back
  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (onClose) onClose();
      return true; // prevent default
    });
    return () => sub.remove();
  }, [visible, onClose]);

  // Animate mount/unmount
  useEffect(() => {
    if (visible) {
      setMounted(true);
      // enter
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: enterDuration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        variant === "center"
          ? Animated.spring(scale, {
              toValue: 1,
              stiffness: 240,
              damping: 22,
              mass: 0.9,
              useNativeDriver: true,
            })
          : Animated.timing(translateY, {
              toValue: 0,
              duration: enterDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
      ]).start();
    } else if (mounted) {
      // exit
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: exitDuration,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        variant === "center"
          ? Animated.timing(scale, {
              toValue: 0.92,
              duration: exitDuration,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            })
          : Animated.timing(translateY, {
              toValue: 24,
              duration: exitDuration,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
      ]).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, mounted, opacity, scale, translateY, variant, enterDuration, exitDuration]);

  const containerStyle = useMemo(() => {
    if (variant === "center") {
      return [
        styles.panelCenter,
        { maxHeight, transform: [{ scale }] } as const,
      ];
    }
    return [
        styles.panelBottom,
        { maxHeight, transform: [{ translateY }] } as const,
      ];
  }, [variant, scale, translateY, maxHeight]);

  if (!mounted) return null;

  return (
    <Modal
      transparent
      animationType="none"
      visible={mounted}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0, backdropOpacity],
        }) }]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeOnBackdrop ? onClose : undefined}
        />
      </Animated.View>

      {/* Panel */}
      <View style={styles.host} pointerEvents="box-none">
        <Animated.View style={containerStyle} className={className}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  host: {
    flex: 1,
    justifyContent: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  panelCenter: {
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#0B1E2D",
    alignSelf: "center",
    padding: 16,
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  panelBottom: {
    marginHorizontal: 0,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#0B1E2D",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 18,
  },
});

export default AnimatedPopup;
