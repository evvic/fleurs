import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home.js'
import CartScreen from './screens/Cart.js'
import Feedback from './screens/Feedback.js'

//https://github.com/stephy/CalendarPicker
// ^ use this for calnedar later?

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#dcc2ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
          <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Overview',
            headerStyle: {
              backgroundColor: '#dcc2ee',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            initialParams={{itemId: 0, otherParam: "null", name: "User"}}
            options={({ route }) => ({ title: `${route.params.name}'s Cart`})}/>
         <Stack.Screen name="Feedback" component={Feedback}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
