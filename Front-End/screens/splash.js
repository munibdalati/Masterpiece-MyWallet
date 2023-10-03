import { globalStyles } from "../styles/global";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import walletLogo from "../assets/WalletLogo.png";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";



export default function Splash() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={walletLogo} style={styles.logo} />
      <Text style={styles.appName}>محفظتي</Text>
      {/* زر إنشاء الحساب */}
      <TouchableOpacity style={styles.createBtn}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.createBtnText}>إنشاء حساب</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createBtn}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.createBtnText}>تسجيل دخول</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
  },
  appName: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
    color: globalStyles.quaternaryColor
  },
  createBtn: {
    backgroundColor: globalStyles.primaryColor,
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "90%"
  },
  createBtnText: {
    color: "#fff",
    fontSize: 18,
  },
});

