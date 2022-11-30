import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'

import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import NewPost from '../pages/NewPost'
import PostsUser from '../pages/PostsUser'

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{  //Configuraçoes de estilo para a tab 
        headerShown: false,
        tabBarHideOnKeyboard: true, //para esconde a tab quando abrir o teclado
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',

        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />
          }
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" color={color} size={size} />
          }
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />
          }
        }}
      />
    </Tab.Navigator>
  );
}