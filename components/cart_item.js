import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { Text, View, Image, Button, ActivityIndicator, ImageBackground } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import { styles } from '../styles/product.js'
import axios from 'axios';

var api = axios.create({
    baseURL: 'https://www.floristone.com/api/rest',
    timeout: 2000,
    headers: {'Authorization': `Basic ${auth}`}
});

function CartItem(props) {
    const navigation = useNavigation(); //navigation hook
    let [loaded, setLoaded] = useState(false)
    let [product, setProduct] = useState({})
    let [error, setError] = useState(null)      //error fetching

    React.useEffect(() => {
        // this is called when the component is mounted

        GetProduct()

        //anything returned happens when component is unmounted
        return () => {
        };
    }, [])

    async function GetProduct() {
        let url = `/flowershop/getproducts?code=${props.code}`

        const data = await api.get(url)
        const obj = await data.data

        //error handling
        if("errors" in obj) {
            setError(obj.errors)
            return {NAME: "error", DESCRIPTION: obj.errors}
        }
        else {
            setError(null)
            //console.log(obj.PRODUCTS[0])
            setLoaded(true)
            let temp = await obj.PRODUCTS[0]
            setProduct(temp)
            return obj.PRODUCTS[0]
        }        
    }

    let Image_Http_URL = { uri: product.LARGE };

    return (
        (!error)? 
        <>
            {(loaded)?
            <View style={styles.cartCard}>
                <Text style={styles.header_text}>{product.NAME}</Text>
                <ImageBackground 
                    source={Image_Http_URL} 
                    style={styles.image}
                    imageStyle={{borderRadius: 15}}
                >
                    <View style={styles.productCardContents}>
                        <Text>${product.PRICE}</Text>
                        <Text>{product.CODE}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.productCardContents}>
                    <View style={styles.horizontalWrap}>
                        <View style={{padding: 5, flex: 1}}>
                            <Button
                                title="Place order"
                                onPress={() => {
                                    navigation.navigate('Ordering', {
                                        product: product, CartID: props.cart
                                })}}
                                color="#9AC791" //green
                            />
                        </View>
                        <View style={{padding: 5, flex: 1}}>
                            <Button
                                title="Delete Item"
                                onPress={async () => {
                                    let resp = await RemoveItemFromCart(props.cart, product.CODE)
                                    console.log("deleted? " + resp)
                                    props.setUpdated(true)
                                }}
                                color="#ff6666" //pastel red
                            />
                        </View>
                    </View>
                    <Text style={{fontSize: 1}}>.</Text>
                    <Text style={styles.paragrah_text}>{product.DESCRIPTION}</Text>
                </View>

            </View>
            :
                <ActivityIndicator size="large" color="#0000ff" style={{padding: '50%'}}/>
            }
        </>
        :
            <>
                <Text>Error</Text>
            </>
    );
}

async function RemoveItemFromCart(id, code) {
    console.log("RemoveItemFromCart: " + id + ' and code: ' + code)
    var api = axios.create({
        baseURL: 'https://www.floristone.com/api/rest',
        headers: {'Authorization': `Basic ${auth}`}
    });

    //action=add as items are beign added here
    const data = await api.put(`/shoppingcart?sessionid=${id}&action=remove&productcode=${code}`) 
    const obj = await data.data

    if("errors" in obj) {
        console.log("Error: could not remove item to cart")
    }
    else {
        console.log("successfully removed item to cart")
    }

    return obj
}

export default CartItem;