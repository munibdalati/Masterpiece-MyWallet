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

export default function AmountEntryExpense() {
  // Define icons for cash and credit card
  const cashIcon = (
    <MaterialCommunityIcons name="cash" size={24} color="black" />
  );
  const creditCardIcon = (
    <Entypo name="credit-card" size={20} color="black" />
  );

  // Get the navigation object from the navigation stack
  const navigation = useNavigation();

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
    { label: "أجار", value: "1" },
    { label: "انترنت", value: "2" },
    { label: "بنزين", value: "3" },
    { label: "خضار وفواكه", value: "4" },
    { label: "فاتورة الجوال", value: "5" },
    { label: "كهرباء", value: "6" },
    { label: "ماء", value: "7" },
    { label: "مطعم", value: "8" },
    { label: "ملابس", value: "9" },
    { label: "غاز", value: "10" },
    { label: "طبيب", value: "11" },
  ];

  // Define state variables for form inputs
  const [currency, setCurrency] = useState(null);
  const [isFocusCurrency, setIsFocusCurrency] = useState(false);
  const [category, setCategory] = useState(null);
  const [cashCard, setCashCard] = useState(null);
  const [isFocusCashCard, setIsFocusCashCard] = useState(false);
  const [isFocusCategory, setIsFocusCategory] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");

  // Define state variables for date picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const [error, setError] = useState("");

  // Handle date change in the date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide the DateTimePicker on iOS
    setDate(currentDate);

    // Format the selected date and set it as text
    let tempDate = new Date(currentDate);
    let daysOfWeek = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    let dayOfWeek = daysOfWeek[tempDate.getDay()];
    let formattedDate =
      dayOfWeek +
      " " +
      tempDate.getDate() +
      " / " +
      (tempDate.getMonth() + 1) +
      " / " +
      tempDate.getFullYear();
    setText(formattedDate);
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

  // Handle expense submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `http://10.0.2.2:5000/api/wallet/addTransaction/${id}`,
        {
          category,
          value,
          date,
          cashCard,
          currency,
        },
        config
      );

      console.log(response.data.token);
      console.log(response.data);

      navigate("/HomePage");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
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
                value={cashCard}
                onFocus={() => setIsFocusCashCard(true)}
                onBlur={() => setIsFocusCashCard(false)}
                onChange={(item) => {
                  setCashCard(item.value);
                  setIsFocusCashCard(false);
                }}
                renderItem={renderItem} // Custom rendering of dropdown items
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
                value={currency}
                onFocus={() => setIsFocusCurrency(true)}
                onBlur={() => setIsFocusCurrency(false)}
                onChange={(item) => {
                  setCurrency(item.value);
                  setIsFocusCurrency(false);
                }}
                renderItem={renderItem} // Custom rendering of dropdown items
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
                value={category}
                onFocus={() => setIsFocusCategory(true)}
                onBlur={() => setIsFocusCategory(false)}
                onChange={(item) => {
                  setCategory(item.value);
                  setIsFocusCategory(false);
                }}
                renderItem={renderItem} // Custom rendering of dropdown items
              />
              <View style={styles.customDropdownArrow}>
                <CustomDropdownArrow />
              </View>
            </View>
          </View>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="white" // Set the placeholder text color to white
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => setValue(text)} // Update the state when text changes
            />
          </View>
          <View style={styles.TextInputContainer}>
            <TouchableOpacity style={styles.delete} onPress={clearTextInput}>
              <Feather name="delete" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit} // Call the expenseSubmit function when the button is pressed
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
});
