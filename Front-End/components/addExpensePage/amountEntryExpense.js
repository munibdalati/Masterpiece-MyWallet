import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesome5 } from "@expo/vector-icons";


const validationSchema = Yup.object({
  cashCard: Yup.string().required("طريقة الدفع مطلوبة"),
  currency: Yup.string().required("العملة مطلوبة"),
  category: Yup.string().required("فئة المصروف مطلوبة"),
  value: Yup.number().required("القيمة مطلوبة").min(0, "القيمة يجب أن تكون أكبر من صفر"),
});


export default function AmountEntryExpense() {
  // Define state variables for form inputs

  const [isFocusCurrency, setIsFocusCurrency] = useState(false);

  const [isFocusCashCard, setIsFocusCashCard] = useState(false);
  const [isFocusCategory, setIsFocusCategory] = useState(false);

  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      cashCard: "",
      currency: "",
      category: "",
      value: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });



  // Define state variables for date picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");



  // Retrieve the information from AsyncStorage
  useEffect(() => {
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

  // Define icons for cash and credit card
  const cashIcon = (
    <MaterialCommunityIcons name="cash" size={24} color="black" />
  );
  const creditCardIcon = (
    <Entypo name="credit-card" size={20} color="black" />
  );
  // Define a custom component for the dropdown arrow icon
  function CustomDropdownArrow() {
    return (
      <MaterialCommunityIcons
        name="chevron-down"
        size={24}
        color="white"
      />
    );
  }

  // Define dropdown data for payment method, currency, and category
  const data = [
    { label: "كاش", value: "كاش", icon: cashIcon },
    { label: "بطاقة ائتمانية", value: "بطاقة ائتمانية", icon: creditCardIcon },
  ];

  const currencyData = [
    { label: "USD", value: "USD" },
    { label: "JOD", value: "JOD" },
    { label: "EUR", value: "EUR" },
  ];

  const categoryData = [
    { label: "أجار", value: "أجار" },
    { label: "انترنت", value: "انترنت" },
    { label: "بنزين", value: "بنزين" },
    { label: "خضار وفواكه", value: "خضار وفواكه" },
    { label: "فاتورة الجوال", value: "فاتورة الجوال" },
    { label: "كهرباء", value: "كهرباء" },
    { label: "ماء", value: "ماء" },
    { label: "مطعم", value: "مطعم" },
    { label: "ملابس", value: "ملابس" },
    { label: "غاز", value: "غاز" },
    { label: "طبيب", value: "طبيب" },
  ];


  // Define a function to format the selected date
  const formatSelectedDate = (selectedDate) => {
    const tempDate = new Date(selectedDate);
    const daysOfWeek = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const dayOfWeek = daysOfWeek[tempDate.getDay()];
    return (
      dayOfWeek +
      " " +
      tempDate.getDate() +
      " / " +
      (tempDate.getMonth() + 1) +
      " / " +
      tempDate.getFullYear()
    );
  };




  // Handle date change in the date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide the DateTimePicker on iOS
    setDate(currentDate);
    setText(formatSelectedDate(currentDate));
  };


  // Show the date picker with the specified mode
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // Handle date picker confirm button press
  const handleConfirm = () => {
    setShow(false);
  };
  const navigation = useNavigation(); // Use useNavigation here
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;


  // Handle expense submission
  const handleSubmit = async (values) => {
    console.log("Request Payload:", {
      category: values.category,
      value: values.value,
      date: formattedDate,
      cashCard: values.cashCard,
      currency: values.currency,
      id: id
    });
    try {
      const response = await axios.post(
        `http://10.0.2.2:8000/api/wallet/addTransaction/${id}`,
        {
          type: "مصروف",
          category: values.category,
          value: parseFloat(values.value),
          date: formattedDate,
          cashCard: values.cashCard,
          currency: values.currency,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.token);
      console.log(response.data);

      navigation.navigate("HomePage");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 8000);
    }
  };


  // Define a function to render dropdown items
  const renderItem = (item) => {
    return (
      <View style={styles.dropdownItem}>
        {item.icon}
        <Text style={styles.dropdownItemText}>{item.label}</Text>
      </View>
    );
  };

  // Function to clear the TextInput value
  const clearTextInput = () => {
    setValue("");
  };




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.dateSelection}>
          <Text style={styles.dateText}>{text}</Text>
          <TouchableOpacity
            onPress={() => showMode("date")}
            style={styles.selectionBtn}
          >
            <Text style={styles.btnText}>اختر يوم المصروف</Text>
          </TouchableOpacity>

          {show && (
            <View style={styles.confirmBtnContainer}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="spinner"
                onChange={onChange}
              />
              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.selectionBtn}
              >
                <Text style={styles.btnText}>تأكيد</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.amountEntry}>
          <View style={styles.dropDownContainer}>
            {/* طريقة الدفع */}
            <View style={styles.dropdownWrapper}>
              <Dropdown
                style={[styles.dropdown, isFocusCashCard]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                maxHeight={100}
                labelField="label"
                valueField="value"
                placeholder={!isFocusCashCard ? "طريقة الدفع" : "..."}
                value={formik.values.cashCard}
                onFocus={() => setIsFocusCashCard(true)}
                onBlur={() => {
                  setIsFocusCashCard(false);
                  formik.setFieldTouched("cashCard", true);
                }}
                onChange={(item) => {
                  formik.setFieldValue("cashCard", item.value);
                  setIsFocusCashCard(false);
                }}
                renderItem={renderItem}
              />
              <View style={styles.customDropdownArrow}>
                <CustomDropdownArrow />
              </View>
            </View>
            {/* العملة */}
            <View style={styles.dropdownWrapper}>
              <Dropdown
                style={[styles.dropdown, isFocusCurrency]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={currencyData}
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder={!isFocusCurrency ? " العملة" : "..."}
                value={formik.values.currency}
                onFocus={() => setIsFocusCurrency(true)}
                onBlur={() => {
                  setIsFocusCurrency(false);
                  formik.setFieldTouched("currency", true);
                }}
                onChange={(item) => {
                  formik.setFieldValue("currency", item.value);
                  setIsFocusCurrency(false);
                }}
                renderItem={renderItem}
              />
              <View style={styles.customDropdownArrow}>
                <CustomDropdownArrow />
              </View>
            </View>
            {/* فئة المصروف */}
            <View style={styles.dropdownWrapper}>
              <Dropdown
                style={[styles.dropdown, isFocusCategory]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={categoryData}
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder={!isFocusCategory ? " فئة المصروف" : "..."}
                value={formik.values.category}
                onFocus={() => setIsFocusCategory(true)}
                onBlur={() => {
                  setIsFocusCategory(false);
                  formik.setFieldTouched("category", true);
                }}
                onChange={(item) => {
                  formik.setFieldValue("category", item.value);
                  setIsFocusCategory(false);
                }}
                np />
              <View style={styles.customDropdownArrow}>
                <CustomDropdownArrow />
              </View>
            </View>
          </View>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={formik.values.value}
              onChangeText={formik.handleChange("value")}
              onBlur={formik.handleBlur("value")}
            />
          </View>
          <View style={styles.TextInputContainer}>
            <TouchableOpacity style={styles.delete} onPress={formik.resetForm}>
              <Feather name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* button */}
        <View>
          <TouchableOpacity onPress={formik.handleSubmit}>
            <Text style={styles.AddExpenseBtnText}>
              <FontAwesome5
                name="check"
                size={24}
                color={globalStyles.primaryColor}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // the whole container
  amountEntry: {
    backgroundColor: globalStyles.secondaryColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    margin: 10,
  },
  // Input
  TextInputContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    maxWidth: 100,
    height: 100,
  },
  // deleteButton
  delete: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: globalStyles.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  // dropdown
  dropDownContainer: {
    padding: 16,
    gap: 3,
  },
  dropdownWrapper: {
    position: "relative", // Add this to allow positioning the custom arrow
  },
  dropdown: {
    height: 50,
    width: 130,
    borderColor: "white",
    backgroundColor: globalStyles.primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    marginLeft: 8,
    color: "black",
    fontSize: 16,
  },
  customDropdownArrow: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },

  dateSelection: {
    paddingVertical: 20,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  dateText: {
    textAlign: "center",
    color: globalStyles.primaryColor,
    fontSize: 16,
  },
  selectionBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: globalStyles.primaryColor,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 130,
  },
  btnText: {
    color: "white",
  },
  confirmBtnContainer: {
    justifyContent: "center", 
    alignItems: "center", 
  },
  AddExpenseBtnText:{
    textAlign: "center",
    borderColor:globalStyles.primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal:150,
    paddingVertical:10
  }
});
