import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

//"https://jstest.authorize.net/v1/Accept.js"

const styles = {
    container: {
        flex: 1
    },
}

console.log("inside content view!")


const ContentView = () => (
    <View style={styles.container}>
        <WebView source={{ uri: "https://google.com"}} />
    </View>
)   

export default ContentView