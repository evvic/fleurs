import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { Text, View, Button, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import { styles } from '../styles/product.js'; //CSS equivalent
import axios from 'axios';

function Product(props) {
    const navigation = useNavigation(); //navigation hook
    const [expanded, setExpanded] = useState(false)   
    let Image_Http_URL = { uri: props.obj.LARGE };

    React.useEffect(() => {
        // this is called when the component is mounted

        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [])

    return (
        <View style={styles.productCard}>
            <Text style={styles.header_text}>{props.obj.NAME}</Text>
            <TouchableOpacity onPress={() => {
                    setExpanded(!expanded)
                }}>
                <ImageBackground 
                    source={Image_Http_URL} 
                    style={styles.image}
                    imageStyle={{borderRadius: 15}}
                >
                    <View style={styles.productCardContents}>
                        <Text>${props.obj.PRICE}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            {(expanded)?
            <View style={styles.productCardContents}>
                <Text style={{fontSize: 1}}>.</Text>
                <Text style={styles.paragrah_text}>{props.obj.DESCRIPTION}</Text>
                
                <Button
                    title="Add to basket"
                    style={styles.bottom}
                    color={"#dcc2ee"}
                    onPress={() => {
                        AddItemToCart(props.obj.CODE, props.sessionid)
                        //navigation.navigate('Cart', { itemId: props.obj.CODE })
                    }}
                />
            </View>
            :
            <View style={styles.productCardContents}>
                <Text style={styles.subtle_text}>Tap product to get details</Text>
            </View>
            }
        </View>
    );
}

async function AddItemToCart(product_code, cart_id) {
    //PUT /shoppingcart?sessionid={SESSIONID}&action=add&productcode={PRODUCTCODE}
    var api = axios.create({
        baseURL: 'https://www.floristone.com/api/rest',
        timeout: 2000,
        headers: {'Authorization': `Basic ${auth}`}
    });

    //action=add as items are beign added here
    const data = await api.put(`/shoppingcart?sessionid=${cart_id}&action=add&productcode=${product_code}`) 
    const obj = await data.data

    if("errors" in obj) {
        //setTimeout(() => {}, 2000)
        //TOAST OR SOME POP-UP NOTIFYING IT COULD NOT ADD ITEM TO CART
        console.log("Error: could not add item to cart")
    }
    else {
        console.log("successfully added item to cart")
    }

    console.log(obj)
}

export default Product;