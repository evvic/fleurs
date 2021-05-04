import React, { useState } from "react";
import { StyleSheet, Text, View, UIManager, Button, WebView } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import { styles } from '../styles/global.js'; //CSS equivalent

//npm install react-native-paper
import { TextInput } from 'react-native-paper';

function PlaceOrder(props) {

    React.useEffect(() => {
        // this is called when the component is mounted
        
        //anything returned happens when component is unmounted
        return () => {
            console.log("payment unmounted")
        };
    }, [])

    return (
        <>
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>PLACE ORDER</Text>

                <Text>{props.product.NAME} {props.product.PRICE}</Text>
                <Text>{props.deliveryAddress.address1}</Text>
                <Text>{props.deliveryAddress.city}, {props.deliveryAddress.state.toUpperCase()} {props.deliveryAddress.zip}</Text>
                <Text>token: {props.token}</Text>
            </View>
        </View>
        <Text style={styles.header_text}>Swipe up to submit</Text>
        </>
    );
}

var api = axios.create({
    baseURL: 'https://www.floristone.com/api/rest',
    timeout: 2000,
    headers: {'Authorization': `Basic ${auth}`}
});

export default PlaceOrder;