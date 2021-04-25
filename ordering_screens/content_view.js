import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

//"https://jstest.authorize.net/v1/Accept.js"

const styles = {
    container: {
        flex: 1
    },
}

/* inside HTML <head>
<script type="text/javascript"
    src="${props.authorizeData.AUTHORIZENET_URL}"
    charset="utf-8">
</script>
*/

const ContentView = (props) => { 

    const js = `
        window.ReactNativeWebView.postMessage("1. inside js string")

        //ATTEMPT CREATING A DYNAMIC SCRIPT SRC

        var scr = document.createElement('script');
        var myurl = '${props.authorizeData.AUTHORIZENET_URL}'
        scr.setAttribute('src',myurl);
        window.ReactNativeWebView.postMessage("2. created script src attribute")

        document.head.appendChild(scr); 
        window.ReactNativeWebView.postMessage("3. appended script src to head")

        //END ATTEMPT 

        function TokenResponse(response) {

            window.ReactNativeWebView.postMessage(JSON.stringify(response))

            if (response.messages.resultCode === "Error") {
                var i = 0;
                while (i < response.messages.message.length) {
                    //changed from console.log
                    window.ReactNativeWebView.postMessage(
                        response.messages.message[i].code + ": " +
                        response.messages.message[i].text
                    );
                    //log(response.messages.message[i].code + ": " + response.messages.message[i].text)
                    i = i + 1;
                }
            }
            else {
                let nonce = response.opaqueData.dataValue
                window.ReactNativeWebView.postMessage("nonce: " + nonce)
            }
        }

        //src="${props.authorizeData.AUTHORIZENET_URL}"
        //src="https://jstest.authorize.net/v1/Accept.js"
        
        let authData = {
            clientKey: "${props.authorizeData.AUTHORIZENET_KEY}",
            apiLoginID: "${props.authorizeData.USERNAME}"
        }

        let cardData = {
            cardNumber: "4242424242424242",
            month: "01",
            year: "2022",
            cardCode: "111"
        }

        //combine cardData & authData
        let secureData = {
            authData: authData,
            cardData: cardData
        }

        window.ReactNativeWebView.postMessage("at set Timeout")
        setTimeout(() => {Accept.dispatchData(secureData, TokenResponse)}, 30000)
        //Accept.dispatchData(secureData, TokenResponse)
    `

    const HTML = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>WebView</title>
    </head>
    
    <body>

        <h1>I LOVE MILLA</h1>

        <script type="text/javascript">

            //ATTEMPT CREATING A DYNAMIC SCRIPT SRC

            var scr = document.createElement('script');
            var myurl = '${props.authorizeData.AUTHORIZENET_URL}'
            scr.setAttribute('src',myurl);
        
            document.head.appendChild(scr);

            //END ATTEMPT 

            function TokenResponse(response) {

                window.ReactNativeWebView.postMessage(JSON.stringify(response))

                if (response.messages.resultCode === "Error") {
                    var i = 0;
                    while (i < response.messages.message.length) {
                        //changed from console.log
                        window.ReactNativeWebView.postMessage(
                            response.messages.message[i].code + ": " +
                            response.messages.message[i].text
                        );
                        //log(response.messages.message[i].code + ": " + response.messages.message[i].text)
                        i = i + 1;
                    }
                }
                else {
                    let nonce = response.opaqueData.dataValue
                    window.ReactNativeWebView.postMessage("nonce: " + nonce)
                }
            }

            //src="${props.authorizeData.AUTHORIZENET_URL}"
            //src="https://jstest.authorize.net/v1/Accept.js"
            
            let authData = {
                clientKey: "${props.authorizeData.AUTHORIZENET_KEY}",
                apiLoginID: "${props.authorizeData.USERNAME}"
            }

            let cardData = {
                cardNumber: "4242424242424242",
                month: "01",
                year: "2022",
                cardCode: "111"
            }

            //combine cardData & authData
            let secureData = {
                authData: authData,
                cardData: cardData
            }

            setTimeout(() => {Accept.dispatchData(secureData, TokenResponse)}, 30000)
            //Accept.dispatchData(secureData, TokenResponse)            
        </script>
    </body>
    </html>`
    
    return (
        <View style={{ height: 150, width: 150,overflow:'hidden' }}>
            <Text>WebView below</Text>
            <WebView 
                useWebKit={true} //iOS performance
                //originWhitelist={['*']}
                javaScriptEnabled={true}
                //source={{ html: HTML}}
                source={{ uri:"https://www.google.com/"}}
                style={{ marginTop: 20 }}
                //onLoad={this._onLoadEnd.bind(this)}
                onMessage={event => {
                    console.log(event.nativeEvent.data);
                }}
                //testing 
                injectedJavaScript={js}
                //onNavigationStateChange={(navEvent)=> console.log(navEvent.jsEvaluationValue)}
                mixedContentMode={"always"}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
            />
            <Text>WebView above</Text>
        </View>)   

    
}

export default ContentView