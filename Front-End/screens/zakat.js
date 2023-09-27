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

export default function Zakat() {
  const [data, setData] = useState({})
  const [id, setId] = useState(null)
  const [goldData, setGoldData] = useState(null);


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
  }, []);


  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8000/api/wallet/getUserWallet/${id}`)
      .then((res) => {
        setData(res.data.data.wallet);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  // ---------------Zakat calucator---------------
  let zakatValue = data.balance * 0.025;
  let goldPriceJOD = 45
  let goldGramNisab = 85
  let JODNisab = goldPriceJOD * goldGramNisab

  return (
    <View style={globalStyles.container}>
      <Header title="حاسبة الزكاة" showTotal={false} loggedIn={true} />
      <View style={styles.mainContainer}>


        <View style={styles.aboutContainer}>
          <Text style={styles.about}>عن الزكاة: </Text>
          <Text style={styles.aboutText}>سعر غرام الذهب اليوم : {goldPriceJOD} دينار</Text>
          <Text style={styles.aboutText}>نصاب المال: {goldGramNisab} غرام من الذهب </Text>
          <Text style={styles.aboutText}>نصاب المال بالدينار الأردني: {goldPriceJOD} * {goldGramNisab} = {JODNisab} دينار</Text>

        </View>
        <View style={styles.zakatContainer}>
          {data.balance < JODNisab ? (<Text style={styles.zakatText}>ميزانيتك لم تبلغ النصاب فلا زكاة عليك</Text>) : (

            <View style={styles.zakatCalculation}>
              <View style={styles.zakatText}>
                <Text style={styles.zakatTitle}>مجموع الميزانية:</Text>
                <Text style={styles.zakatTitle}>* نسبة الزكاة</Text>
                <Text style={styles.zakatTitle}>مجموع الزكاة الواجب دفعه: </Text>
              </View>
              <View style={styles.zakatText}>
              <Text style={styles.zakatText}>{data.balance}</Text>
              <Text style={styles.zakatText}>2.5%</Text>
              <Text style={styles.zakatText}>{zakatValue} دينارًا أردنيًا</Text>
              </View>

            </View>)}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    backgroundColor: globalStyles.secondaryColor,

  },
  aboutContainer: {
    backgroundColor: globalStyles.tertiaryColor,
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    margin: 20,
    borderRadius: 10,
  },
  about: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  },
  aboutText: {
    fontSize: 18,
    color: "#000",
    marginTop: 10
  },
  zakatCalculation: {
    backgroundColor: globalStyles.tertiaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: "flex",
    flexDirection:"row-reverse",
    margin: 20,
    borderRadius: 10,
    justifyContent: "space-between"
  },
  zakatTitle: {
    fontSize: 18,
    color: "#000",
    marginVertical: 10
  },
  zakatText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10
  }
});
