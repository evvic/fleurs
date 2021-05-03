import * as React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import { username, password, auth } from './../API_KEY.js'
import CartItem from '../components/cart_item.js'


function CartScreen({ route, navigation }) {
    //get params. If none were passed, inital ones will be used
    const { itemId, CartID } = route.params;
    const [cartItems, setCartItems] = React.useState([])
    let [error, setError] = React.useState(null)     //error fetching

    React.useEffect(() => {
        console.log("non-async cartItems")

        UpdateCart()
    }, [])

    async function UpdateCart() {
        let temp = await GetCart(CartID, setError)
        console.log(temp)
        setCartItems(temp)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Cart</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(CartID)}</Text>
            {(!error)?
                <FlatList 
                    //style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 0}}
                    data={cartItems}
                    renderItem={({item}) => <CartItem code={item.CODE} />}
                />
            :
                <Text>Error retrieving products: {error}</Text>
            }
            
      
      </View>
    );
}
//navigation.push creates a new page (can make duplicates)
//navigation.navigate goes to the page

//takes the session_ID and returns an object/array of all itemsin the cart
async function GetCart(sessionid, setError) {
    var api = axios.create({
      baseURL: 'https://www.floristone.com/api/rest',
      timeout: 2000,
      headers: {'Authorization': `Basic ${auth}`}
    });
    console.log("cart contents id " + sessionid)


    const data = await api.get(`/shoppingcart?sessionid=${sessionid}`) 
    const obj = await data.data

    if("errors" in obj) {
        console.log("ERROR CAUGHT")
        setError(obj.errors)
        return {NAME: "error", DESCRIPTION: obj.errors}
    }
    else {
        console.log(obj.products)
        setError(null)
        return obj.products
    }

    
    
}

export default CartScreen;