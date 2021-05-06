import * as React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import styles from '../styles/home.js'
import Products from './../components/products.js'
import Pickers from './../components/pickers.js'
import { username, password, auth } from './../API_KEY.js'
import axios from 'axios';

// the navigation prop is passed in to every screen component
function HomeScreen({ navigation, route }) {
    //get params. If none were passed, inital ones will be used
    const { updateCart } = route.params; //lift-up state
    const [cartID, setCartId] = React.useState()
    let [welcome, setWelcome] = React.useState("null")
    const [category, setCategory] = React.useState("all");
    const [sorttype, setSorttype] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false)
    const [loadedProducts, setLoadedProducts] = React.useState(true)

    /* const onChangeSS = (value) => {
      setCategory(value.toString());
    }; */

    async function CreateCart() {
        var api = axios.create({
          baseURL: 'https://www.floristone.com/api/rest',
          timeout: 2000,
          headers: {'Authorization': `Basic ${auth}`, 'Content-type': 'application/json'}
        });
    
        const data = await api.post("/shoppingcart") 
        const obj = await data.data
    
        if("errors" in obj) {
          console.log("Error creating cart: " + obj.errors)
        }
        else {
          let temp = await obj.SESSIONID
          updateCart(temp)
          console.log("updateCart " + temp)
          return temp
        }
    }

    React.useEffect(() => {
        console.log("home mounted")
        
        StartUp()
    
        if (route.params?.feedback) {
          // Post updated, do something with `route.params.feedback`
          // For example, send the post to the server
          console.log(route.params?.feedback)
        }
        return () => {
            console.log("home unmounted")
        }
    }, [route.params?.feedback]);

    //for header options/styling
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button 
                style={{paddingHorizontal: 30}}
                onPress={() => navigation.navigate('Cart')}
                title="Basket"
                color="#A7C7E7"
              />
          ),
        });
    }, [navigation]);

    async function StartUp() {
      let temp = await Intro()
      setWelcome(temp)

      temp = await CreateCart()
      setCartId(temp)

      setLoaded(true)
    }

    return (
        <View>
            {(loaded)? 
            <>
              <Pickers category={category} setCategory={setCategory} sorttype={sorttype}
                setSorttype={setSorttype} loadedProducts={loadedProducts}/>
            </>
            :
            <Text>loading...</Text>}
            <ScrollView>
              {(category)?
              <Products category={category} sorttype={sorttype} sessionid={cartID}
                loadedProducts={loadedProducts} setLoadedProducts={setLoadedProducts}/>
              :
              <Text>select category</Text>
              }
              <View style={{paddingVertical: 20, margin: 20}}>
                <Button
                  title="Write feedback"
                  onPress={() => navigation.navigate('Feedback')}
                  color="#A7C7E7"
                />
              </View>
            </ScrollView>
            
        </View>
    );
}

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
  return msg
}

export default HomeScreen;