import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

interface P2PLandingButtonProps {
  text: string;
  onPress: () => void;
  showArrow?: boolean;
}

export default function P2PLandingButton({ text, onPress, showArrow }: P2PLandingButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        {showArrow && (
          <Text style={styles.arrow}>→</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3A668B',
    width: 117,
    height: 43,
    borderRadius: 8,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
  },
  arrow: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: -4,
    marginTop: -4,
    transform: [{ rotate: '-29deg' }],
  },
});