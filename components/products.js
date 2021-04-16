import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, FlatList, Button} from "react-native";

import { username, password, auth } from '../API_KEY.js'
import Product from "./product.js";


function Products(props) {
    let [flowers, setFlowers] = useState([])    //array of flowers
    let [total, setTotal] = useState(0)         //number of flowers

    async function parseProducts() {
        console.log("parseProducts")
        /* JSON PRODUCT OPTIONS */
        console.log("products category: " + props.category)
        let category = props.category
        let count = 12
        let start = 1
        let url = `https://www.floristone.com/api/rest/flowershop/getproducts?category=${category}&count=${count}&start${start}`

        const options = {
            headers: {
              Authorization: `Basic ${auth}`
            }
        }
        
        const data = await fetch(url, options) 
        const obj = await data.json()
        if("errors" in obj) {
            console.log("ERROR CAUGHT")
            return {NAME: "error", DESCRIPTION: obj.errors}
        }
        else {
            //return object array of products
            total = await obj.total
            let temp = obj.PRODUCTS
            return temp
        }        
    }  

    async function purgatory() {
        let arr = await parseProducts()
        setFlowers(arr)
    }

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("mounted");
        purgatory()

        //anything returned happens when component is unmounted
        return () => {
            console.log("unmounted")
        };
    }, [props])

    return (
        <View > 
            <Text>Products</Text>
            <FlatList 
                //style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 0}}
                data={flowers}
                renderItem={({item}) => <Product obj={item} />}
            />
        </View>
    );
}

export default Products;