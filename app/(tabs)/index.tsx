// import { FlatList } from 'react-native';
// import Head from '@/components/Home/Head';
// import Sport from '@/components/Home/Sport';
// import Quickpick from '@/components/Home/Quickpick';
// import LiveBets from '@/components/Home/LiveBets';
// import { Footer, MatchCard, PopularHeader } from '@/components/Home/Popular';
// import WithdrawModal from '@/components/Home/WithdrawModal';
// import useBetslip from '@/store/useStore';

// export default function HomeScreen() {
//   const { match } = useBetslip()
//   console.log("match", match);

//   return (
//     <FlatList
//       data={match}
//       renderItem={({ item }) => <MatchCard data={item}/>}
//       keyExtractor={(item) => item.id.toString()}
//       ListHeaderComponent={
//         <>
//           <Head />
//           <Sport />
//           <Quickpick />
//           <LiveBets />
//           <PopularHeader />
//         </>
//       }
//       ListFooterComponent={
//         <>
//           <Footer />
//           <WithdrawModal />
//         </>
//       }
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ backgroundColor: '#123456', paddingVertical: 56 }}
//     />
//   );
// }


import { useState } from 'react';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Head from '@/components/Home/Head';
import Sport from '@/components/Home/Sport';
import Quickpick from '@/components/Home/Quickpick';
import LiveBets from '@/components/Home/LiveBets';
import { MatchCard, PopularHeader } from '@/components/Home/Popular';
import WithdrawModal from '@/components/Home/WithdrawModal';
import useBetslip from '@/store/useStore';
import { MatchProps } from '@/interface';


type CombinedItem = 'header' | MatchProps;

export default function HomeScreen() {
  const { match } = useBetslip();
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    setIsSticky(scrollY > 520);
  };

  const combinedData: CombinedItem[] = ['header', ...match];

  return (
    <FlatList<CombinedItem>
      data={combinedData}
      renderItem={({ item }) =>
        item === 'header' ? (
          <PopularHeader isSticky={isSticky} />
        ) : (
          <MatchCard data={item} />
        )
      }
      keyExtractor={(item) => (item === 'header' ? 'header' : item.id.toString())}
      ListHeaderComponent={
        <>
          <Head />
          <Sport />
          <Quickpick />
          <LiveBets />
        </>
      }
      stickyHeaderIndices={[1]} // "header" is the 2nd element (index 1)
      ListFooterComponent={<WithdrawModal />}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: '#123456',
        paddingVertical: 56,
      }}
    />
  );
}
