import * as React from 'react';
import { View, Text, Button, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { username, password, auth } from './../API_KEY.js'
import CartItem from '../components/cart_item.js'
import { styles } from '../styles/product'

function CartScreen({ route, navigation }) {
    //get params. If none were passed, inital ones will be used
    const { itemId, CartID } = route.params;
    const [cartItems, setCartItems] = React.useState([])
    let [error, setError] = React.useState(null)     //error fetching
    const [updated, setUpdated] = React.useState(false)

    React.useEffect(() => {

        UpdateCart()
    }, [updated])

    async function UpdateCart() {
        setCartItems([])
        let temp = await GetCart(CartID, setError)
        console.log(temp)
        if(temp == null) console.log("was an error in GetCart")
        else if(temp.length == 0) console.log("cart is empty")
        setCartItems(temp)
        setUpdated(false)
    }

    //keep styling above card

    return (
        <ScrollView>
            <View style={styles.productCard}>
                <View style={styles.productCardContents}>
                    <Text style={styles.header_text_centered}>Basket</Text>
                    <Text style={styles.subtle_text}>Cart ID</Text>
                    <Text style={styles.subtle_text}>{JSON.stringify(CartID)}</Text>
                    <Text style={styles.subtle_text}>Items in cart: {cartItems.length}</Text>
                </View>
            </View>

            {(!error)?
            <>
                {(cartItems.length > 0)?
                    <FlatList 
                    //style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 0}}
                    data={cartItems}
                    renderItem={({item}) => <CartItem code={item.CODE} 
                        cart={CartID} setUpdated={setUpdated}/>}
                />
                :
                <View style={styles.productCard}>
                    <View style={styles.productCardContents}>
                        <Text style={styles.header_text_centered}>😭 Oh no! The cart is empty!</Text>
                    </View>
                </View>
                }
            </>
            :
                <>
                    <Text>Error retrieving cart: {error}</Text>
                </>
            }
            
      
      </ScrollView>
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
        return null
    }
    else {
        //console.log(obj.products)
        setError(null)
        return obj.products
    }
    
}

export default CartScreen;