import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from "react-native";
import Header from "../shared/header";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default function Settings() {
  const [language, setLanguage] = useState("العربية");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigation = useNavigation();

  Logoff = async () => {
    try {
      await AsyncStorage.clear()
      navigation.navigate("SignIn");
    } catch (err) {
      console.log(err);
    }
  };
  // delete Account function
  // Retrieve the information from AsyncStorage  
  const [id, setId] = useState("");
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

  }, []);


  DeleteAccount = async () => {
    setShowConfirmationModal(true);
  };

  // Function to confirm the account deletion
  const confirmDeleteAccount = async () => {
    try {
      console.log(id);
      const { data } = await axios.delete(
        "http://10.0.2.2:8000/api/user/delete/" + id,
        {
          data: { user: id },
        }
      );
      data.data.user._id = id;
      await AsyncStorage.clear();
      navigation.navigate("SignUp");
      console.log("deleted successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.setting}>
      <Header title="الإعدادات" showTotal={false} loggedIn={true} homeIcon={true} />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإعدادات العامة</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate("Personal");
            }}
          >
            <Text style={styles.itemText}>الملف الشخصي</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate("Zakat");
            }}
          >
            <Text style={styles.itemText}>حاسبة الزكاة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>الصرف</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>الدخل</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>الاستثمارات </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}> الديون</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}> العملة الرئيسية</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}> الحسابات بالعملات الأخرى</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>لغة التطبيق</Text>
            <Text style={styles.itemValue}>{language}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات الحساب</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              Logoff();
            }}
          >
            <Text style={styles.itemText}>تسجيل الخروج</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              DeleteAccount();
            }}
          >
            <Text style={styles.itemText}>حذف الحساب</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={showConfirmationModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.confirmationModal}>
          <Text style={styles.confirmationMessage}>
            هل أنت متأكد أنك تريد حذف الحساب؟
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowConfirmationModal(false)}
            >
              <Text style={styles.buttonText}>إلغاء</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => {
                setShowConfirmationModal(false);
                confirmDeleteAccount();
              }}
            >
              <Text style={styles.buttonText}>نعم، حذف الحساب</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  setting: {
    backgroundColor: globalStyles.tertiaryColor,
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    display: "flex",
    textAlign: "right",
  },
  item: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: "#333",
  },
  confirmationModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  confirmationMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: globalStyles.primaryColor,
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
