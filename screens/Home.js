import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Products from './../components/products.js'
import { username, password, auth } from './../API_KEY.js'

// the navigation prop is passed in to every screen component
function HomeScreen({ navigation, route }) {
    let [welcome, setWelcome] = React.useState("null")

    React.useEffect(() => {
        console.log("mounted")
        Intro()

        if (route.params?.feedback) {
        // Post updated, do something with `route.params.feedback`
        // For example, send the post to the server
        console.log(route.params?.feedback)
        }
    }, [route.params?.feedback]);

    //for header options/styling
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
                onPress={() => navigation.navigate('Cart')}
                title="Cart"
                color="#A7C7E7"
              />
          ),
        });
    }, [navigation]);

    async function Intro() {
        const url = "https://www.floristone.com/api/rest/floristone/welcome"
      
        const options = {
          headers: {
            Authorization: `Basic ${auth}`
          }
        }
      
        const data = await fetch(url, options)
        const obj = await data.json()
      
        let msg = await obj.WELCOME
        console.log(msg)
        setWelcome(String(msg))
      }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Zcreen</Text>
            <Button
                title="Write feedback"
                onPress={() => navigation.navigate('Feedback')}
            />
            <Text>{welcome}</Text>
            <Products />
        </View>
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

export default HomeScreen;