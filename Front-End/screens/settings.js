import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../shared/header";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/global";

export default function Settings() {
  const [language, setLanguage] = useState("العربية");
  const navigation = useNavigation();

  return (
    <View style={styles.setting}>
      <Header title="الإعدادات" showTotal={false} />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإعدادات العامة</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>الملف الشخصي</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.itemText}>إنشاء حساب </Text>
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
            <Text style={styles.itemText}> حاسبة الزكاة</Text>
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
          {/* <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>الوضع الليلي</Text>
            <Switch
              value={darkMode}
              onValueChange={(value) => toggleDarkMode(value)}
              thumbColor={darkMode ? currentColors.primaryColor : "#f4f3f4"}
              trackColor={{ false: "#ccc", true: currentColors.primaryColor }}
            />
          </TouchableOpacity> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات الحساب</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>تسجيل الخروج</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});
