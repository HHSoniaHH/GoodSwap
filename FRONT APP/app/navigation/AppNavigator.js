import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import Home from './Home';
import Profile from '../components/Profile';
import Discussion from '../components/Discussion';
import Friends from '../components/Friends';
import { StatusBar } from 'react-native';
import HomeScreen from './Pub';
import Pub from './Pub';
import Article from './Articles';

const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator style={{ paddingTop: StatusBar.currentHeight ,}} 
     >
      <Tab.Screen 
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'home' : 'home-outline'}
              color={focused ? 'rgba(49, 39, 131,1)' : '#272727'}
            />
          ),
        }}
        component={Home}
        name='Home'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'duplicate' : 'duplicate-outline'}
              color={focused ? 'rgba(49, 39, 131,1)' : '#272727'}
            />
          ),
        }}
        component={Pub}
        name='Friends'
      />
        <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'newspaper' : 'newspaper-outline'}
              color={focused ? 'rgba(49, 39, 131,1)' : '#272727'}
            />
          ),
        }}
        component={Article}
        name='posts'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              color={focused ? 'rgba(49, 39, 131,1)' : '#272727'}
            />
          ),
        }}
        component={Discussion}
        name='Search'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'person' : 'person-outline'}
              color={focused ? 'rgba(49, 39, 131,1)' : '#272727'}
            />
          ),
        }}
        component={Profile}
        name='Profile'
      />

    </Tab.Navigator>
  );
};

export default AppNavigator;
