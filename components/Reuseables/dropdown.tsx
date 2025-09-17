import React, { Key, ReactNode, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  LayoutChangeEvent,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

export interface ItemProp<T> {
  title: string;
  value: T;
  icon?: ReactNode | string;
}

interface DropdownProps<T> {
  title: string;
  items: ItemProp<T>[];
  setSelect: React.Dispatch<React.SetStateAction<ItemProp<T>>>;
  maxHeight?: number;
  eachStyle?: string;
  listWrapper?: string;
  wrapper?: string;
  eachText?: (item: ItemProp<T>) => string;
  extra?: (item: ItemProp<T>) => React.ReactNode;
}

const Dropdown = <T,>({
  title,
  items,
  setSelect,
  maxHeight = 260,
  eachStyle,
  listWrapper,
  wrapper,
  eachText,
  extra,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(6)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const rotateDeg = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const openMenu = () => {
    setOpen(true);
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 0,
        duration: 140,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 6,
        duration: 140,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 140,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => finished && setOpen(false));
  };

  const handleToggle = () => {
    if (open) closeMenu();
    else openMenu();
  };

  const handleSelect = (item: ItemProp<T>) => {
    setSelect(item);
    closeMenu();
  };

  // measure button layout
  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setAnchor({ x, y, w: width, h: height });
  };

  return (
    <>
      <TouchableOpacity
        onLayout={handleLayout}
        onPress={handleToggle}
        style={styles.header}
        className={wrapper}
      >
        <ThemedText className="text-lg font-semibold">{title}</ThemedText>
        <Animated.View style={{ transform: [{ rotate: rotateDeg }] }}>
          <FontAwesome5 name="chevron-down" size={14} color="white" />
        </Animated.View>
      </TouchableOpacity>

      {open && (
        <Modal
          transparent
          animationType="none"
          visible={open}
          onRequestClose={closeMenu}
          statusBarTranslucent
        >
          {/* background overlay */}
          <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />

          {/* dropdown menu */}
          <Animated.View
            style={[
              styles.menu,
              {
                top: anchor.y + anchor.h + 4, // position below button
                left: anchor.x,
                width: anchor.w,
                opacity: fade,
                transform: [{ translateY: slide }],
                maxHeight,
              },
            ]}
            className={listWrapper}
          >
            <ScrollView bounces={false}>
              {items.map((item) => (
                <Pressable
                  key={item.value as Key}
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                  className={eachStyle}
                >
                  <ThemedText
                    className={`text-white ${
                      eachText ? eachText(item) : ""
                    }`}
                  >
                    {item.title}
                  </ThemedText>
                  {extra && extra(item)}
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
  },
  menu: {
    position: "absolute",
    backgroundColor: "#1f5079",
    borderRadius: 10,
    // overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    width: "100%",
    zIndex: 999,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.15)",
  },
});

export default Dropdown;
