//import libraries
import React from "react";
import { StyleSheet } from "react-native";
import DrawPage from "./DrawPage";
import { createStackNavigator } from "@react-navigation/stack";
import { useLogin } from "../context/LoginProvider";
import ImageUpload from "../Authentification/ImageUpload";
import AppForm from "../Authentification/AppForm";
import LandigPage from "./LandingPage";
import AppLoading from "../Authentification/AppLoading";
import Discussion from "../components/Discussion";
import Dashboard from "../components/Dashboard";
import Verification from "../Authentification/Verification";
import DemandeReset from "../Authentification/demandeReset";
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen component={LandigPage} name="LandigPage" />
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={Verification} name="Verification" /> */}
      <Stack.Screen component={DemandeReset} name="Forgot" />
      <Stack.Screen component={ImageUpload} name="ImageUpload" />

      <Stack.Screen component={DrawPage} name="UserHome" />

    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, isLoginpending,isAdmin,isUser } = useLogin();
  return isLoggedIn && isAdmin && !isUser ? (<Dashboard/>): isLoggedIn && isUser && !isAdmin?(
    <>
      <DrawPage />
      {isLoginpending ? <AppLoading /> : null}
    </>
  ) : (
    <StackNavigator />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default MainNavigator;
