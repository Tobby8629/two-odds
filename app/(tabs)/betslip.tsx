import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { flex, flexNoJustify } from '@/constants/style';
import { FontAwesome5 } from '@expo/vector-icons';
import Dropdown from '@/components/Reuseables/dropdown';
import  { useState } from 'react';
import useBetslip from '@/store/useStore';
import EmptyState from '@/components/Reuseables/EmptyState';
import AnimatedPopup from '@/components/Reuseables/Animations/Popup';
import MatchCard from '@/components/Betslip/MatchCard';
import Footer from '@/components/Betslip/Footer';
import PopupD from '@/components/Betslip/PopupD';
import Error from '@/components/Reuseables/Error';

export default function TabTwoScreen() {
  const options = [
    {title:"Bet Accumulator", value: "bet_Accumulator"}, 
    {title:"Single Bet", value: "single"}, 
    {title:"System Bet", value: "system"}
  ]
  const [visible, setVisible] = useState(false)
   const [err, setErr] = useState({status: false, message: ""})
  const onClose = () => setVisible(false)
  const onOpen = () => {
    setVisible(true)
  }
  const [selected, setSelected] = useState(options[0]) 
  const { match, clearBetslip} = useBetslip()
  const { height } = Dimensions.get("window");
  const handleSubmit = (stake: number | null, baseStake: number) => {
    if(stake && stake < baseStake || !stake) {
      setErr({status: true, message: "insufficient Balance"})
    }
  }


  return (
    <View  
        style={{
        height: height - 70,
        backgroundColor: "#003c6f",
      }} className=' bg-[#003c6f]'
    >
      <View className={`${flex} fixed top-0 pt-14 pb-7 px-7 left-0 right-0 z-10 bg-pry-light`}>
        <View className='h-10 w-10 justify-center items-center rounded-full bg-sec'>
          <Text className='text-xl font-bold text-white '>{match.length}</Text>
        </View>
        <Dropdown 
          title={selected?.title} 
          items={options} 
          setSelect={setSelected}
          eachStyle='flex-row gap-3 item-center'
          eachText={(item) => `${item?.title === selected.title ? "!text-sec" : null} `}
          extra = {(item) => <FontAwesome5 name={ item.title === selected.title ? "check" : ""} size={12} color={"#FFC107"}/>}
        />
        <View className={`${flexNoJustify} gap-4`}>
          <ThemedText className={`!text-[#cbc9c9] text-lg`}>$20.00</ThemedText>
          <Pressable onPress={onOpen}>
            <FontAwesome5 name={"trash"} color={"#cbc9c9"} size={20}/>
          </Pressable>
        </View>
      </View>
      {match.length <= 0 ? <EmptyState className='!mt-[50%] ' text='Your betslip is empty'/> : 
        <>
          <MatchCard />
          <Footer handleSubmit={handleSubmit}/>
          <AnimatedPopup
            visible={visible}
            onClose={onClose}
            className='!bg-[#E3F2FD]'
            children = {<PopupD 
              onClose={onClose}
              func={clearBetslip}
              headerText='Delete Betslip'
              text={"Are you sure you want to clear your list"}
            /> }
          />
        </>
      }
      <Error error={err.message} setError={setErr} className='top-[10%]'/>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
