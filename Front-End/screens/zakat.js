import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
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
  let goldPriceJOD = 42.69
  let goldGramNisab = 85
  let JODNisab = Math.ceil(goldPriceJOD * goldGramNisab)
  let zakatValue = Math.ceil(data.balance * 0.025);


  return (
    <View style={globalStyles.container}>
      <Header title="حاسبة الزكاة" showTotal={false} loggedIn={true} />
      <View style={styles.mainContainer}>
        {/* about container */}
        <View style={styles.aboutContainer}>
          <Text style={styles.about}>عن الزكاة: </Text>
          <Text style={styles.zakatAya}>(وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَأَطِيعُوا الرَّسُولَ لَعَلَّكُمْ تُرْحَمُونَ). [سورة النور، آية: 56]</Text>
        </View>
        {/* nisab container */}

        <View style={styles.nisapContainer}>
          <View>

            <Text style={styles.zakatTitle}>سعر غرام الذهب اليوم (بالدينار): </Text>
            <Text style={styles.zakatTitle}>نصاب المال (غرام من الذهب)</Text>
            <Text style={styles.zakatTitle}>قيمة النصاب بالدينار</Text>
          </View>
          <View>
            <Text style={styles.zakatText}>{goldPriceJOD}</Text>
            <Text style={styles.zakatText}>{goldGramNisab}</Text>
            <Text style={styles.zakatText}>{JODNisab}</Text>
          </View>


        </View>

        {/* summary container */}
        <View >
          <View style={styles.summaryContainer}>
            {data.balance < JODNisab ? (<Text style={styles.noZakatText}>ميزانيتك لم تبلغ النصاب فلا زكاة عليك</Text>) : (
              <View>
                <View>
                  <Text style={styles.zakatTitle}>مجموع الميزانية</Text>
                  <Text style={styles.zakatTitle}>نسبة الزكاة</Text>
                </View>
                <View>
                  <Text style={styles.zakatText}>{data.balance}</Text>
                  <Text style={styles.zakatText}>2.5%</Text>
                </View>
              </View>)}

          </View>
        </View>
        {/* result container */}
        {data.balance < JODNisab ? (<Text></Text>) : (
          <View style={styles.resultContainer}>
            <Text style={styles.zakatTitle}>مجموع الزكاة الواجب دفعه (بالدينار): </Text>
            <Text style={styles.resultText}>{zakatValue}</Text>
          </View>)}
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    backgroundColor: globalStyles.secondaryColor,

  },
  // about container
  aboutContainer: {
    backgroundColor: globalStyles.tertiaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: "flex",
    margin: 10,
    borderRadius: 10,
  },
  about: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  zakatAya: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalStyles.primaryColor,
    marginVertical: 10,

  },
  // nisap container

  nisapContainer: {
    backgroundColor: globalStyles.tertiaryColor,
    paddingHorizontal: 10,
    paddingVertical: 0,
    display: "flex",
    flexDirection: "row-reverse",
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 10,
  },

  // summary container

  summaryContainer: {
    backgroundColor: globalStyles.tertiaryColor,
    paddingHorizontal: 10,
    paddingVertical: 0,
    display: "flex",
    flexDirection: "row-reverse",
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 10,
  },
  // result container

  resultContainer: {
    backgroundColor: globalStyles.tertiaryColor,
    paddingHorizontal: 10,
    paddingVertical: 0,
    display: "flex",
    flexDirection: "column",
    margin: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 36,
    fontWeight: "bold",
    color: globalStyles.primaryColor,
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
  },
  noZakatText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
    paddingRight: 50
  }
});
