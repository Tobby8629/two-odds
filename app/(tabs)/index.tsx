import { Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../(Onboarding)/OnboardContext';
import Head from '@/components/Home/Head';
import Sport from '@/components/Home/Sport';
import Quickpick from '@/components/Home/Quickpick';
import LiveBets from '@/components/Home/LiveBets';
import Popular from '@/components/Home/Popular';
import { Link } from 'expo-router';
import WithdrawModal from '@/components/Home/WithdrawModal';

// P2P imports
import P2PToggle from '@/components/P2P/P2PToggle';
import P2PLanding from '@/components/P2P/P2PLanding';
import P2PSearching from '@/components/P2P/P2PSearching';
import { useTabStore } from '@/store/useTabStore';
import { useP2PStore } from '@/store/useP2PStore';

export default function TabsIndex() {
  const { activeTab, setActiveTab } = useTabStore();
  const {currentScreen} = useP2PStore();

  return (
    <ScrollView className='bg-pry py-14 pb-52'>
      
      <P2PToggle
        activeTab={activeTab}
        onToggle={setActiveTab}
        containerStyle={{ alignSelf: 'center', marginBottom: 20 }} // fixed container style issue
      />

      /* Show content based on selected tab */
      {activeTab === 'bets' ? (
        <>
          <Head />
          <Sport />
          <Quickpick />
          <LiveBets />
          {/* <Link href={"/(transactions)/deposit"} className='bg-white rounded-full p-4'>
            transaction history
          </Link> */}
          <Popular />
          <WithdrawModal />
        </>
      ) : (
        <>
          {currentScreen === 'landing' && <P2PLanding />}
          {currentScreen === 'searching' && <P2PSearching />}
          {/* P2PBetsList will come later */}
        </>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});