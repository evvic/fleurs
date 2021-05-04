import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, Text, View, UIManager, Button, WebView, ActivityIndicator } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import moment from 'moment'
import ContentView from './content_view.js'
import { styles } from '../styles/global.js'; //CSS equivalent

//npm i react-native-keyboard-aware-scroll-view --save
//^ important to make forms easier to fill
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//credit card info library:
//https://dev.to/halilb/react-native-animated-credit-card-library-1na6

//npm install react-native-paper
import { TextInput } from 'react-native-paper';
import { Formik } from "formik";
import * as yup from 'yup'

const ReviewSchema = yup.object({
    name: yup.string().required().min(1),
    number: yup.string().required().length(16).matches(/^\d+$/, "must be all digits"),
    //month: yup.string().required().max(2).matches(/^\d+$/, "must be all digits"),
    //year: yup.string().required().length(4).matches(/^\d+$/, "must be all digits"),
    CVC: yup.string().required().length(3).matches(/^\d+$/, "must be all digits"),
    date: yup.string().required().length(7)
})

function Payment(props) {
    const navigation = useNavigation(); //navigation hook

    const [loading, setLoading] = useState(true)
    const [completed, setCompleted] = useState(false)
    const [authorizeData, setAuthorizeData] = useState({})
    var [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        month: "",
        year: "",
        cardCode: ""
    })

    React.useEffect(() => {
        // this is called when the component is mounted

        setLoading(true) //when project mounts, start loading process
        setCompleted(false)

        LoadAuthData()    //when token is created, loading is done
        
        //anything returned happens when component is unmounted
        return () => {
            console.log("payment unmounted")
        };
    }, [])

    React.useLayoutEffect(() => {
        if(props.token != null) {
            console.log("useLayoutEffect + token != null")
            navigation.navigate('Ordering', { screen: 'Place Order' })
        }
        else console.log("useLayoutEffect + token == null")

    }, [props.token])

    const AddCardInfo = (info) => {
        setCardInfo({
            cardNumber: info.number,
            month: info.date.slice(0,2),
            year: info.date.slice(3),
            cardCode: info.CVC
        })
    }

    async function LoadAuthData() {
        let keyObj = await GetKey()

        console.log('keyObj', keyObj)
        setAuthorizeData(keyObj)

        let authData = await {
            clientKey: keyObj.AUTHORIZENET_KEY,
            apiLoginID: keyObj.USERNAME
        }
        //console.log('authData', authData)

        setLoading(false)

    }


    return (
        <View>
            <Formik
                initialValues={{name: props.billingAddress.name, number: "4242424242424242", 
                    /* month: "01", year: "2022", */ date: "01/2022", CVC: "111"}}
                onSubmit={ values => {
                    console.log("onSubmit Payment")
                    AddCardInfo(values)
                    props.setToken(null) //payment info is changing so reset token
                    setCompleted(true)
                    
                }}
                validationSchema={ReviewSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.header_text}>Payment Information</Text>
                            <TextInput
                                label="Card holder's name"
                                error={(touched.name && errors.name)? true : false }
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.error_text}>{touched.name && errors.name}</Text>
                            <TextInput
                                label="Card number"
                                error={(touched.number && errors.number)? true : false }
                                keyboardType = 'phone-pad'
                                onChangeText={handleChange('number')}
                                onBlur={handleBlur('number')}
                                value={values.number}
                            />
                            <Text style={styles.error_text}>{touched.number && errors.number}</Text>
                            <View /* style={styles.ccRow} */>
                                <View>
                                    <TextInput
                                        label="Expiration date"
                                        error={(touched.month && errors.month)? true : false }
                                        keyboardType = 'phone-pad'
                                        onChangeText={handleChange('date')}
                                        onBlur={handleBlur('date')}
                                        value={ (values.date.length > 2)? 
                                            values.date.slice(0, 2) + '/' + values.date.slice(3)
                                            :
                                            values.date
                                        }
                                    />
                                    <Text style={styles.error_text}>{touched.date && errors.date}</Text>
                                </View>
                                <View /* style={styles.ccInputWrap} */ >
                                    <TextInput
                                        label="CVC"
                                        error={(touched.month && errors.month)? true : false }
                                        keyboardType = 'phone-pad'
                                        onChangeText={handleChange('CVC')}
                                        onBlur={handleBlur('CVC')}
                                        value={values.CVC}
                                    />
                                    <Text style={styles.error_text}>{touched.CVC && errors.CVC}</Text>
                                </View>
                            </View>
                            <Button 
                            onPress={handleSubmit} 
                            title="Submit"
                            disabled={completed && !loading && props.token == null} />
                        </View>
                    </View>
                    
                )}
            </Formik>

            {(completed && !loading && props.token == null)?
                <>
                    <View style={styles.card}>
                        <View style={styles.cardCenteredContent}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text>Creating token...</Text>
                        </View>
                    </View>

                    
                    <ContentView test={7} authorizeData={authorizeData} 
                        cardInfo={cardInfo} {...props}/>
                </>
            :
                <></>
            }
            
        </View>
    );
}

async function GetKey() {
    let url = `/flowershop/getauthorizenetkey`

    const data = await api.get(url)
    const obj = await data.data

    console.log("GetKey")
    console.log(obj)

    return obj
}

var api = axios.create({
    baseURL: 'https://www.floristone.com/api/rest',
    timeout: 2000,
    headers: {'Authorization': `Basic ${auth}`}
});

export default Payment;