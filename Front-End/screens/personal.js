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
import { Picker } from '@react-native-picker/picker';

export default function Personal() {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [error, setError] = useState("");

  const genderOptions = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
  ];


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
    // --------------------age--------------------

    AsyncStorage.getItem("age")
      .then((value) => {
        if (value) {
          setAge(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving password:", error);
      });
    // --------------------gender--------------------

    AsyncStorage.getItem("gender")
      .then((value) => {
        if (value) {
          setGender(value);
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

      const url = `http://10.0.2.2:8000/api/user/update/${id}`;
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
      }, 8000);
    }
  };

  const saveUpdatedEmail = async () => {
    try {
      const url = `http://10.0.2.2:8000/api/user/update/${id}`;
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
      }, 8000);
    }
  };

  const saveUpdatedPassword = async () => {
    try {
      const url = `http://10.0.2.2:8000/api/user/update/${id}`;
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
      }, 8000);
    }
  };

  const saveUpdatedAge = async () => {
    try {
      const url = `http://10.0.2.2:8000/api/user/update/${id}`;
      const updatedData = {
        age,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(url, updatedData, config);
      data.data.user = updatedData;
      await AsyncStorage.setItem("age", updatedData.age);
      console.log("Updated data:", updatedData);
      setIsEditingAge(!isEditingAge);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 8000);
    }
  };

  const saveUpdatedGender = async () => {
    try {
      const url = `http://10.0.2.2:8000/api/user/update/${id}`;
      const updatedData = {
        gender,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(url, updatedData, config);
      data.data.user = updatedData;
      await AsyncStorage.setItem("gender", updatedData.gender);
      console.log("Updated data:", updatedData);
      setIsEditingGender(!isEditingGender);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 8000);
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
          <Text style={styles.info}>العمر:</Text>
          <Text style={styles.info}>الجنس:</Text>

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
          <Text style={styles.info}>
            {isEditingAge ? (
              <View style={styles.editInput}>
                <TextInput
                  value={age}
                  keyboardType="numeric"

                  onChangeText={(text) => setAge(text)}
                />
              </View>
            ) : (
              <Text style={styles.info}>{age}</Text>
            )}
          </Text>
          {isEditingGender ? (
            <View style={styles.editInput}>
              <Picker style={styles.genderPicker}
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                {genderOptions.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          ) : (
            <Text style={styles.infoGender}>{gender}</Text>
          )}

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
          <TouchableOpacity style={styles.editBtn} onPress={saveUpdatedAge}>
            <Text style={styles.editBtnText}>
              {isEditingAge ? "حفظ" : "تعديل"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn} onPress={saveUpdatedGender}>
            <Text style={styles.editBtnText}>
              {isEditingGender ? "حفظ" : "تعديل"}
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
    height: "100%",
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
  }, infoGender: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
    textAlign: "left"
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
  genderPickerContainer: {

    backgroundColor: "white",
    width: 150,
    height: 30
  },

});
