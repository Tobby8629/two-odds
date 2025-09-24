import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

export interface ItemProp<T> {
  title: string;
  value: T;
  icon?: React.ReactNode | string;
}

interface DropdownProps<T> {
  title: string;
  items: ItemProp<T>[];
  setSelect: React.Dispatch<React.SetStateAction<ItemProp<T>>>;
  maxHeight?: number;
  eachStyle?: string;
  listWrapper?: string;
  className: string;
  wrapper?: string;
  eachText?: (item: ItemProp<T>) => string;
  extra?: (item: ItemProp<T>) => React.ReactNode;
}

export default function Dropdown<T>({
  title,
  items,
  setSelect,
  maxHeight = 300,
  eachStyle,
  listWrapper,
  wrapper,
  eachText,
  className,
  extra,
}: DropdownProps<T>) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: ItemProp<T>) => {
    setSelect(item);
    setVisible(false);
  };

  return (
    <View
     style={[styles.wrapper, { margin: 5 }]}>
      {/* Dropdown Button */}
      <TouchableOpacity
        className={`gap-2 !items-center  ${wrapper}`}
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <ThemedText className=" font-medium text-xl" style={styles.dropdownText}>{title}</ThemedText>
        <FontAwesome5 name="chevron-down" size={16} color={"white"} />
      </TouchableOpacity>

      {/* <Pressable className=" absolute" onPress={() => setVisible(false)}/> */}

      {/* Modal Dropdown List */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View
            className={`${className}`}
            style={[
              styles.listWrapper,
              { maxHeight: maxHeight },
              listWrapper ? { padding: 5 } : {},
            ]}
          >
            <ScrollView>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.item, eachStyle ? { marginVertical: 2 } : {}]}
                  onPress={() => handleSelect(item)}
                >
                  {/* Icon */}
                  {typeof item.icon === "string" ? (
                    <FontAwesome5
                      name={item.icon}
                      size={16}
                      style={styles.icon}
                    />
                  ) : (
                    item.icon
                  )}

                  {/* Item Text */}
                  <ThemedText className={`${
                      eachText ? eachText(item) : ""
                    }`} >
                    {item.title}
                  </ThemedText>

                  {/* Extra Node */}
                  {extra && <View style={styles.extra}>{extra(item)}</View>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  overlay: {
    flex: 1,
  },

  listWrapper: {
    marginHorizontal: 20,
    backgroundColor: "#1f5079",
    borderRadius: 8,
    paddingVertical: 5,
    position: "absolute"
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  extra: {
    marginLeft: 10,
  },
});


