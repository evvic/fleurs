import React, { useState } from "react";
import { Text, View, Button} from "react-native";
import "./product.css";

import { username, password, auth } from '../API_KEY.js'

function Product(props) {

    let [iconimg, setIconimg] = useState(null)  //weather icon description

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("Product mounted")
        console.log(props.obj)

        //anything returned happens when component is unmounted
        return () => {
            console.log("unmounted")
        };
    }, [])

    return (
        <View >
            <div className="flower-pot">
                <div className="flower-icon">
                    <img style={{width:'200px'}} src= {props.obj.LARGE} />
                </div>
                <Text>{props.obj.NAME}</Text>
                <p>${props.obj.PRICE}</p>
                <p>{props.obj.DESCRIPTION}</p>
            </div>
        </View>
    );
}

export default Product;