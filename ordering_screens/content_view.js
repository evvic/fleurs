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

        /*  var scr = document.createElement('script');
        var myurl = '${props.authorizeData.AUTHORIZENET_URL}'
        scr.setAttribute('src',myurl);

        document.head.appendChild(scr);  */

        //END ATTEMPT 

        //LOADS LIBRARY & WAITS TILL LOADED
        async function loadScript(source, charset) {
            window.ReactNativeWebView.postMessage("loadScript()")
            let script = document.createElement('script');
            script.setAttribute('src', source);
            if (charset) {
              script.setAttribute('charset', charset);
            }
          
            let onLoad = null;
            let onError = null;
            try {
              return await new Promise((resolve, reject) => {
                onLoad = e => resolve(e);
                onError = e => reject(e);
                script.addEventListener('load', onLoad);
                script.addEventListener('error', onError);
                document.head.appendChild(script);
              });
            } finally {
              if (onLoad) {
                script.removeEventListener('load', onLoad);
              }
              if (onError) {
                script.removeEventListener('error', onError);
              }
            }
        }
        
        //FINISHES WHEN FUNCTIONS ARE LOADED
        async function loadAcceptApi() {

            if (typeof Accept != 'undefined') {
              return;
            }
          
            let onHandshake = null;
            try {
                // Accept.js loads AcceptCore.js, so we have to wait for the
                // "handshake" event that AcceptCore.js emits after loading.
                let handshake = new Promise(resolve => {
                    window.ReactNativeWebView.postMessage("inside promise")
                    onHandshake = () => resolve();
                    document.body.addEventListener('handshake', onHandshake);
                });
          
              // Wait for script load and handshake.
              window.ReactNativeWebView.postMessage("waiting for response")
              await Promise.all([loadScript('${props.authorizeData.AUTHORIZENET_URL}', 'utf-8'), handshake]);
            } finally {
                if (onHandshake) {
                    document.body.removeEventListener('handshake', onHandshake);
                }
            }
          }

        //CALLBACK FUNCTION
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
                    i = i + 1;
                }
            }
            else {
                let nonce = response.opaqueData.dataValue
                window.ReactNativeWebView.postMessage("nonce: " + nonce)
            }
        }
        
        async function getNonce() {
            await loadAcceptApi();
            window.ReactNativeWebView.postMessage("library loaded")

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

            window.ReactNativeWebView.postMessage("at Accept.dispatch")
            //setTimeout(() => {Accept.dispatchData(secureData, TokenResponse)}, 30000)
            Accept.dispatchData(secureData, TokenResponse)
        }

        //call getNonce which will async get call abck and make sure library is running
        getNonce()
    `

    
    return (
        /* WebView should be hidden. View style has opacity of 0*/
        /* making the dimensions (width & height) very small as well*/
        <View style={{ height: 5, width: 50, overflow:'hidden', opacity:1 }}>
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

async function loadAcceptApi() {
    if (typeof Accept != 'undefined') {
      return;
    }
  
    let onHandshake = null;
    try {
      // Accept.js loads AcceptCore.js, so we have to wait for the
      // "handshake" event that AcceptCore.js emits after loading.
      let handshake = new Promise(resolve => {
        onHandshake = () => resolve();
        document.body.addEventListener('handshake', onHandshake);
      });
  
      // Wait for script load and handshake.
      await Promise.all([loadScript('https://jstest.authorize.net/v1/Accept.js', 'utf-8'), handshake]);
    } finally {
      if (onHandshake) {
        document.body.removeEventListener('handshake', onHandshake);
      }
    }
  }

export default ContentView