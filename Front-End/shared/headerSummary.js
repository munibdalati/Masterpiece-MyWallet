import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HeaderSummary() {
  return (
    <View style={styles.headerSummary}>
      <View style={styles.section}>
        <Text style={styles.headerSummaryTitle}>المتبقي</Text>
        <Text style={styles.remaining}>600 $</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.headerSummaryTitle}>الدخل</Text>
        <Text style={styles.income}>1000 $</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.headerSummaryTitle}>المصاريف</Text>
        <Text style={styles.expenses}>400 $</Text>
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
    backgroundColor: "#323375",
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
