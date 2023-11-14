import React from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import AnotherScreen from '../components/AnotherScreen';
import Publications from '../components/Publications';
import ArticlesDetails from '../components/ArticlesDetails';
import Articles from '../components/Articles';
import Homels from '../screens/Home';
import Details from '../screens/Details';


const Stack = createStackNavigator();

const Article = () => {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   <Stack.Screen component={Articles} name='Article' />
    //   <Stack.Screen component={ArticlesDetails} name='ArticleDetails' />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Homels"
      >
        <Stack.Screen name="Homels" component={Homels} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    // </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Article;
