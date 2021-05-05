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
        console.log("CART ITEM ID: " + props.cart)

        GetProduct()

        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
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
                    </View>
                </ImageBackground>
                <View style={styles.productCardContents}>
                    <Text style={{fontSize: 1}}>.</Text>
                    <Text style={styles.paragrah_text}>{product.DESCRIPTION}</Text>
                    
                    <Button
                        title="Place order"
                        onPress={() => {
                            navigation.navigate('Ordering', {
                                product: product, CartID: props.cart
                        })}}
                        color="#9AC791" //green
                    />
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
}

export default CartItem;