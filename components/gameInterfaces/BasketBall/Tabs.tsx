import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export type TabType = 'winner' | 'overunder' | 'handicap' | 'threeway';

interface TabsProps {
  onTabChange: (tab: TabType) => void;
  initialTab?: TabType;
}

const Tabs: React.FC<TabsProps> = ({ onTabChange, initialTab = 'winner' }) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const tabs: { key: TabType; label: string }[] = [
    { key: 'winner', label: 'Winner' },
    { key: 'overunder', label: 'Over/Under' },
    { key: 'handicap', label: 'Handicap' },
    { key: 'threeway', label: '3-Way' },
  ];

  const handlePress = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => handlePress(tab.key)}
          style={styles.tab}
        >
          <Text style={[styles.label, activeTab === tab.key && styles.activeLabel]}>
            {tab.label}
          </Text>
          {activeTab === tab.key && <View style={styles.dot} />}
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#003C6F', 
    paddingVertical: 12,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  activeLabel: {
    color: '#FFA500',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFA500',
    marginTop: 4,
  },
});