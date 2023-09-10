import { globalStyles } from "../styles/global";
import Header from "../shared/header";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/FlatBtn";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// Validation
const reviewSchema = yup.object({
  email: yup.string().required("مطلوب").email("أدخل بريد إلكتروني صالح"),
  password: yup
    .string()
    .required("مطلوب")
    .min(6, "كلمة السر يجب أن تكون مؤلفة من 6 رموز على الأقل"),
});

export default function SignIn({ navigation }) {
  const [massege, setMassege] = useState();
  const [massegeType, setMassegeType] = useState();

  const handleLogin = (credential, setSubmitting) => {
    handleMessage(null);
    const url = "http://10.0.2.2:5000/api/user/login";
    axios
      .post(url, credential)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Home", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging purposes
        setSubmitting(false);

        handleMessage("an error occurred. Check your network and try again.");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMassege(message);
    setMassegeType(type);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header title="تسجيل دخول" showTotal={false} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Formik
              // validationSchema={reviewSchema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.email == "" || values.password == "") {
                  handleMessage("املأ جميع الحقول");
                  setSubmitting(false);
                } else {
                  handleLogin(values, setSubmitting);
                }
              }}
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
                  <Text style={styles.MsgBox} type={massegeType}>
                    {massege}
                  </Text>

                  {/* زر إنشاء الحساب */}
                  {!props.isSubmitting && (
                    <FlatButton
                      text="تسجيل الدخول"
                      style={styles.createBtn}
                      onPress={props.handleSubmit}
                    />
                  )}
                  {props.isSubmitting && (
                    <TouchableOpacity disabled={true}>
                      <ActivityIndicator />
                    </TouchableOpacity>
                  )}

                  {/* عندك حساب؟ */}
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
  MsgBox: {
    textAlign: "center",
    fontSize: 13,
    // color: ${props => props.type == 'SUCCESS' ? "green" : "red"}
  },
});
