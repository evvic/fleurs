import { username, password, auth } from './API_KEY.js'

export async function returnCategories() {
    //just get one value and grab the categories
    let count = 1
    let url = `https://www.floristone.com/api/rest/flowershop/getproducts?count=${count}`

    const options = {
        headers: {
          Authorization: `Basic ${auth}`
        }
    }

    const data = await fetch(url, options) 
    const obj = await data.json()
    console.log("inside geting categories")
    console.log(obj.PRODUCTS[0].CATEGORIES)
    
    //parse the array of categories
    let cats = await obj.PRODUCTS[0].CATEGORIES
    return cats
}