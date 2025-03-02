import React, { useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import AddExpense from "../screens/addExpense";
import AddIncome from "../screens/addIncome";
import Settings from "../screens/settings";
import SignUp from "../screens/signUp";
import SignIn from "../screens/signIn";
import Personal from "../screens/personal";
import Zakat from "../screens/zakat";
import ForgotPassword from "../screens/forgotPassword";
import Splash from "../screens/splash";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash" 
    >
          <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
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
        name="ForgotPassword"
        component={ForgotPassword}
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
