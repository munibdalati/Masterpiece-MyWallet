import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global";
3;
import { FontAwesome5 } from "@expo/vector-icons";

export default function AddExpenseBtn() {
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
