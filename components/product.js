import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Card,  } from 'react-native-elements' //npm install react-native-elements
import { username, password, auth } from '../API_KEY.js'
import { styles } from './product_style.js'; //CSS equivalent
import axios from 'axios';


//https://github.com/WrathChaos/react-native-apple-card-views
//npm i react-native-apple-card-views //has 3 dependencies
//import { AppleCard } from 'react-native-apple-card-views'

function Product(props) {
    const navigation = useNavigation(); //navigation hook
    let [iconimg, setIconimg] = useState(null)  //weather icon description

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("Product mounted")

        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [])

    let Image_Http_URL ={ uri: props.obj.LARGE};
    //console.log(props.obj)

    return (
        <View style={styles.container}>
            <View className="flower-pot" style={styles.flower_pot}>
                <View className="flower-icon">
                    <Image source={Image_Http_URL}
                        //image NEEDS width and height style
                        style={{width:400, height:400}}  
                    />
                </View>
                <Text>{props.obj.NAME}</Text>
                <Text>${props.obj.PRICE}</Text>
                {(true)? //when product is added to cart maybe change button
                <Button
                    title="Add to basket"
                    onPress={() => {
                        AddItemToCart(props.obj.CODE, props.sessionid)
                        navigation.navigate('Cart', {
                            itemId: props.obj.CODE
                        })
                    }}
                />
                :
                <Button
                    title="Remove from basket"
                    onPress={() => {
                        //AddItemToCart(props.obj.CODE, props.sessionid)
                        navigation.navigate('Cart', {
                            itemId: props.obj.CODE
                        })
                    }}
                />}
                <Text>{props.obj.DESCRIPTION}</Text>
            </View>
        </View>
    );
}

async function AddItemToCart(product_code, cart_id) {
    //PUT /shoppingcart?sessionid={SESSIONID}&action=add&productcode={PRODUCTCODE}
    console.log("AddItemToCart: " + cart_id)
    var api = axios.create({
        baseURL: 'https://www.floristone.com/api/rest',
        timeout: 2000,
        headers: {'Authorization': `Basic ${auth}`}
    });

    //action=add as items are beign added here
    const data = await api.put(`/shoppingcart?sessionid=${cart_id}&action=add&productcode=${product_code}`) 
    const obj = await data.data

    console.log(obj)

}

//Ugly Card
{/* <Card>
    <Card.Title>{props.obj.NAME}</Card.Title>
    <Card.Divider/>
    <div className="flower-icon">
        <img style={{width:'200px'}} src= {props.obj.LARGE} />
    </div>
</Card> */}

export default Product;