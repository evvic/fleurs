import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

//"https://jstest.authorize.net/v1/Accept.js"

const styles = {
    container: {
        flex: 1
    },
}

const HTML = `
<script type="text/javascript"
    src="https://jstest.authorize.net/v1/Accept.js"
    charset="utf-8">
</script>

<script>
    var swag = 7
    
    window.ReactNativeWebView.postMessage("Hello!")
    
</script>

`

//style = styles.container

console.log("inside content view!")


const ContentView = (props) => { 
    
    
    return (
        <View style={{ height: 150, width: 150,overflow:'hidden' }}>
            <Text>WebView below</Text>
            <WebView 
                originWhitelist={['*']}
                javaScriptEnabled={true}
                source={{ html: HTML}}
                style={{ marginTop: 20 }}
                onMessage={event => {
                    alert(event.nativeEvent.data);
                }}
            />
            <Text>WebView above</Text>
        </View>
)   
}

export default ContentView