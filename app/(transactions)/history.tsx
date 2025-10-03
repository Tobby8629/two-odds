
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Layout from "./Layout";
import Button from "@/components/Reuseables/Button";
import { goBack } from "expo-router/build/global-state/routing";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { flex, flexNoJustify } from "@/constants/style";
import { ThemedText } from "@/components/ThemedText";
import Dropdown, { ItemProp } from "@/components/Reuseables/dropdown";
import { useMemo, useState } from "react";
import { mockTransactions } from "@/constants/data";
import { filterByDate } from "@/constants/functions";
import DatePickerExample from "@/components/Reuseables/DatePicker";

type TransactionType = "withdrawal" | "winnings" | "deposits" | "";

const History = () => {

  const items = useMemo<ItemProp<TransactionType>[]>(
    () => [
      { title: "All categories", value: "" },
      { title: "Withdrawal", value: "withdrawal" },
      { title: "Winnings", value: "winnings" },
      { title: "Deposits", value: "deposits" },
    ],
    []
  );

  type date = "all" | "7days" | "14days" | "30days";

  const quickFilter = useMemo(
    () => [
      { title: "All", filter: "all" },
      { title: "Last 7 days", filter: "7days" },
      { title: "Last 14 days", filter: "14days" },
      { title: "Last 30 days", filter: "30days" },
    ],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState<date>("all");
  const [select, setSelect] = useState<ItemProp<TransactionType>>(items[0]);

  return (
    <Layout title="Transaction History" otherLinks={<OtherLinks />}>
      
      <View className="flex bg-[#1F5079] mt-[1px] p-3 px-6 flex-row justify-between items-center">
        <Text className="text-white w-[72%]">
          Need to speed up your payment? Click to update your transaction
          status!
        </Text>
        <Button
          className="w-[25%] !h-[30px] p-1 rounded-none"
          textStyle="text-lg font-light"
          text="Fix status"
          onPress={() => goBack()}
        />
      </View>

      
      <View className="border-y-[1px] border-white flex mt-[1px] justify-between items-center flex-row">
        <Dropdown<TransactionType>
          items={items}
          title={select.title}
          setSelect={setSelect}
          mainWrapper="!w-[50%]"
          wrapper="my-0 py-0 pr-3 !w-full"
          className="!w-full !left-0 !ml-0 h-screen top-[27%] !rounded-none !bg-pry"
          eachText={(item) =>
            item?.title === select.title ? "!text-sec" : ""
          }
          extra={(item) =>
            item.title === select.title ? (
              <FontAwesome5 name="check" size={12} color="#FFC107" />
            ) : null
          }
        />
        <DatePickerExample 
        dateText={
          <FontAwesome6 name="angle-down" size={24} color="white" />
        }
        />
      </View>


      
      <View className="mt-[1px] bg-[#1F5079] p-4 px-6">
        <Text className="text-white">Month, Year</Text>
      </View>

      <View className={`${flex} px-6 py-4 !w-full`}>
        {quickFilter.map((e) => (
          <QuickFilterButton
            key={e.filter}
            label={e.title}
            active={selectedFilter === e.filter}
            onPress={() =>
              setSelectedFilter(e.filter as date) 
            }
          />
        ))}
      </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      {mockTransactions &&
        mockTransactions
          .filter(
            (txn) =>
              (select.value === "" || txn.type === select.value) && // category filter
              filterByDate(selectedFilter, txn.date) // date filter
          )
          .map((txn) => (
            <HistoryCard
              key={txn.id}
              type={txn.type}
              date={txn.date}
              amount={txn.amount}
            />
          ))}
    </ScrollView>
    

    </Layout>
  );
};

export default History;

const styles = StyleSheet.create({});

// 🔹 Other Links
export const OtherLinks = () => (
  <View className={`${flexNoJustify} gap-3`}>
    <Pressable>
      <FontAwesome6 name="magnifying-glass" size={17} color="white" />
    </Pressable>
    <Pressable className="border-[1px] rounded-full h-8 w-8 items-center justify-center border-white">
      <FontAwesome6 name="question" size={15} color="white" />
    </Pressable>
  </View>
);

// 🔹 Quick Filter Button (reusable)
const QuickFilterButton = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className={`p-4 py-3 !rounded-md !min-w-[20%] ${
      active ? "bg-sec" : "bg-transparent"
    }`}
  >
    <ThemedText className={`${active ? "text-white !text-center" : "text-gray-300 !text-left"} `}>
      {label}
    </ThemedText>
  </Pressable>
);


interface HistoryCardProps {
  type: TransactionType;
  date: string;
  amount: number;
}

export const HistoryCard = ({ type, date, amount }: HistoryCardProps) => {
  return (
    <View className='p-6 pt-2 border-b-[0.2px] border-white flex-row justify-between items-start '>
      <View>
        <Text className='text-white mb-2 font-semibold text-lg'>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
        <Text className='text-white text-sm font-light'>
          {new Date(date).toLocaleString()}
        </Text>
      </View>
      <View className='  !text-right !min-w-[15%] flex-row gap-1 items-center'>
        {type === "withdrawal" ? <Text className="text-2xl font-semibold text-red-500">-</Text>  : 
        <Text className="text-xl font-semibold text-green-500">+</Text>}
       <Text className="text-white text-lg font-semibold">${amount}</Text> 
      </View>
    </View>
  );
};

