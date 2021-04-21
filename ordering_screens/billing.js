import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import moment from 'moment'

//npm i react-native-keyboard-aware-scroll-view --save
//^ important to make forms easier to fill
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//npm install formik
import { Formik } from 'formik';

//npm install yup ~ form input validation
import * as yup from 'yup'

//npm install react-native-paper
import { TextInput } from 'react-native-paper';


function GetBilling(props) {

    React.useEffect(() => {
        // this is called when the component is mounted
   
        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [])

    return (
        <KeyboardAwareScrollView>
            <Text>IN BILLING</Text>
            <Text>{props.deliveryAddress.name}</Text>
        </KeyboardAwareScrollView>
    );
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