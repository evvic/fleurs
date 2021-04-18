import * as React from 'react';
import { View, Text, Button } from 'react-native';

function CartScreen({ route, navigation }) {
    //get params. If none were passed, inital ones will be used
    const { itemId, CartID } = route.params;

    console.log("cart screen id: " + CartID)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Cart</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(CartID)}</Text>
        <Button
        title="Go to Cart"
        onPress={() => navigation.push('Cart', {
            itemId: 69,
            otherParam: 'how to pass data to another screen',
        })}
        //navigation.push creates a new page (can make duplicates)
        //navigation.navigate goes to the page
      />
      
      </View>
    );
}

export default CartScreen;