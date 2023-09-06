import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerFirstRow}>
        <Feather name="settings" size={24} color="white" />
        <Text style={styles.headerText}>محفظتي</Text>
        <Entypo name="pie-chart" size={24} color="white" />
      </View>
      <View style={styles.headerSecondRow}>
        <Text style={styles.total}>10,000 $</Text>
        <Text style={styles.headerText}>مجموع الميزانية :</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1b1c57",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  headerFirstRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom:10


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
    fontSize:16
  },
  total: {
    color: "#008000",
    fontWeight: "bold",
    fontSize:16

  },
});
