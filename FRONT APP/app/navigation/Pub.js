import React from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import AnotherScreen from '../components/AnotherScreen';
import Publications from '../components/Publications';


const Stack = createStackNavigator();

const Pub = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Publications} name='Home' />
      <Stack.Screen component={AnotherScreen} name='AnotherScreen' />
      
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Pub;
