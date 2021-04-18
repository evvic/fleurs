import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';

//npm install --save reinput
//import Reinput from "reinput" //broken

//npm install react-native-input-style --save
import Input from 'react-native-input-style';   //broken

//npm install react-native-masked-text --save
import { TextInputMask } from 'react-native-masked-text'

//npm install react-native-paper
import { TextInput } from 'react-native-paper';

/*
    NEXT ADD CALENDAR
*/

function GetZipCode(props) {
    let [loaded, setLoaded] = useState(false)
    let [product, setProduct] = useState({})

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("zip code changing")
        
        if(props.zipCode && props.zipCode.toString().length == 5) {
            console.log("zip code has 5 nums")
            GetDeliveryDates(props.zipCode)
        }

        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [props.zipCode])

    return (
        <View>
            <Text>Enter delivery ZIP code: </Text>
            
            <TextInput style={{width:"60%"}}
                label="ZIP code"
                value={props.zipCode}
                keyboardType = 'numeric'
                //regex replace removes anything non numeric from string input
                onChangeText={text => props.setZipCode(text.replace(/\D/g,''))}
                maxLength={5}
            />

            {(props.zipCode && props.zipCode.toString().length == 5)?
            <Text>CALENDAR HERE</Text>
        :
        <></>}
        </View>
    );
}

var api = axios.create({
    baseURL: 'https://www.floristone.com/api/rest',
    timeout: 2000,
    headers: {'Authorization': `Basic ${auth}`}
});

async function GetDeliveryDates(zip) {
    let url = `/flowershop/checkdeliverydate?zipcode=${zip}`

    const data = await api.get(url)
    const obj = await data.data

    console.log(obj)
    //let temp = await obj.PRODUCTS[0]
    return obj
}

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

export default GetZipCode;