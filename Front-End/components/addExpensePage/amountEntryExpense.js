import React, { useState } from "react";
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

function CustomDropdownArrow() {
  return (
    <MaterialCommunityIcons
      name="chevron-down"
      size={24}
      color="white" // Set the color to white
    />
  );
}

export default function AmountEntry() {
  const cashIcon = (
    <MaterialCommunityIcons name="cash" size={24} color="black" />
  );
  const creditCardIcon = <Entypo name="credit-card" size={20} color="black" />;

  const navigation = useNavigation();
  const data = [
    { label: "كاش", value: "1", icon: cashIcon },
    { label: "بطاقة ائتمانية", value: "2", icon: creditCardIcon },
  ];
  const currency = [
    { label: "USD", value: "1" },
    { label: "JOD", value: "2" },
    { label: "EUR", value: "3" },
  ];

  const category = [
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

  const [valueType, setValueType] = useState(null);
  const [isFocusType, setIsFocusType] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(null);
  const [isFocusCurrency, setIsFocusCurrency] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [isFocusCategory, setIsFocusCategory] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");



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
    setTextInputValue("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.amountEntry}>
        <View style={styles.dropDownContainer}>
          {/* طريقة الدفع */}
          <View style={styles.dropdownWrapper}>
            <Dropdown
              style={[styles.dropdown, isFocusType]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              maxHeight={100}
              labelField="label"
              valueField="value"
              placeholder={!isFocusType ? "طريقة الدفع" : "..."}
              value={valueType}
              onFocus={() => setIsFocusType(true)}
              onBlur={() => setIsFocusType(false)}
              onChange={(item) => {
                setValueType(item.value);
                setIsFocusType(false);
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
              data={currency}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={!isFocusCurrency ? " العملة" : "..."}
              value={currencyValue}
              onFocus={() => setIsFocusCurrency(true)}
              onBlur={() => setIsFocusCurrency(false)}
              onChange={(item) => {
                setCurrencyValue(item.value);
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
              data={category}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={!isFocusCategory ? " فئة المصروف" : "..."}
              value={categoryValue}
              onFocus={() => setIsFocusCategory(true)}
              onBlur={() => setIsFocusCategory(false)}
              onChange={(item) => {
                setCategoryValue(item.value);
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
            value={textInputValue}
            onChangeText={(text) => setTextInputValue(text)} // Update the state when text changes
          />
        </View>
        <View style={styles.TextInputContainer}>
          <TouchableOpacity style={styles.delete} onPress={clearTextInput}>
            <Feather name="delete" size={24} color="white" />
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
});
