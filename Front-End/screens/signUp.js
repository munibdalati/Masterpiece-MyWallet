import { globalStyles } from "../styles/global";
import Header from "../shared/header";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/FlatBtn";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const navigation = useNavigation();
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        navigation.navigate("Home");
      }
    };
    checkAuth();
  }, []);

  const registerHandler = async (values) => {
    const { username, email, password, confirmPassword } = values;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (password !== confirmPassword) {
      setError("كلمتا السر غير متطابقتان");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        { username, email, password },
        config
      );
      const data = response.data; // Access the response data
      console.log("data:", data);
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("login", "true");
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header title="إنشاء حساب" showTotal={false} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => registerHandler(values)}
            >
              {(props) => (
                <View style={styles.form}>
                  {/* الاسم */}
                  <Text style={styles.label}>الاسم:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("username")}
                    onBlur={props.handleBlur("username")}
                    value={props.values.username}
                    textAlign="right"
                  />
                  <Text style={styles.errorText}>
                    {props.touched.username && props.errors.username}
                  </Text>

                  {/* البريد الإلكتروني */}
                  <Text style={styles.label}>البريد الإلكتروني:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                    value={props.values.email}
                    textAlign="right"
                  />
                  <Text style={styles.errorText}>
                    {props.touched.email && props.errors.email}
                  </Text>

                  {/* كلمة السر */}
                  <Text style={styles.label}>كلمة السر:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}
                    textAlign="right"
                    secureTextEntry={true}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.password && props.errors.password}
                  </Text>

                  {/* تأكيد كلمة السر */}
                  <Text style={styles.label}>تأكيد كلمة السر:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("confirmPassword")}
                    onBlur={props.handleBlur("confirmPassword")}
                    value={props.values.confirmPassword}
                    textAlign="right"
                    secureTextEntry={true}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.confirmPassword &&
                      props.errors.confirmPassword}
                  </Text>

                  {/* زر إنشاء الحساب */}
                  <FlatButton
                    text="إنشاء الحساب"
                    style={styles.createBtn}
                    onPress={props.handleSubmit}
                    type="submit"
                  />

                  {/* عندك حساب؟ */}
                  <Text style={styles.subtext}>
                    عندك حساب؟{" "}
                    <Text
                      style={styles.link}
                      onPress={() => {
                        navigation.navigate("SignIn");
                      }}
                    >
                      تسجيل الدخول
                    </Text>
                  </Text>
                </View>
              )}
            </Formik>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.secondaryColor,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },

  label: {
    fontSize: 18,
    textAlign: "right",
    marginBottom: 8,
  },
  input: {
    backgroundColor: globalStyles.tertiaryColor,
    padding: 10,
    fontSize: 16,
    textAlign: "right",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "right",
    paddingVertical: 5,
  },
  subtext: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "right",
  },

  link: {
    color: globalStyles.quaternaryColor,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  form: {
    flex: 1,
  },
  createBtn: {
    backgroundColor: globalStyles.primaryColor,
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  createBtnText: {
    color: "#fff",
    fontSize: 18,
  },
});
