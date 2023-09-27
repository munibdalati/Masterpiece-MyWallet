import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused


export default function DaySummary() {
  const [id, setId] = useState("");
  const [transactions, setTransactions] = useState([]);
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
    // Make the API call within a useEffect hook
    if (isFocused) {
      axios
        .get(`http://10.0.2.2:8000/api/wallet/getUserWallet/${id}`)
        .then((res) => {
          const transactionsData = res.data.data.wallet.transactions;
          if (transactionsData) {
            // Sort the transactions by date in descending order
            transactionsData.sort((a, b) => {
              // Parse the date strings and compare them
              const dateA = new Date(
                a.date.split("/").reverse().join("-") // Convert to "year-month-day" format
              );
              const dateB = new Date(
                b.date.split("/").reverse().join("-") // Convert to "year-month-day" format
              );
              return dateB - dateA;
            });

            // Group transactions by date and calculate the total income and total expenses for each date
            const groupedTransactions = {};
            transactionsData.forEach((transaction) => {
              const date = transaction.date;
              if (!groupedTransactions[date]) {
                groupedTransactions[date] = {
                  date,
                  transactions: [],
                  totalIncome: 0, // Initialize total income
                  totalExpenses: 0, // Initialize total expenses
                };
              }
              groupedTransactions[date].transactions.push(transaction);
              if (transaction.type === "دخل") {
                groupedTransactions[date].totalIncome += transaction.value;
              } else if (transaction.type === "مصروف") {
                groupedTransactions[date].totalExpenses += transaction.value;
              }
            });

            // Convert the grouped transactions to an array of objects
            const transactionsArray = Object.values(groupedTransactions);

            setTransactions(transactionsArray);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error.message);
        });
    }
  }, [id, isFocused]);

  // Function to determine text color based on transaction type
  const getTextStyle = (type) => {
    return type === "دخل" ? styles.greenText : styles.redText;
  };
  const cashIcon = (
    <MaterialCommunityIcons name="cash" size={20} color="black" />
  );
  const creditCardIcon = <Entypo name="credit-card" size={16} color="black" />;
  const getCashCardIcon = (cashCard) => {
    return cashCard === "كاش" ? cashIcon : creditCardIcon;
  };

  return (
    <View>
      {transactions.length === 0 ? (
        <Text style={styles.noTransactions}>لا يوجد حركات مسجلة</Text>
      ) : (
        transactions.map((day, index) => (
          <View style={styles.daySummary} key={index}>
            <View style={styles.dayTotal}>
              <View style={styles.dailyTotal}>
                <Text style={styles.dailyIncome}>{day.totalIncome}</Text>
                <Text style={styles.dailyDash}>/</Text>
                <Text style={styles.dailyExpense}>{day.totalExpenses}</Text>
              </View>
  
              <Text style={styles.date}>{day.date.split("/").reverse().join("-")}</Text>
            </View>
            {day.transactions.map((transaction, subIndex) => (
              <View style={styles.dayCategory} key={subIndex}>
                <Text
                  style={[styles.dayCategoryText, getTextStyle(transaction.type)]}
                >
                  {transaction.value} {transaction.currency}
                </Text>
                <View style={styles.categoryContainer}>
                  <Text
                    style={[
                      styles.dayCategoryText,
                      getTextStyle(transaction.type),
                    ]}
                  >
                    {transaction.category}
                  </Text>
                  <Text
                    style={[
                      styles.cashCardIcon,
                      getTextStyle(transaction.type),
                    ]}
                  >
                    {getCashCardIcon(transaction.cashCard)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noTransactions:{
    backgroundColor: globalStyles.tertiaryColor,
    textAlign:"center",
    paddingVertical: 20,
    margin: 10,
    borderRadius: 10,
    fontSize: 18
  },
  daySummary: {
    backgroundColor: globalStyles.tertiaryColor,
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    margin: 10,
    borderRadius: 10,
  },
  dayTotal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomColor: globalStyles.primaryColor,
    borderBottomWidth: 1,
  },
  date: {
    color: "#000",
    fontWeight: "bold",
  },
  dailyTotal: {
    display: "flex",
    flexDirection: "row",
  },
  dailyIncome: {
    fontSize: 16,
    color: "#008000",
    fontWeight: "bold",
  },
  dailyExpense: {
    fontSize: 16,
    color: "#FF0000",
    fontWeight: "bold",
  },
  dailyDash: { fontSize: 16, fontWeight: "bold" },
  dayCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  categoryContainer: { display: "flex", flexDirection: "row", gap: 5 },
  cashCardIcon: { alignItems: "center", },
  dayCategoryText: {
    color: "#000",
  },
  greenText: {
    color: "#008000",
  },
  redText: {
    color: "#FF0000",
  },
});
