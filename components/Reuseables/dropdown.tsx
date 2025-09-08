import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

export interface ItemProp {
  title: string;
  value: string;
  icon?: ReactNode | string
}

interface DropdownProps {
  title: string;
  items: ItemProp[];
  setSelect: React.Dispatch<React.SetStateAction<ItemProp>>;
  maxHeight?: number;
  eachStyle?: string;
  listWrapper?:string;
  wrapper?:string;
  eachText?: (item?: ItemProp) => string;
  extra?:(item: ItemProp) => React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  items,
  setSelect,
  maxHeight = 260,
  eachStyle,
  listWrapper,
  wrapper,
  eachText,
  extra
}) => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const headerRef = useRef<View>(null);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(6)).current;
  const rotate = useRef(new Animated.Value(0)).current; // 0 closed, 1 open

  const rotateDeg = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const openMenu = () => {
    headerRef.current?.measureInWindow?.((x, y, w, h) => {
      setAnchor({ x, y, w, h });
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
    });
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

  const handleSelect = (it: ItemProp) => {
    setSelect(it);
    closeMenu();
  };

  return (
    <>
      
      <TouchableOpacity
        ref={headerRef}
        onPress={handleToggle}
        style={styles.header}
        className={wrapper}
        activeOpacity={0.8}
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
          onRequestClose={closeMenu}
          statusBarTranslucent
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
          <Animated.View
            style={[
              styles.menu,
              {
                top: anchor.y + anchor.h,
                left: anchor.x,
                // width: anchor.w,
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
                  key={item.value}
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                  className = {eachStyle}
                >
                  <ThemedText className={`text-white ${eachText ? eachText(item) : ""}`}>{item.title}</ThemedText>
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
    // textAlign: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
  },

  menu: {
    position: "absolute",
    backgroundColor: "#1f5079",
    borderRadius: 10,
    overflow: "hidden",
    // Shadows
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.15)",
  },
});

export default Dropdown;
