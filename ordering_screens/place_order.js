import React, { useState } from "react";
import { useNavigation, StackActions } from '@react-navigation/native'; 
import { Text, View, ScrollView, Button, Image, ActivityIndicator } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import { styles } from '../styles/global.js'; //CSS equivalent

function PlaceOrder(props) {
    const navigation = useNavigation(); //navigation hook
    var [success, setSuccess] = useState(false)
    var [loading, setLoading] = useState(false)
    var [submitted, setSubmitted] = useState(false)

    var goingBack = false

    let Image_Http_URL = { uri: props.product.LARGE };

    React.useEffect(() => {
        // this is called when the component is mounted
        //if(success) goingBack = true;

        navigation.addListener('beforeRemove', (e) => {
            console.log("going back = " + goingBack)
            if(!success) return;

            // Prevent default behavior of leaving the screen
            if(!goingBack) {
                e.preventDefault();
                console.log("preventing default action")
                goingBack = true
                navigation.dispatch(StackActions.popToTop());
            }
            else {
                console.log("going back is true i guess")
                props.setReturnHome(true)
            }
        })
        
        //anything returned happens when component is unmounted
        return () => {
            console.log("place order unmounted")
        };
    }, [navigation, success])

    async function Processing() {
        setSubmitted(true)
        setLoading(true)
        let thing = await CreateObject(props)
        console.log("obj start")
        console.log(JSON.stringify(thing))
        //console.log("obj end")

        let resp = await SendPayment(thing) 
        //this function sends thru API and get responce

        if('ORDERTOTAL' in resp) await RemoveItemFromCart(props.CartID, props.product.CODE)

        setLoading(false)

        if('ORDERTOTAL' in resp) setSuccess(true)
    }

    

    return (
        <ScrollView>
            <View style={styles.paymentCard}>
                <View style={styles.paymentCardContentsWrap }>
                    <View style={styles.paymentCardLeftSide }>
                        <Image
                            source={Image_Http_URL} 
                            style={{width: '80%', aspectRatio: .8}}
                            imageStyle={{borderRadius: 20}}
                        />
                    </View>
                    <View style={styles.paymentCardRightSide }>
                        <View style={styles.paymentCardView }>
                            <Text style={styles.paymentCardText}>{props.product.NAME}</Text>
                        </View>
                        <View style={styles.paymentCardView }>
                            <Text style={styles.paymentCardTextSubtle}>Sub-total: ${props.product.PRICE}</Text>
                            <Text style={styles.paymentCardTextSubtle}>Shipping: ${14.99}</Text>
                            <Text style={styles.paymentCardTextSubtle}>Total: ${props.product.PRICE + 14.99}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardContent}>            
                    <View >
                        <Text style={styles.paymentCardText}>Delivery</Text>
                        <Text style={styles.paymentCardText}>{props.selectedDay}</Text>
                        <Text style={{fontSize: 18}}>{props.deliveryAddress.name}</Text>
                        <Text style={{fontSize: 18}}>{PhormatPhone(props.deliveryAddress.phone)}</Text>
                        {(props.deliveryAddress.institution != "")?
                        <Text style={{fontSize: 18}}>{props.deliveryAddress.institution}</Text>
                        :<></>}
                        <Text style={{fontSize: 18}}>{props.deliveryAddress.address1}</Text>
                        {(props.deliveryAddress.address2 != "")?
                        <Text style={{fontSize: 18}}>{props.deliveryAddress.address2}</Text>
                        :<></>}
                        <Text style={{fontSize: 18}}>{props.deliveryAddress.city}, {props.deliveryAddress.state.toUpperCase()} {props.deliveryAddress.zip}</Text>
                    </View>
                    <View style={styles.bottomBorder}></View>
                    <View>
                        <Text style={styles.paymentCardText}>Billing</Text>
                        <Text style={{fontSize: 18}}>{props.billingAddress.name}</Text>
                        <Text style={{fontSize: 18}}>{PhormatPhone(props.billingAddress.phone)}</Text>
                        <Text style={{fontSize: 18}}>{props.billingAddress.email}</Text>
                        <Text style={{fontSize: 18}}>{props.billingAddress.address1}</Text>
                        {(props.billingAddress.address2 != "")?
                        <Text style={{fontSize: 18}}>{props.billingAddress.address2}</Text>
                        :<></>}
                        <Text style={{fontSize: 18}}>{props.billingAddress.city}, {props.billingAddress.state.toUpperCase()} {props.billingAddress.zip}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    {(submitted)?
                    <>
                        {(loading)?
                        <>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.header_text}>Placing order...</Text>
                        </>
                        :
                        <>
                            {(success)?
                            <>
                                <Text style={styles.paymentCardText}>🌷 Success!</Text>
                                <Text style={styles.paymentCardText}>🌹 Order has been "placed"!</Text>
                                <View style={styles.chillCard}>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.paymentCardText}>🥀 No payment or flowers will be transacted as the app is still in testing.</Text>
                                    </View>
                                </View>
                            </>
                            :
                            <>
                                <Text>Order placement failed</Text>
                            </>
                            }
                        </>}
                    </>
                    :
                    <>
                        <Button
                            onPress={() => {Processing()}} 
                            title="Place Order"
                            color="#9AC791" //green 
                        />
                    </>}
                    
                </View>
            </View>
        </ScrollView>
    );
}

async function SendPayment(obj) {
    let url = `/flowershop/placeorder`
    //POST

    var api = axios.create({
        baseURL: 'https://www.floristone.com/api/rest',
        headers: {'Authorization': `Basic ${auth}`},
    })

    console.log("SendPayment")

    /*
    When posting to API to get results, I get error code 400.
    The more specific error can be found under error.response.
    error.response.data is the HTML to display a webpage showing
    the actual error.
    */

    const data = await api.post(url, JSON.stringify(obj))
        .catch(error => {
            //console.log(error)
            if (error.response){
                //console.log(error.response.data)                
            } else if(error.request) {
                //console.log(error.request)
            } else if(error.message) {
                //console.log(error.message)
            }
        })

    /* console.log(data)
    const parsed = await data.data
    console.log(parsed) */

    //temp method

    const parsed = {
        "SUBTOTAL": obj.ordertotal - 15,
        "FLORISTONETAX": 3.85,
        "ORDERTOTAL": obj.ordertotal,
        "ORDERNO": 891644858,
        "TAXTOTAL": 3.85,
        "DISCOUNT": 0,
        "FLORISTONEDELIVERYCHARGE": 14.99,
        "DELIVERYCHARGETOTAL": 14.99
    }

    console.log(parsed)

    return parsed
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

async function CreateObject(props) {
        return {
        customer: {
            ZIPCODE: parseInt(props.billingAddress.zip),
            PHONE: parseInt(props.billingAddress.phone),
            ADDRESS2: props.billingAddress.address2,
            STATE: props.billingAddress.state,
            ADDRESS1: props.billingAddress.address1,
            NAME: props.billingAddress.name,
            COUNTRY: "US",
            IP: "1.1.1.1",
            EMAIL: props.billingAddress.email,
            CITY: props.billingAddress.city,
        },
        products: [
            {
                PRICE: parseInt(props.product.PRICE),
                CARDMESSAGE: "To my dear beloved.",
                RECIPIENT: {
                    ZIPCODE: parseInt(props.deliveryAddress.zip),
                    PHONE: parseInt(props.deliveryAddress.phone),
                    ADDRESS2: props.deliveryAddress.address2,
                    STATE: props.deliveryAddress.state,
                    ADDRESS1: props.deliveryAddress.address1,
                    NAME: props.deliveryAddress.name,
                    COUNTRY: "US",
                    INSTITUTION: props.deliveryAddress.institution,
                    CITY: props.deliveryAddress.city
                },
                DELIVERYDATE: props.selectedDay,
                CODE: props.product.CODE
            }
        ],
        ccinfo: {
            AUTHORIZENET_TOKEN: props.token
        },
        ordertotal: parseInt(props.product.PRICE) + 15
    }
}

function PhormatPhone(num) {
    return `+1 (${num.slice(0,3)}) ${num.slice(3,6)}-${num.slice(6)}`
}

export default PlaceOrder;