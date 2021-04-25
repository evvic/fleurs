import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

//how to reset to previous commit: https://stackoverflow.com/a/59654694

/* inside HTML <head>
<script type="text/javascript"
    src="${props.authorizeData.AUTHORIZENET_URL}"
    charset="utf-8">
</script>
*/

const ContentView = (props) => { 

    const js = `
        //ATTEMPT CREATING A DYNAMIC SCRIPT SRC

        var scr = document.createElement('script');
        var myurl = '${props.authorizeData.AUTHORIZENET_URL}'
        scr.setAttribute('src',myurl);

        document.head.appendChild(scr); 

        //END ATTEMPT 

        function TokenResponse(response) {

            //window.ReactNativeWebView.postMessage(JSON.stringify(response))

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

    
    return (
        /* WebView should be hidden. View style has opacity of 0*/
        /* making the dimensions (width & height) very small as well*/
        <View style={{ height: 5, width: 50, overflow:'hidden', opacity:0 }}>
            <WebView 
                useWebKit={true} //iOS performance
                javaScriptEnabled={true}
                source={{ uri:"https://www.google.com/"}}
                //onLoad={this._onLoadEnd.bind(this)}
                onMessage={event => {
                    console.log(event.nativeEvent.data);
                }}
                //testing 
                injectedJavaScript={js}
                //onNavigationStateChange={(navEvent)=> console.log(navEvent.jsEvaluationValue)}
                mixedContentMode={"always"}
                //allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
            />
        </View>)   

    
}

export default ContentView