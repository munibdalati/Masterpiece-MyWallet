import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Header from "../shared/header";
import HeaderSummary from "../shared/headerSummary";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    { title: "Title 1", rating: 5, body: "Body 1", key: "1" },
    { title: "Title 2", rating: 4, body: "Body 2", key: "2" },
    { title: "Title 3", rating: 3, body: "Body 3", key: "3" },
  ]);

  const addReview = (review) => {
    review.key = Math.random().toString();
    setReviews((currentReviews) => {
      return [review, ...currentReviews];
    });
    // to hide the modal after submission
    setModalOpen(false);
  };
  return (
    <View style={globalStyles.container}>
      <Header/>
      <HeaderSummary/>
    </View>
  );
}

const styles = StyleSheet.create({

});
