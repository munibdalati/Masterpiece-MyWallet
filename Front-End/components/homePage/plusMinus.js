import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global";

export default function PlusMinus() {
  const navigation = useNavigation();

  return (
    <View style={styles.plusMinus}>
      <TouchableOpacity
        style={[styles.button, styles.minus]}
        onPress={() => {
          navigation.navigate("AddExpense");
        }}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.plus]}
        onPress={() => {
          navigation.navigate("AddIncome");
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  plusMinus: {
    backgroundColor: globalStyles.primaryColor,
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  minus: {
    backgroundColor: "red",
    paddingHorizontal: 40,
    paddingVertical: 7,
    borderRadius: 5,
  },
  plus: {
    backgroundColor: "green",
    paddingHorizontal: 40,
    paddingVertical: 7,
    borderRadius: 5,
  },
  buttonText:{
    fontSize:30,
    color: "white",
  }
});
