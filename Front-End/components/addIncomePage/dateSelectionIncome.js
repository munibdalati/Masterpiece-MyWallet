import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global";

export default function DateSelectionIncome() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide the DateTimePicker on iOS
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let daysOfWeek = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    let dayOfWeek = daysOfWeek[tempDate.getDay()];
    let fDate =
      dayOfWeek +
      " " +
      tempDate.getDate() +
      " / " +
      (tempDate.getMonth() + 1) +
      " / " +
      tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleConfirm = () => {
    setShow(false);
  };

  return (
    <View style={styles.dateSelection}>
      <Text style={styles.dateText}>{text}</Text>
      <TouchableOpacity
        onPress={() => showMode("date")}
        style={styles.selectionBtn}
      >
        <Text style={styles.btnText}>اختر يوم الدخل</Text>
      </TouchableOpacity>

      {show && (
        <View  style={styles.confirmBtnContainer}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="spinner"
            onChange={onChange}
          />
          <TouchableOpacity onPress={handleConfirm} style={styles.selectionBtn}>
            <Text style={styles.btnText}>تأكيد</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateSelection: {
    paddingVertical: 20,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  dateText: {
    textAlign: "center",
    color: globalStyles.primaryColor,
    fontSize: 16,
  },
  selectionBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: globalStyles.primaryColor,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 130,
  },
  btnText:{
    color:"white"
  },
  confirmBtnContainer:{
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  }
});
