<<<<<<< HEAD
import React from "react";
import { StyleSheet } from "react-native";
import Head from "@/components/Home/Head";
import Sport from "@/components/Home/Sport";
import Quickpick from "@/components/Home/Quickpick";
import LiveBets from "@/components/Home/LiveBets";
import Popular from "@/components/Home/Popular";
import WithdrawModal from "@/components/Home/WithdrawModal";

import P2PLanding from "@/components/P2P/P2PLanding";
import P2PSearching from "@/components/P2P/P2PSearching";
import P2PBetsList from "@/components/P2P/P2PBetsList";

import StickyToggleLayout from "@/components/Reuseables/StickyToggleLayout";
import { useTabStore } from "@/store/useTabStore";
import { useP2PStore } from "@/store/useP2PStore";

export default function TabsIndex() {
  const { activeTab, setActiveTab } = useTabStore();
  const { currentScreen } = useP2PStore();

  const shouldShowStickyToggle =
    activeTab === "bets" || currentScreen === "landing";

  const Content = () => {
    if (activeTab === "bets") {
      return (
=======
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
>>>>>>> master
        <>
          <Head />
          <Sport />
          <Quickpick />
          <LiveBets />
<<<<<<< HEAD
          <Popular />
          <WithdrawModal />
        </>
      );
    }

    // Only show sticky toggle for landing, not searching or list
    if (currentScreen === "landing") return <P2PLanding />;
    if (currentScreen === "searching") return <P2PSearching />;
    if (currentScreen === "list") return <P2PBetsList />;
  };

  return shouldShowStickyToggle ? (
    <StickyToggleLayout active={activeTab} onChange={setActiveTab}>
      <Content />
    </StickyToggleLayout>
  ) : (
    <Content />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
  },
});
=======
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
>>>>>>> master
