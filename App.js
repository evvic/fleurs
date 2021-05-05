import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import HomeScreen from './screens/Home.js'
import CartScreen from './screens/Cart.js'
import Feedback from './screens/Feedback.js'
import { username, password, auth } from './API_KEY.js' //base64 encoded API key
import OrderScreen from './screens/Ordering.js';

//https://github.com/sbycrosz/react-native-credit-card-input
// ^ use this for cc info?

const Stack = createStackNavigator();

export default function App() {
  //cart
  const [sessionID, setSessionID] = useState()

  //moved create cart ID to Home, then lifts state up
  async function CreateCart() {
    var api = axios.create({
      baseURL: 'https://www.floristone.com/api/rest',
      timeout: 2000,
      headers: {'Authorization': `Basic ${auth}`, 'Content-type': 'application/json'}
    });

    const data = await api.post("/shoppingcart") 
    const obj = await data.data

    let temp = await obj.SESSIONID
    setSessionID(temp)
  }

  async function DestroyCart() {
    var api = axios.create({
      baseURL: 'https://www.floristone.com/api/rest',
      timeout: 2000,
      headers: {'Authorization': `Basic ${auth}`}
    });

    const data = await api.delete(`/shoppingcart?sessionid=${sessionID}`)
    const obj = await data.data

    setSessionID()
    console.log(obj)
  }

  useEffect(() => {
    //mount and create cart
    //CreateCart()

    //unmount and destroy cart
    return () => {
      DestroyCart()
    }
  }, [])

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
          initialParams={{CartID: sessionID, updateCart: setSessionID}}
          options={{ 
            title: 'Fleurs',
            headerStyle: {
              backgroundColor: '#dcc2ee',
              
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRightContainerStyle: {
              marginRight: 10 //for cart button in Home/header
            }
          }}/>
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            initialParams={{itemId: 0, CartID: sessionID, name: "User"}}
            options={({ route }) => ({ title: `${route.params.name}'s Basket`})}/>
         <Stack.Screen 
          name="Feedback" 
          component={Feedback}
          options={{
            headerLeft: null,
            headerRightContainerStyle: {
              marginRight: 10 //for cart button in Home/header
          }}}/>
         <Stack.Screen name="Ordering" component={OrderScreen}/>
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
