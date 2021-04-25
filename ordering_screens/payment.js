import React, { useState } from "react";
import { StyleSheet, Text, View, UIManager, Button, WebView } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import moment from 'moment'
import ContentView from './content_view.js'

//npm i react-native-keyboard-aware-scroll-view --save
//^ important to make forms easier to fill
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//npm install react-native-paper
import { TextInput } from 'react-native-paper';

function Payment(props) {
    const [loading, setLoading] = useState(true)
    const [authorizeData, setAuthorizeData] = useState({})

    React.useEffect(() => {
        // this is called when the component is mounted

        setLoading(true) //when project mounts, start loading process

        LoadAuthData()    //when token is created, loading is done
   
        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
            
        };
    }, [])

    async function LoadAuthData() {
        let keyObj = await GetKey()

        console.log('keyObj', keyObj)
        setAuthorizeData(keyObj)

        let authData = await {
            clientKey: keyObj.AUTHORIZENET_KEY,
            apiLoginID: keyObj.USERNAME
        }
        //console.log('authData', authData)

        setLoading(false)

    }

    return (
        <View>
            <Text>IN BILLING</Text>
            <Text>{props.deliveryAddress.name}</Text>
            
            {(loading)?
                <Text>Loading...</Text>
            :
                <ContentView test={7} authorizeData={authorizeData} {...props}/>
            }
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

export default Payment;