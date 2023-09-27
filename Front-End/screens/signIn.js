import { globalStyles } from "../styles/global";
import Header from "../shared/header";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation
const reviewSchema = yup.object({
  email: yup.string().required("مطلوب").email("أدخل بريد إلكتروني صالح"),
  password: yup
    .string()
    .required("مطلوب")
    .min(6, "كلمة السر يجب أن تكون مؤلفة من 6 رموز على الأقل"),
});

export default function SignIn() {
  const navigation = useNavigation();
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        navigation.navigate("HomePage");
      }
    };
    checkAuth();
  }, []);

  const loginHandler = async (values) => {
    const url = "http://10.0.2.2:8000/api/user/login";
    const { email, password } = values;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(url, values, config);

      const username = data.data.user.username;
      const id = data.data.user._id;

      await AsyncStorage.multiSet([
        ["authToken", data.token],
        ["_id", id],
        ["username", username],
        ["password", password],
        ["email", email],
      ]);

      navigation.navigate("HomePage");

      console.log("data:", data);
      console.log(data.data.user.username);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response.data.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 8000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header title="تسجيل دخول" showTotal={false} loggedIn={false} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Formik
              validationSchema={reviewSchema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => loginHandler(values)}
            >
              {(props) => (
                <View style={styles.form}>
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
                  <Text style={styles.mainErrorText}>{error}</Text>
                  {/* زر تسجيل الدخول */}

                  <FlatButton
                    text="تسجيل الدخول"
                    style={styles.createBtn}
                    onPress={props.handleSubmit}
                    type="submit"
                  />

                  {/* {props.isSubmitting && (
                    <TouchableOpacity disabled={true}>
                      <ActivityIndicator />
                    </TouchableOpacity>
                  )} */}

                  {/* ليس عندك حساب؟ */}
                  <Text style={styles.subtext}>
                    ليس عندك حساب؟{" "}
                    <Text
                      style={styles.link}
                      onPress={() => {
                        navigation.navigate("SignUp");
                      }}
                    >
                      إنشاء حساب
                    </Text>
                  </Text>
                </View>
              )}
            </Formik>
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
  mainErrorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 5,
  },
});
