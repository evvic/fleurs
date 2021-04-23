import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Products from './../components/products.js'
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
    const [category, setCategory] = React.useState("bd");
    const [categories, setCategories] = React.useState([])
    const [listCategories, setListCategories] = React.useState([<Picker.Item label="temp" value="temp" />])
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
    
        let temp = await obj.SESSIONID
        updateCart(temp)
        console.log("updateCart " + temp)
        return temp
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
                onPress={() => navigation.navigate('Cart')}
                title="Cart"
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

        
        temp = await returnCategories()
        setCategories(temp)

        console.log("teehee" + categories)

        setListCategories(temp.map(item => {
            <Picker.Item label={item.DISPLAY} value={item.CATEGORY} />
        }))
        setLoaded(true)
        }

    return (
        <View>
            <Text>Home Zcreen</Text>
            <Button
                title="Write feedback"
                onPress={() => navigation.navigate('Feedback')}
            />
            {(loaded)? 
            <Picker
              style={styles.dropdown_container}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)
              }>
                <Picker.Item label={"Birthday"} value={"bd"} />
                <Picker.Item label={"Anniversary"} value={"an"} />
                <Picker.Item label={"Everyday"} value={"ao"} />
                <Picker.Item label={"Thank You"} value={"ty"} />
            </Picker>
            :
            <Text>loading...</Text>}
            
            
            <Text>{welcome}</Text>
            {(category)?
            <Products category={category} sessionid={cartID}/>
            :
            <Text>select category</Text>
            }
            
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

const styles = StyleSheet.create({
    dropdown_container: {
        paddingTop: 30,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
  });

export default HomeScreen;