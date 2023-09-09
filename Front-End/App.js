import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/routes";
import { DarkModeProvider } from "./styles/DarkModeContext";

const App = () => {
  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default App;
