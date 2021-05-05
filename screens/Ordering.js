import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { createStackNavigator, StackActions } from '@react-navigation/stack';

import axios from 'axios';
import { username, password, auth } from './../API_KEY.js'

//ordering components
import GetZipCode from '../ordering_screens/get_zip_code.js'    // sets shipping zip code & delivery day
import GetDeliveryAddy from '../ordering_screens/delivery_addy.js' // sets shipping address
import GetBillingAddy from '../ordering_screens/billing_addy.js'// sets billing address
import Payment from '../ordering_screens/payment.js'            // gets payment & returns token
import PlaceOrder from '../ordering_screens/place_order.js'     // places orders with FLoristOne

import { set } from 'react-native-reanimated';

const Tab = createStackNavigator();

function OrderScreen({ route, navigation }) {
    //get params. If none were passed, inital ones will be used
    const { product } = route.params;
    const [cartItems, setCartItems] = useState([])
    var [zipCode, setZipCode] = useState()
    let [selectedDay, setSelectedDay] = useState()
    const [token, setToken] = useState(null, () => {
        console.log("inside callback")
        if(token != null) navigation.navigate('Ordering', { screen: 'Place Order' })
    })
    let [billingAddress, setBillingAddress] = useState({
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        email: "" //only need email for the "customer"
    })
    let [deliveryAddress, setDeliveryAddress] = useState({
        name: "", institution: "", address1: "", address2: "", city: "", state: "",
        zip: "", country: "", phone: "" })

    const [returnHome, setReturnHome] = useState(false)

    React.useEffect(() => {
        if(returnHome) {
            console.log("navigation.dispatch(StackActions.popToTop())")
            //navigation.dispatch(StackActions.push('Home'))
            //navigation.dispatch(StackActions.popToTop());
            navigation.navigate('Feedback')

            //navigation.navigate('Feedback')
        }

    }, [returnHome])

    return (
        <Tab.Navigator>
            <Tab.Screen name="Delivery" options={{ headerShown: false }}>
                {(props) => <GetZipCode setZipCode={setZipCode} zipCode={zipCode}
                    setSelectedDay={setSelectedDay} selectedDay={selectedDay}/>}
            </Tab.Screen>
            <Tab.Screen name="Delivery Address" options={{ headerShown: false }}>
                {(props) => <GetDeliveryAddy zipCode={zipCode} selectedDay={selectedDay}
                    setDeliveryAddress={setDeliveryAddress} deliveryAddress={deliveryAddress}/>}
            </Tab.Screen>
            <Tab.Screen name="Billing Address" options={{ headerShown: false }}>
                {(props) => <GetBillingAddy selectedDay={selectedDay} deliveryAddress={deliveryAddress}
                setBillingAddress={setBillingAddress} billingAddress={billingAddress}/>}
            </Tab.Screen>
            <Tab.Screen name="Payment" options={{ headerShown: false }}>
                {(props) => <Payment selectedDay={selectedDay} deliveryAddress={deliveryAddress}
                billingAddress={billingAddress} setToken={setToken} token={token}/>}
            </Tab.Screen>
            <Tab.Screen name="Place Order" options={{ headerShown: false }}>
                {(props) => <PlaceOrder selectedDay={selectedDay} deliveryAddress={deliveryAddress}
                billingAddress={billingAddress} token={token} product={product} setReturnHome={setReturnHome} 
                {...props}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default OrderScreen;