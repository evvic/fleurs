import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Products from './../components/products.js'
import { username, password, auth } from './../API_KEY.js'
import { returnCategories } from './../getcategories.js'

//https://github.com/react-native-picker/picker
import { Picker } from '@react-native-picker/picker'; //npm install @react-native-picker/picker --save
import { FlatList } from 'react-native-gesture-handler';


// the navigation prop is passed in to every screen component
function HomeScreen({ navigation, route }) {
    let [welcome, setWelcome] = React.useState("null")
    const [category, setCategory] = React.useState("null");
    const [categories, setCategories] = React.useState([])
    const [listCategories, setListCategories] = React.useState([<Picker.Item label="temp" value="temp" />])
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        console.log("mounted")

        var swag = [
          {DISPLAY:"Bday", CATEGORY: "bd"},
          {DISPLAY:"Anniversary", CATEGORY: "an"},
          {DISPLAY:"Funeral", CATEGORY: "fr"},
        ]

        
        
        StartUp()

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

    async function StartUp() {
      let temp = await Intro()
      setWelcome(temp)

      temp = await returnCategories()
      setCategories(temp)

      console.log("teehee" + categories)

      setListCategories(temp.map(item => {
        <Picker.Item label={item.DISPLAY} value={item.CATEGORY} />
      }))
      setLoaded(true)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Zcreen</Text>
            {(loaded)? 
            <Picker
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) =>
                setCategory(itemValue)
              }>
                {/* listCategories */}
                <Picker.Item label={"Birthday"} value={"bd"} />
                <Picker.Item label={"Anniversary"} value={"an"} />
                <Picker.Item label={"Everyday"} value={"ao"} />
                <Picker.Item label={"Thank You"} value={"ty"} />
            </Picker>
            :
            <p>loading...</p>}
            
            <Button
                title="Write feedback"
                onPress={() => navigation.navigate('Feedback')}
            />
            <Text>{welcome}</Text>
            {(category)?
            <Products category={category}/>
            :
            <p>select category</p>
            }
            
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomeScreen;