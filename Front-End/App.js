if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/routes";

const App = () => {
  return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
  );
};

export default App;
