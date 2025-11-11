import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import RadioButton from "@/components/Reuseables/Input/RadioBtn";
import { ThemedText } from "@/components/ThemedText";

const Notifications = () => {
  const [options, setOptions] = useState([
    { label: "Withdrawals", value: false },
    { label: "Deposit", value: false },
    { label: "Winnings", value: false },
    { label: "Account Updates", value: false },
    { label: "Active Players", value: false },
  ]);

  const [centralCtrl, setCentralCtrl] = useState(false);

  // ✅ Keep central toggle in sync with options
  useEffect(() => {
    const allActive = options.every((e) => e.value === true);
    setCentralCtrl(allActive);
  }, [options]);

  // ✅ Toggle all notifications
  const activateAll = () => {
    const newCentral = !centralCtrl;
    setCentralCtrl(newCentral);
    setOptions(options.map((option) => ({ ...option, value: newCentral })));
  };

  // ✅ Toggle a single notification
  const toggleOption = (label: string) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.label === label
          ? { ...option, value: !option.value }
          : option
      )
    );
  };

  return (
    <Layout header="Notifications">
      <View style={styles.container}>
        <View style={styles.row} className="border-b border-gray-400">
          <ThemedText className="capitalize text-lg">All Notifications</ThemedText>
          <RadioButton value={centralCtrl} onToggle={activateAll} />
        </View>

        {options.map((e) => (
          <View key={e.label} style={styles.row} >
            <ThemedText className="capitalize text-lg">{e.label}</ThemedText>
            <RadioButton value={e.value} onToggle={() => toggleOption(e.label)} />
          </View>
        ))}
      </View>
    </Layout>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginVertical: 8,
  },
});
