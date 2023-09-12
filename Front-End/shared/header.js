import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({
  title,
  showTotal,
  loggedIn,
  homeIcon,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {loggedIn ? (
        <View style={styles.headerFirstRow}>
          {homeIcon ? (
            <Entypo
              name="home"
              size={24}
              color="white"
              onPress={() => {
                navigation.navigate("HomePage");
              }}
            />
          ) : (
            <Feather
              name="settings"
              size={24}
              color="white"
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />
          )}

          <Text style={styles.headerText}>محفظتي</Text>
          <Entypo name="pie-chart" size={24} color="white" />
        </View>
      ) : <Text style={styles.headerText}>محفظتي</Text>}

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
    alignItems: "center", // Center the content horizontally
  },
  headerFirstRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerSecondRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  headerSecondText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  total: {
    color: "#008000",
    fontWeight: "bold",
    fontSize: 16,
  },
  welcome: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
