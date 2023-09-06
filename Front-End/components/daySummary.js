import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function DaySummary() {
  return (
    <View style={styles.daySummary}>
      <View style={styles.dayTotal}>
        <Text style={styles.dayTotalText}> 40$</Text>
        <Text style={styles.dayTotalText}>السبت 1/1/2023</Text>
      </View>
      <View style={styles.dayCategory}>
        <Text style={styles.dayCategoryText}> 25$</Text>
        <Text style={styles.dayCategoryText}>فواكه</Text>
      </View>
      <View style={styles.dayCategory}>
        <Text style={styles.dayCategoryText}> 15$</Text>
        <Text style={styles.dayCategoryText}>كهرباء</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  daySummary: {
    backgroundColor: "#add8e6",
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    margin: 10,
    borderRadius: 10,
  },
  dayTotal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom:5,
    borderBottomColor: "#1b1c57",
    borderBottomWidth: "1px",  
  },
  dayTotalText: {
    color: "#1b1c57",
  },
  dayCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:10
  },
  dayCategoryText: {
    color: "#000",
  },
});
