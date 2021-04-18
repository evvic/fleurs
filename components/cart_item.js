import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Card,  } from 'react-native-elements' //npm install react-native-elements
import { username, password, auth } from '../API_KEY.js'
import { styles } from './product_style.js'; //CSS equivalent
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


    React.useEffect(() => {
        // this is called when the component is mounted

        GetProduct()
        

        async () => {
            const data = await api.get(url) 
            const obj = await data.data
            console.log("~~~~~object lololol~~~~~~")
            console.log(obj)
        }

        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [])

    async function GetProduct() {
        let url = `/flowershop/getproducts?code=${props.code}`

        const data = await api.get(url)
        const obj = await data.data

        console.log(obj.PRODUCTS[0])
        setLoaded(true)
        let temp = await obj.PRODUCTS[0]
        setProduct(temp)
        return obj.PRODUCTS[0]
    }

    let Image_Http_URL ={ uri: product.LARGE};
    //console.log(props.obj)

    return (
        <View style={styles.container}>
            <Text>{props.code}</Text>
            {(loaded)?
            <View className="flower-pot" style={styles.flower_pot}>
                <View className="flower-icon">
                    <Image source={Image_Http_URL}
                        //image NEEDS width and height style
                        style={{width:400, height:400}}  
                    />
                </View>
                <Text>{product.NAME}</Text>
                <Text>${product.PRICE}</Text>
                <Text>{product.DESCRIPTION}</Text>
                <Button
                    title="Place order"
                    onPress={() => navigation.navigate('Ordering', {
                        product: product
                    })}
                />
            </View>
            :
            <Text>Loading...</Text>
            }
            
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

export default CartItem;