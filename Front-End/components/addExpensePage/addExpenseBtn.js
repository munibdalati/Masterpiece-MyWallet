import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global";
import { FontAwesome5 } from "@expo/vector-icons";
import expenseSubmit from "./amountEntryExpense"

export default function AddExpenseBtn() {
  const handleAddExpense = () => {
    expenseSubmit();
  };
  return (
    <View>
      <TouchableOpacity onPress={handleAddExpense}>
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
