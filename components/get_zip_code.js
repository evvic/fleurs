import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { styles } from './product_style.js'; //CSS equivalent
import axios from 'axios';

//npm install react-native-masked-text --save
import { TextInputMask } from 'react-native-masked-text'

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
        <View style={styles.container}>
            <Text>Enter delivery ZIP code: </Text>
            <TextInputMask
                type={'custom'}
                options={{
                    mask: '99999',
                }}
                value={props.zipCode}
                onChangeText={text => props.setZipCode(text)}
            />
            {(props.zipCode && props.zipCode.toString().length == 5)?
            <Text>CALENDAR HERE</Text>
        :
        <></>}
        </View>
    );
}

async function GetDeliveryDates(zip) {
    
}


export default GetZipCode;