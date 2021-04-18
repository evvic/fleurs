import * as React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import { username, password, auth } from './../API_KEY.js'
import CartItem from '../components/cart_item.js'


function CartScreen({ route, navigation }) {
    //get params. If none were passed, inital ones will be used
    const { itemId, CartID } = route.params;
    const [cartItems, setCartItems] = React.useState([])

    React.useEffect(() => {
        console.log("non-async cartItems")

        UpdateCart()
    }, [])

    async function UpdateCart() {
        let temp = await GetCart(CartID)
        console.log(temp)
        setCartItems(temp)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Cart</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(CartID)}</Text>
            <Button
            title="Go to Cart"
            onPress={() => navigation.push('Cart', {
                itemId: 69,
                otherParam: 'how to pass data to another screen',
            })}
            //navigation.push creates a new page (can make duplicates)
            //navigation.navigate goes to the page
            />
            <FlatList 
                //style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 0}}
                data={cartItems}
                renderItem={({item}) => <CartItem code={item.CODE} />}
            />
      
      </View>
    );
    /*CODE: "D5-4894"
    NAME: "The Happy Blooms Basket"
    PRICE: 69.95
    */
}

//takes the session_ID and returns an object/array of all itemsin the cart
async function GetCart(sessionid) {
    var api = axios.create({
      baseURL: 'https://www.floristone.com/api/rest',
      timeout: 2000,
      headers: {'Authorization': `Basic ${auth}`}
    });
    console.log("cart contents id " + sessionid)


    const data = await api.get(`/shoppingcart?sessionid=${sessionid}`) 
    const obj = await data.data

    
    console.log(obj.products)
    return obj.products
}

export default CartScreen;