// components/gameInterfaces/BasketBall/LineSelector.tsx
import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface LineSelectorProps {
  visible: boolean;
  lines: Array<{ line: string; [key: string]: string }>;
  selectedLine: string | null;
  onSelect: (line: string) => void;
  onClose: () => void;
}

const LineSelector: React.FC<LineSelectorProps> = ({
  visible,
  lines,
  selectedLine,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal} onStartShouldSetResponder={() => true}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Select</Text>
            {lines.map((item) => (
              <Pressable
                key={item.line}
                style={styles.lineItem}
                onPress={() => {
                  onSelect(item.line);
                  onClose();
                }}
              >
                <Text style={styles.lineText}>{item.line}</Text>
                {selectedLine === item.line && (
                  <FontAwesome6 name="check" size={18} color="#FFA500" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default LineSelector;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 112,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    paddingHorizontal: 16,
    maxHeight: 300,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 15, 
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  lineText: {
    fontSize: 14,
    color: '#000',
  },
});
