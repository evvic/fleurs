import * as React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import { username, password, auth } from './../API_KEY.js'

//ordering compnents
import GetZipCode from '../components/get_zip_code.js'

function OrderScreen({ route, navigation }) {
    //get params. If none were passed, inital ones will be used
    const { product } = route.params;
    const [cartItems, setCartItems] = React.useState([])
    var [zipCode, setZipCode] = React.useState()

    React.useEffect(() => {

    }, [])

    /*
    In this one screen maybe have a component for each sttep of the payment 
    process that toggles to the next when each is completed


    */

    return (
        <View>
            <Text>Ordering Page {product.NAME}</Text> 
            <GetZipCode setZipCode={setZipCode} zipCode={zipCode} />
         </View>
    );
}

export default OrderScreen;