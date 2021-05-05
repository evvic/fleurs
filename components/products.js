import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, FlatList, Button} from "react-native";

import { username, password, auth } from '../API_KEY.js'
import Product from "./product.js";

//card cmponent
//https://github.com/WrathChaos/react-native-header-view

function Products(props) {
    let [flowers, setFlowers] = useState([])    //array of flowers
    let [total, setTotal] = useState(0)         //number of flowers
    let [error, setError] = useState(null)      //error fetching

    async function parseProducts() {
        //console.log("parseProducts")
        /* JSON PRODUCT OPTIONS */
        //console.log("products category: " + props.category)
        
        console.log("beginning: " + props.loadedProducts)

        let category = props.category
        let count = (category == "any")? 200 : 50
        let start = 1
        let url = `https://www.floristone.com/api/rest/flowershop/getproducts?category=${category}&count=${count}&start=${start}`

        if(props.sorttype != null) {
            let sorttype = props.sorttype
            url = url + `&sorttype=${sorttype}`
        }

        const options = {
            headers: {
              Authorization: `Basic ${auth}`
            }
        }
        
        const data = await fetch(url, options) 
        const obj = await data.json()

        props.setLoadedProducts(true) //products have not loaded yet
        

        if("errors" in obj) {
            console.log("ERROR CAUGHT")
            setError(obj.errors)
            
            return {NAME: "error", DESCRIPTION: obj.errors}

        }
        else {
            //return object array of products
            total = await obj.total
            let temp = obj.PRODUCTS
            
            setError(null)
            return temp
        }        
    }  

    async function purgatory() {
        props.setLoadedProducts(false) //products have not loaded yet
        let arr = await parseProducts()
        setFlowers(arr)
        console.log("ending: " + props.loadedProducts)
    }

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("mounted");
        purgatory()

        //anything returned happens when component is unmounted
        return () => {
            console.log("unmounted")
        };
    }, [props.category, props.sorttype])

    return (
        <View > 
            {/* <Text>Products {props.sessionid}</Text> */}
            {(!error)?
            <FlatList 
                //style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 0}}
                style={{paddingVertical: 80}}
                data={flowers}
                renderItem={({item}) => <Product obj={item} sessionid={props.sessionid}/>}
            />
            :   
            <View style={{paddingTop: '60%'}}>
                <Text style={{textAlign: 'center'}}>Error retrieving products: {error}</Text>
            </View>
            }
            
        </View>
    );
}

export default Products;