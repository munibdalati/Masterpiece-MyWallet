import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../shared/header";
import HeaderSummary from "../shared/headerSummary";
import AmountEntryExpense from "../components/addExpensePage/amountEntryExpense";
import { globalStyles } from "../styles/global";


export default function AddExpense() {
  return (
    <View style={styles.AddExpense}>
      <Header title="تسجيل مصروف" showTotal={false} loggedIn={true} homeIcon={true}/>
      <HeaderSummary />
      <AmountEntryExpense/>
    </View>
  );
}

const styles = StyleSheet.create({  
    AddExpense:{
        backgroundColor:globalStyles.tertiaryColor,
        height:"100%"
    }  
})
