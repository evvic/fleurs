import * as React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/home.js'
import Products from './../components/products.js'
import Pickers from './../components/pickers.js'
import { username, password, auth } from './../API_KEY.js'
import { returnCategories } from './../getcategories.js'
import axios from 'axios';

//https://github.com/react-native-picker/picker
import { Picker } from '@react-native-picker/picker'; //npm install @react-native-picker/picker --save
import { FlatList } from 'react-native-gesture-handler';

import { data } from '../data.js'

// the navigation prop is passed in to every screen component
function HomeScreen({ navigation, route }) {
    //get params. If none were passed, inital ones will be used
    const { updateCart } = route.params; //lift-up state
    const [cartID, setCartId] = React.useState()
    let [welcome, setWelcome] = React.useState("null")
    const [category, setCategory] = React.useState("all");
    const [sorttype, setSorttype] = React.useState(null)
    //const [categories, setCategories] = React.useState([])
    //const [listCategories, setListCategories] = React.useState([<Picker.Item label="temp" value="temp" />])
    const [loaded, setLoaded] = React.useState(false)

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

        //categories will be preset
        /* temp = await returnCategories()
        setCategories(temp) */

        //console.log("teehee" + categories)

        /* setListCategories(temp.map(item => {
            <Picker.Item label={item.DISPLAY} value={item.CATEGORY} />
        })) */
        setLoaded(true)
        }

    return (
        <View>
            
            {(loaded)? 
            <>
              <Pickers category={category} setCategory={setCategory} 
                sorttype={sorttype} setSorttype={setSorttype} />
            </>
            :
            <Text>loading...</Text>}
            
            {/* <Text>{welcome}</Text> */}
            {(category)?
            <Products category={category} sorttype={sorttype} sessionid={cartID}/>
            :
            <Text>select category</Text>
            }
            <Button
                title="Write feedback"
                onPress={() => navigation.navigate('Feedback')}
            />
            
        </View>
    );
}
//works on android but not web
{/* <View style={styles.dropdown_container}>
  <Dropdown
    label="Simple dropdown"
    data={data}
    value={category}
    onChange={onChangeSS}
  />
</View> */}

//works in web but not in android?


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