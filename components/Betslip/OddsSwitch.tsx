import React from 'react';
import { Pressable, View } from 'react-native';

/*
 * Figma "Accepts odds change" switch (on state): track 56x27 radius 30 #FFA500,
 * knob 30x27 radius 30 #FFFFFF flush right. The off state is not drawn in the
 * design, so it mirrors the on state (knob left, grey track).
 */
const OddsSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
  <Pressable onPress={onToggle} hitSlop={8}>
    <View
      style={{
        width: 56,
        height: 27,
        borderRadius: 30,
        backgroundColor: value ? '#FFA500' : '#D9D9D9',
        alignItems: value ? 'flex-end' : 'flex-start',
      }}
    >
      <View style={{ width: 30, height: 27, borderRadius: 30, backgroundColor: '#FFFFFF' }} />
    </View>
  </Pressable>
);

export default OddsSwitch;
