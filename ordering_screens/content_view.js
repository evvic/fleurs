import React from 'react'
import { View, Text } from 'react-native'
//import { WebView } from 'react-native-webview'

//"https://jstest.authorize.net/v1/Accept.js"

const styles = {
    container: {
        flex: 1
    },
}

console.log("inside content view!")


const ContentView = () => (
    <View style={styles.container}>
        {/* <WebView source={{ uri: "https://google.com"}} /> */}
        <Text>WebView</Text>
    </View>
)   

export default ContentView