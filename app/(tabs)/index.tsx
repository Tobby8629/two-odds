import { FlatList } from 'react-native';
import Head from '@/components/Home/Head';
import Sport from '@/components/Home/Sport';
import Quickpick from '@/components/Home/Quickpick';
import LiveBets from '@/components/Home/LiveBets';
import { Footer, MatchCard, PopularHeader } from '@/components/Home/Popular';
import WithdrawModal from '@/components/Home/WithdrawModal';
import useBetslip from '@/store/useStore';

export default function HomeScreen() {
  const { match } = useBetslip()
  console.log("match", match);

  return (
    <FlatList
      data={match}
      renderItem={({ item }) => <MatchCard data={item}/>}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <Head />
          <Sport />
          <Quickpick />
          <LiveBets />
          <PopularHeader />
        </>
      }
      ListFooterComponent={
        <>
          <Footer />
          <WithdrawModal />
        </>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: '#123456', paddingVertical: 56 }}
    />
  );
}
