import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home.js'
import CartScreen from './screens/Cart.js'
import Feedback from './screens/Feedback.js'

import Products from './products.js'

import axios from "axios";  //fetching weather data

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

/*
export default function App() {
  let [welcome, setWelcome] = useState("null")
  

  useEffect(() => {
    console.log("mounted");
    Intro()
    //setWelcome(Intro())

  }, [])

  async function Intro() {
    const username = "386866" //API key
    const password = "ENXg1E" //API password
  
    const auth = btoa(`${username}:${password}`) //base64 encode given string
  
    const url = "https://www.floristone.com/api/rest/floristone/welcome"
  
    const options = {
      headers: {
        Authorization: `Basic ${auth}`
      }
    }
  
    const data = await fetch(url, options)
    const obj = await data.json()
  
    //const data = await axios.get(url)
    //console.log(obj.WELCOME) 
    let msg = await obj.WELCOME
    console.log(msg)
    setWelcome(String(msg))
  }
  
  return (
    <View style={styles.container}>
      <Text>{welcome}</Text>
      <Products />
      <StatusBar style="auto" />
    </View>
  );
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
