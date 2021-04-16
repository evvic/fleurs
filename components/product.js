import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Card,  } from 'react-native-elements' //npm install react-native-elements
import { username, password, auth } from '../API_KEY.js'
import { styles } from './product_style.js'; //CSS equivalent

//https://github.com/WrathChaos/react-native-apple-card-views
//npm i react-native-apple-card-views //has 3 dependencies
//import { AppleCard } from 'react-native-apple-card-views'

function Product(props) {
    const navigation = useNavigation(); //navigation hook
    let [iconimg, setIconimg] = useState(null)  //weather icon description

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("Product mounted")

        //anything returned happens when component is unmounted
        return () => {
            console.log("unmounted")
        };
    }, [])

    let Image_Http_URL ={ uri: props.obj.LARGE};
    console.log(Image_Http_URL)

    return (
        <View style={styles.container}>
            <View className="flower-pot" style={styles.flower_pot}>
                <View className="flower-icon">
                    <Image source={Image_Http_URL}
                        //image NEEDS width and height style
                        style={{width:400, height:400}}  
                    />
                </View>
                <Text>{props.obj.NAME}</Text>
                <Text>${props.obj.PRICE}</Text>
                <Button
                    title="Buy"
                    onPress={() => navigation.navigate('Cart')}
                />
                <Text>{props.obj.DESCRIPTION}</Text>
            </View>
        </View>
    );
}
//basic view that works 
{/*  */}

//Ugly Card
{/* <Card>
    <Card.Title>{props.obj.NAME}</Card.Title>
    <Card.Divider/>
    <div className="flower-icon">
        <img style={{width:'200px'}} src= {props.obj.LARGE} />
    </div>
</Card> */}

export default Product;