import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../shared/header";
import HeaderSummary from "../shared/headerSummary";
import DaySummary from "../components/homePage/daySummary";
import PlusMinus from "../components/homePage/plusMinus";
import { globalStyles } from "../styles/global";
import { useFocusEffect } from "@react-navigation/native";


export default function Home() {
  useFocusEffect(
    React.useCallback(() => {
      // Fetch data here, similar to what you have in the useEffect
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header title="مجموع الميزانية :" showTotal={true} loggedIn={true} />
        <HeaderSummary />
        <ScrollView>
          <DaySummary />
        </ScrollView>
      </View>
      <View style={styles.plusMinusContainer}>
        <PlusMinus />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the container take up the entire screen.
    backgroundColor: globalStyles.secondaryColor,
  },
  content: {
    flex: 1, // This allows the content to take up available space above PlusMinus.
  },
});
