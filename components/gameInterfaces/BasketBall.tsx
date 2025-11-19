// components/gameInterfaces/BasketBall.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Tabs, { TabType } from './BasketBall/Tabs';
import WinnerTab from './BasketBall/WinnerTab';
import OverUnderTab from './BasketBall/OverUnderTab';
import HandicapTab from './BasketBall/HandicapTab';
import ThreeWayTab from './BasketBall/ThreeWayTab'; 
import { Match } from '@/interface';

interface BasketBallProps {
  matches: Match[];
}

const BasketBall: React.FC<BasketBallProps> = ({ matches }) => {
  const [activeTab, setActiveTab] = useState<TabType>('winner');

  return (
    <View style={styles.container}>
      <Tabs onTabChange={setActiveTab} />
      {activeTab === 'winner' && <WinnerTab matches={matches} />}
      {activeTab === 'overunder' && <OverUnderTab matches={matches} />}
      {activeTab === 'handicap' && <HandicapTab matches={matches} />}
      {activeTab === 'threeway' && <ThreeWayTab matches={matches} />}
    </View>
  );
};

export default BasketBall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
