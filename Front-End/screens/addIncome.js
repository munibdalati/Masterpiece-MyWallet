import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../shared/header";
import HeaderSummary from "../shared/headerSummary";
import AmountEntryIncome from "../components/addIncomePage/amountEntryIncome";
import { globalStyles } from "../styles/global";

export default function AddIncome() {
  return (
    <View style={styles.AddIncome}>
      <Header title="تسجيل دخل" showTotal={false} loggedIn={true} homeIcon={true}/>
      <HeaderSummary />
      <AmountEntryIncome/>
    </View>
  );
}

const styles = StyleSheet.create({  
    AddIncome:{
        backgroundColor:globalStyles.tertiaryColor,
        height:"100%"
    }  
})
