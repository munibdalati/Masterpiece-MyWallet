import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function PlusMinus() {
  return (
    <View style={styles.plusMinus}>
      <Text style={styles.minus}>-</Text>
      <Text style={styles.plus}>+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  plusMinus: {
    backgroundColor: "#323375",
    paddingHorizontal: 10,
    paddingBottom:40,
    paddingTop:20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  minus: {
    backgroundColor: "red",
    paddingHorizontal: 40,
    paddingVertical: 7,
    color: "white",
    borderRadius: 100,
    fontSize:40
  },
  plus: {
    backgroundColor: "green",
    paddingHorizontal: 40,
    paddingVertical: 7,
    color: "white",
    borderRadius: 100,
    fontSize:40
  },
});
