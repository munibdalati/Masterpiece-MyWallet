import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";


export default function Splash() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Indroduction Screen</Text>
    </View>
  );
}

