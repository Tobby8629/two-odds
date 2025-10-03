import { ReactNode, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface CustomDatePickerProps {
  dateText: ReactNode; // your icon
  onDateChange?: (date: Date) => void;
  initialDate?: Date;
}

export default function DatePickerExample({
  dateText,
  onDateChange,
  initialDate = new Date(),
}: CustomDatePickerProps) {
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      // close after selection on Android
      setShow(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
      onDateChange?.(selectedDate);
    }
  };

  return (
    <View className="flex-row p-3 px-6 w-[49.8%] border-l-[1px] border-white items-center justify-between">
      {/* Icon that opens the calendar */}
      <Pressable onPress={() => setShow(true)}>
        {dateText}
      </Pressable>

      {/* Calendar modal */}
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
