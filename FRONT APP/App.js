// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import AppNavigator from './app/navigation/AppNavigator';

// export default function App() {
//   return (

//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppForm from "./app/Authentification/AppForm";

import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import ImageUpload from "./app/Authentification/ImageUpload";
import Homeninou from "./app/navigation/Principale";
import DrawPage, { StackNavigator } from "./app/navigation/DrawPage";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import MainNavigator from "./app/navigation/MainProvider";
import LoginProvider from "./app/context/LoginProvider";

export default function App() {
  const [loaded] = useFonts({
    poppins: require("./assets/Poppins-SemiBold.ttf"),
  });

  
  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <LoginProvider>
      
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
