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
});

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    // e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://10.0.2.2:8000/api/user/forgotPassword/",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      console.error("Error sending request:", error);

      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header title="استعادة كلمة السر" showTotal={false} loggedIn={false} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            {error && <Text style={styles.error - message}>{error}</Text>}
            {success && <Text style={styles.success - message}>{success}</Text>}

            <Formik
              validationSchema={reviewSchema}
              initialValues={{
                email: "",
              }}
              onSubmit={forgotPasswordHandler}
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


                  {/* زر تسجيل الدخول */}
                  <FlatButton
                    text="استعادة كلمة المرور"
                    onPress={props.handleSubmit}
                    type="submit"
                  />
                  {/* نسيت كلمة السر*/}
                  <Text style={styles.forgetPasswordText}>
                    <Text
                      style={styles.link}
                      onPress={() => {
                        navigation.navigate("SignIn");
                      }}
                    >
                      العودة إلى تسجيل الدخول                    </Text>
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
  forgetPasswordText: {
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
