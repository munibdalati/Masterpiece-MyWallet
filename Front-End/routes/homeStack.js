import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";
import Header from "../shared/header";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerTintColor: "#444",
            headerStyle: { backgroundColor: "#eee", height: 60 },
          }}
        >
          <Stack.Screen
            name="HomePage"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ReviewDetails"
            component={ReviewDetails}
            options={{ title: "Review Details" }}
          />
        </Stack.Group>
      </Stack.Navigator>

  );
}

export default HomeStack;
