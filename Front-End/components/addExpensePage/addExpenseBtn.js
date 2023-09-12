import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global";
3;
import { FontAwesome5 } from "@expo/vector-icons";
import amountHandler from "./amountEntryExpense"

export default function AddExpenseBtn() {
  const handleAddExpense = () => {
    // Replace these sample values with the actual values you want to pass to amountHandler
    const values = {
      categoryValue: "1",
      textInputValue: "100",
      currencyValue: "1",
    };

    // Call the amountHandler function with the values
    amountHandler(values);
  };
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.AddExpenseBtnText}>
          <FontAwesome5
            name="check"
            size={24}
            color={globalStyles.primaryColor}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  AddExpenseBtnText: {
    textAlign: "center",
  },
});
