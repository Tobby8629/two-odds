// components/gameInterfaces/BasketBall.tsx
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native'; 
import { BettingMarket } from '@/interface';
import MatchCard from './Reuseables/MatchCard';
import useBetslip from '@/store/useStore';
import MarketTabs from './Reuseables/MarketTab';
import HeaderRow from './Reuseables/HeaderRow';
import { Match } from '@/constants/dataOne';
import { useSport } from '@/store/useSports';

interface BasketBallProps {
  matches: Match[];
  markets: BettingMarket[];
  setMarkets: React.Dispatch<React.SetStateAction<BettingMarket[]>>;
}

const BasketBall: React.FC<BasketBallProps> = ({ matches, markets, setMarkets }) => {
  const [goalDD, setGoalDD] = useState(false);
  const selectMarket = useCallback((id: number) => {
      setMarkets((prev) =>
        prev.map((m) => ({
          ...m,
          selected: m.id === id,
        }))
      );
  }, []);
  
  const selectedMarket = markets.find((m) => m.selected);
  const { selectGame } = useSport()
  

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header Bar */}
      <View style={styles.stickyHeader}>
          <MarketTabs markets={markets} selectMarket={selectMarket}/>
          <HeaderRow 
          selectedMarket={selectedMarket} 
          setMarkets={setMarkets} 
          goalDD={goalDD}
          setGoalDD={setGoalDD}
          />
      </View>

      {/* Scrollable Game Cards */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {matches.map((item, idx) => (
          <MatchCard 
            key={String(idx)} 
            match={item} 
            selectGame={selectGame} 
            selectedMarket={selectedMarket} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BasketBall;

const styles = StyleSheet.create({
  stickyHeader: {
    borderTopWidth: 1,
    borderTopColor: '#DFDFDFCC',
  },
  container: {
    paddingBottom: 32,
  },
  header: {
    width: '100%',
    height: 37,
    backgroundColor: '#1F5079',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 32,
    marginRight: 45,
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});
