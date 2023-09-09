import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function Header({ title, showTotal }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerFirstRow}>
        <Feather name="settings" size={24} color="white"
        onPress={() => {
          navigation.navigate("Settings");
        }} />
        <Text style={styles.headerText}>محفظتي</Text>
        <Entypo name="pie-chart" size={24} color="white" />
      </View>

      <View style={styles.headerSecondRow}>
        {showTotal && <Text style={styles.total}>10,000 $</Text>}
        <Text style={styles.headerSecondText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: globalStyles.primaryColor,
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 30,
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
    fontSize: 20,
  },
  headerSecondText:{
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
