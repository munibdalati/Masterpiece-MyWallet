import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplachScreen from "expo-splash-screen";
import Home from "./screens/home";


const App = () => {
  const [fontsLoaded] = useFonts({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "dancing-bold": require("./assets/fonts/DancingScript-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplachScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplachScreen.hideAsync();
  }


  return(
      <Home />

  ) 
};

export default App;
