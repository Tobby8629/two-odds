import { useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";
import Head from "@/components/Home/Head";
import Sport from "@/components/Home/Sport";
import Quickpick from "@/components/Home/Quickpick";
import LiveBets from "@/components/Home/LiveBets";
import { MatchCard, PopularHeader } from "@/components/Home/Popular";
import WithdrawModal from "@/components/Home/WithdrawModal";
import useBetslip from "@/store/useStore";
import { MatchProps } from "@/interface";
import { useTabStore } from "@/store/useTabStore";
import { useP2PStore } from "@/store/useP2PStore";
import P2PToggle from "@/components/P2P/P2PToggle";
import P2PLanding from "@/components/P2P/P2PLanding";
import P2PSearching from "@/components/P2P/P2PSearching";
import P2PBetsList from "@/components/P2P/P2PBetsList";

type CombinedItem = "header" | MatchProps;

export default function HomeScreen() {
  const { match } = useBetslip();
  const [isSticky, setIsSticky] = useState(false);
  const { activeTab, setActiveTab } = useTabStore();
  const { currentScreen } = useP2PStore();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    setIsSticky(scrollY > 520);
  };

const combinedData: CombinedItem[] = ["header", ...match];
if(activeTab === "p2p") {
  // Render P2P related components or screens
  if (currentScreen === "landing") return <P2PLanding />;
  if (currentScreen === "searching") return <P2PSearching />;
  if (currentScreen === "list") return <P2PBetsList />;
}

return (
    <FlatList<CombinedItem>
      data={combinedData}
      renderItem={({ item }) =>
        item === "header" ? (
          <PopularHeader isSticky={isSticky} />
        ) : (
          <MatchCard data={item} />
        )
      }
      keyExtractor={(item) =>
        item === "header" ? "header" : item.id.toString()
      }
      ListHeaderComponent={
        <>
          <P2PToggle active={activeTab} onChange={setActiveTab} />
          <Head />
          <Sport />
          <Quickpick />
          <LiveBets />
        </>
      }
    
      ListFooterComponent={<WithdrawModal />}
      stickyHeaderIndices={[1]}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: "#123456",
    paddingVertical: 56,
  },
});
