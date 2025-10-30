// import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { useAuth } from '../(Onboarding)/OnboardContext';
// import Head from '@/components/Home/Head';
// import Sport from '@/components/Home/Sport';
// import Quickpick from '@/components/Home/Quickpick';
// import LiveBets from '@/components/Home/LiveBets';
// import Popular from '@/components/Home/Popular';
// import { Link } from 'expo-router';
// import WithdrawModal from '@/components/Home/WithdrawModal';

// export default function HomeScreen() {
//   // const {userId} = useAuth()
  
//   return (
//     <ScrollView className='bg-pry py-14 pb-52'>
//       <Head />
//       <Sport />
//       <Quickpick />
//       <LiveBets />
//       <Popular />
//       <WithdrawModal />
//     </ScrollView>
    
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

import { FlatList } from 'react-native';
import Head from '@/components/Home/Head';
import Sport from '@/components/Home/Sport';
import Quickpick from '@/components/Home/Quickpick';
import LiveBets from '@/components/Home/LiveBets';
import { Footer, MatchCard, PopularHeader } from '@/components/Home/Popular';
import WithdrawModal from '@/components/Home/WithdrawModal';
import { match } from '@/constants/data';

export default function HomeScreen() {
  

  return (
    <FlatList
      data={match}
      renderItem={({ item }) => <MatchCard data={item}/>}
      keyExtractor={(item) => item.toString()}
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
