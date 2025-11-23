// components/gameInterfaces/Tennis/Tennis.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TennisTabs, { TabType } from './Tennis/TennisTabs';
import WinnerTab from './BasketBall/WinnerTab';
import TennisOverUnderTab from './Tennis/TennisOverUnderTab';
import HandicapTab from './BasketBall/HandicapTab';
import { Match, MatchProps } from '@/interface';

interface TennisProps {
  matches: MatchProps[];
}

const Tennis: React.FC<TennisProps> = ({ matches }) => {
  const [activeTab, setActiveTab] = useState<TabType>('winner');

  return (
    <View style={styles.container}>
      <TennisTabs onTabChange={setActiveTab} initialTab="winner" />
      {activeTab === 'winner' && <WinnerTab matches={matches} />}
      {activeTab === 'overunder' && <TennisOverUnderTab matches={matches} />}
      {/* {activeTab === 'handicap' && <HandicapTab matches={matches} />} */}
    </View>
  );
};

export default Tennis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
