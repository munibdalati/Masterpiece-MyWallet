import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerFirstRow}>
        <Text style={styles.headerText}>المتبقي</Text>
        <Text style={styles.headerText}>الدخل</Text>
        <Text style={styles.headerText}>المصاريف</Text>

        <Text style={styles.headerText}>الشهر</Text>
      </View>
      <View style={styles.headerFirstRow}>
        <Text style={styles.headerText}>600 $</Text>
        <Text style={styles.headerText}>1000 $</Text>
        <Text style={styles.headerText}>400 $</Text>

        <Text style={styles.headerText}>حزيران 2023</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#323375",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  headerFirstRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  headerSecondRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  total: {
    color: "#008000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
