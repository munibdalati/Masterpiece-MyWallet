import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../shared/header";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function Personal() {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [error, setError] = useState("");

  


// Retrieve the information from AsyncStorage  
  useEffect(() => {
    // --------------------id--------------------
    AsyncStorage.getItem("_id")
      .then((value) => {
        if (value) {
          setId(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving id:", error);
      });
// --------------------username--------------------
    AsyncStorage.getItem("username")
      .then((value) => {
        if (value) {
          setUsername(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving username:", error);
      });
      // --------------------email--------------------

    AsyncStorage.getItem("email")
      .then((value) => {
        if (value) {
          setEmail(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving email:", error);
      });
      // --------------------password--------------------

    AsyncStorage.getItem("password")
      .then((value) => {
        if (value) {
          setPassword(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving password:", error);
      });
  }, []);


  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
    };
    checkAuth();
  }, []);

 

  const saveUpdatedUsername = async () => {
    try {

      const url = `http://10.0.2.2:5000/api/user/update/${id}`;
      const updatedData = {
        username,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(url, updatedData, config);
      data.data.user = updatedData;
      await AsyncStorage.setItem("username", updatedData.username);
      console.log("Updated data:", updatedData);
      setIsEditingUsername(!isEditingUsername);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const saveUpdatedEmail = async () => {
    try {
      const url = `http://10.0.2.2:5000/api/user/update/${id}`;
      const updatedData = {
        email,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(url, updatedData, config);
      data.data.user = updatedData;
      await AsyncStorage.setItem("email", updatedData.email);
      console.log("Updated data:", updatedData);
      setIsEditingEmail(!isEditingEmail);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const saveUpdatedPassword = async () => {
    try {
      const url = `http://10.0.2.2:5000/api/user/update/${id}`;
      const updatedData = {
        password,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(url, updatedData, config);
      data.data.user = updatedData;
      await AsyncStorage.setItem("password", updatedData.password);
      console.log("Updated data:", updatedData);
      setIsEditingPassword(!isEditingPassword);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };


  return (
    <View style={globalStyles.container}>
      <Header title=" الملف الشخصي" showTotal={false} loggedIn={true} />
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.info}> الاسم:</Text>
          <Text style={styles.info}> البريد الإلكتروني:</Text>
          <Text style={styles.info}>كلمة السر:</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            {isEditingUsername ? (
              <View style={styles.editInput}>
              <TextInput
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
            ) : (
              <Text style={styles.info}>{username}</Text>
            )}
          </Text>
          <Text style={styles.info}>
            {isEditingEmail ? (
              <View style={styles.editInput}>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            ) : (
              <Text style={styles.info}>{email}</Text>
            )}
          </Text>
          <Text style={styles.info}>
            {isEditingPassword ? (
              <View style={styles.editInput}>
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            ) : (
              <Text style={styles.info}>{password}</Text>
            )}
          </Text>

        </View>
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.editBtn} onPress={saveUpdatedUsername}>
            <Text style={styles.editBtnText}>
              {isEditingUsername ? "حفظ" : "تعديل"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn} onPress={saveUpdatedEmail}>
            <Text style={styles.editBtnText}>
              {isEditingEmail ? "حفظ" : "تعديل"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn} onPress={saveUpdatedPassword}>
            <Text style={styles.editBtnText}>
              {isEditingPassword ? "حفظ" : "تعديل"}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 50,
    paddingBottom: 300,
    paddingHorizontal: 30,
    height: "80%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    backgroundColor: globalStyles.tertiaryColor,
  },
  infoContainer: {
    justifyContent: "flex-start",
  },
  info: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
  },
  editBtn: {
    marginBottom: 30,
    borderColor: "grey",
    borderBottomWidth: 1,
  },
  editBtnText: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  editInput: {
    backgroundColor: "white",
    width: 150,

  },
});
