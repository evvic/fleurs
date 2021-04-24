import React, { useState } from "react";
import { StyleSheet, Text, View, UIManager, Button, WebView } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import moment from 'moment'
import ContentView from './content_view.js'

//npm install react-native-authorize-net --legacy-peer-deps             //uninstalled
//npm install react-native-reliantid-authorize-net --legacy-peer-deps   //uninstalled

//npm i react-native-keyboard-aware-scroll-view --save
//^ important to make forms easier to fill
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//npm i --save react-native-credit-card-input
//import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input"; //uninstalled
// Note: You'll need to enable LayoutAnimation on android to see LiteCreditCardInput's animations
//UIManager.setLayoutAnimationEnabledExperimental(true)

//npm install react-native-paper
import { TextInput } from 'react-native-paper';


function GetBilling(props) {

    React.useEffect(() => {
        // this is called when the component is mounted

        CreateToken()
   
        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [])

    async function CreateToken() {
        let keyObj = await GetKey()
        console.log('keyObj', keyObj)

        console.log('Accept URL', keyObj.AUTHORIZENET_URL)
        //const ACCEPTJS = require(keyObj.AUTHORIZENET_URL)
        //const ACCEPTJS = await import(keyObj.AUTHORIZENET_URL)
        //const Accept = import('authorizenet')

        let authData = await {
            clientKey: keyObj.AUTHORIZENET_KEY,
            apiLoginID: keyObj.USERNAME
        }
        console.log('authData', authData)

        //are all strings
        let cardData = await {
            cardNumber: "4242424242424242",
            month: "01",
            year: "2022",
            cardCode: "111"
        }
        console.log('cardData', cardData)

        let secureData = await {
            authData: authData,
            cardData: cardData
        }
        console.log('secureData', secureData)

        let keys = await {
            LOGIN_ID: keyObj.USERNAME,
            CLIENT_KEY: keyObj.AUTHORIZENET_KEY,
            CARD_NO: "4242424242424242",
            EXPIRATION_MONTH: "01",
            EXPIRATION_YEAR: "2022",
            CVV_NO: "111"
        }

        //Accept.dispatchData(secureData, TokenResponse)
    }

    return (
        <View>
            {/* <Text>IN BILLING</Text>
            <Text>{props.deliveryAddress.name}</Text> */}
            <ContentView />
            
        </View>
    );
}

async function TokenResponse(response) {
    console.log("inside TokenResponse()")
    console.log(response)
    if (response.messages.resultCode === "Error") {
        var i = 0;
        while (i < response.messages.message.length) {
            console.log(
                response.messages.message[i].code + ": " +
                response.messages.message[i].text
            );
            i = i + 1;
        }
    }
    //nonce = response.opaqueData.dataValue
    //receive the payment nonce in the dataValue element of the opaqueData object.
    // the nonce is only valid for 15 minutes
}

async function GetKey() {
    let url = `/flowershop/getauthorizenetkey`

    const data = await api.get(url)
    const obj = await data.data

    console.log("GetKey")
    console.log(obj)

    return obj
}

var api = axios.create({
    baseURL: 'https://www.floristone.com/api/rest',
    timeout: 2000,
    headers: {'Authorization': `Basic ${auth}`}
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderWidth: 5,
        borderColor: '#777',
        color: '#000',
        justifyContent: 'center',
        flex: 1,
        width: '50%',
        height: 80,
        marginTop: 20
    }
});

export default GetBilling;