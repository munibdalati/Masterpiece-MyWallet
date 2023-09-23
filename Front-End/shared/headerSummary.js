import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused

export default function HeaderSummary() {
  const [id, setId] = useState("");
  const [expense, setExpense] = useState("");
  const [income, setIncome] = useState("");
  let remaining = income - expense
 
  const isFocused = useIsFocused(); // Track if the screen is focused


  // Retrieve the information from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem("_id")
      .then((value) => {
        if (value) {
          setId(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving id:", error);
      });
  }, []);
  useEffect(() => {
    if(isFocused) {
    // Make the API call within a useEffect hookf
    axios
      .get(`http://10.0.2.2:8000/api/wallet/getUserWallet/${id}`)

      .then((res) => {
        const wallet = res.data.data.wallet;
        if (wallet) {
          setExpense(wallet.expense);
          setIncome(wallet.income);
        }
      })

      .catch((error) => {
        console.error("Error fetching data: ", error.message);
      });}
  }, [id, isFocused]);

  return (
    <View style={styles.headerSummary}>
      <View style={styles.section}>
        <Text style={styles.headerSummaryTitle}>المتبقي</Text>
        <Text style={styles.remaining}>{remaining}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.headerSummaryTitle}>الدخل</Text>
        <Text style={styles.income}>{income}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.headerSummaryTitle}>المصاريف</Text>
        <Text style={styles.expenses}>{expense}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.monthTitle}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          <Text style={styles.headerSummaryTitle}>الشهر</Text>
        </View>

        <Text style={styles.month}>حزيران 2023</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSummary: {
    backgroundColor: globalStyles.secondaryColor,
    paddingHorizontal: 10,
    paddingVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  headerSummaryTitle: {
    color: "white",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  remaining: {
    color: "yellow",
    textAlign: "center",
    fontSize: 16,
  },
  income: {
    color: "green",
    textAlign: "center",
    fontSize: 16,
  },
  expenses: {
    color: "#ff0000",
    textAlign: "center",
    fontSize: 16,
  },
  month: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  monthTitle: {
    display: "flex",
    flexDirection: "row",
  },
});
