import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AddIncomeBtn() {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.AddIncomeBtnText}>
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
  AddIncomeBtnText: {
    textAlign: "center",
  },
});
