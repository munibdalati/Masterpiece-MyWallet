import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import AddExpense from "../screens/addExpense";
import AddIncome from "../screens/addIncome";
import Settings from "../screens/settings";
import SignUp from "../screens/signUp";
import SignIn from "../screens/signIn";
import Personal from "../screens/personal";
import Zakat from "../screens/zakat";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn" 
    >
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomePage"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddIncome"
        component={AddIncome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Personal"
        component={Personal}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="Zakat"
        component={Zakat}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default Routes;
