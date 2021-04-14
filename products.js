import React, { useState } from "react";
import { Text, View, Button} from "react-native";

function Products() {

    let [iconimg, setIconimg] = useState(null)  //weather icon description

    async function parseProducts() {
        console.log("parseProducts")
        let url = `https://www.floristone.com/api/rest/flowershop/getproducts?category=lr`
        
        const username = "386866" //API key
        const password = "ENXg1E" //API password
        const auth = btoa(`${username}:${password}`) //base64 encode given string

        const options = {
            headers: {
              Authorization: `Basic ${auth}`
            }
        }
        
        const data = await fetch(url, options) 
        const obj = await data.json()
        console.log(obj)
    }  

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("mounted");
        parseProducts()

        //anything returned happens when component is unmounted
        return () => {
            console.log("unmounted")
        };
    }, [])

    return (
        <View>
            <Text>Products</Text>
        </View>
    );
}

export default Products;