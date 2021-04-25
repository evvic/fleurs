import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, Text, View, UIManager, Button, WebView } from "react-native";
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
    month: yup.string().required().max(2).matches(/^\d+$/, "must be all digits"),
    year: yup.string().required().length(4).matches(/^\d+$/, "must be all digits"),
    CVC: yup.string().required().length(3).matches(/^\d+$/, "must be all digits")
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

    const AddCardInfo = (info) => {
        setCardInfo({
            cardNumber: info.number,
            month: info.month,
            year: info.year,
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

    function waiting(i) {
        if(props.token == null) {
            setTimeout(waiting(i + 1), 1000);//wait 50 millisecnds then recheck
            console.log("waiting i = " + i)
            return;
        }
    }

    return (
        <View>
            <Text>IN BILLING</Text>
            <Formik
                initialValues={{name: props.billingAddress.name, number: "4242424242424242", 
                    month: "01", year: "2022",  CVC: "111"}}
                onSubmit={ values => {
                    console.log("onSubmit")
                    AddCardInfo(values)
                    props.setToken(null) //payment info is changing so reset token

                    setCompleted(true)

                    waiting(0)
                    console.log("token", props.token)
                    console.log("done waiting")
                    navigation.navigate('Ordering', { screen: 'Place Order' })
                    console.log("after navigate")
                }}
                validationSchema={ReviewSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
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
                        <TextInput
                            label="Expiration month"
                            error={(touched.month && errors.month)? true : false }
                            keyboardType = 'phone-pad'
                            onChangeText={handleChange('month')}
                            onBlur={handleBlur('month')}
                            value={values.month}
                        />
                        <Text style={styles.error_text}>{touched.month && errors.month}</Text>
                        <TextInput
                            label="Expiration year"
                            error={(touched.year && errors.year)? true : false }
                            keyboardType = 'phone-pad'
                            onChangeText={handleChange('year')}
                            onBlur={handleBlur('year')}
                            value={values.year}
                        />
                        <Text style={styles.error_text}>{touched.year && errors.year}</Text>
                        <TextInput
                            label="CVC"
                            error={(touched.month && errors.month)? true : false }
                            keyboardType = 'phone-pad'
                            onChangeText={handleChange('CVC')}
                            onBlur={handleBlur('CVC')}
                            value={values.CVC}
                        />
                        <Text style={styles.error_text}>{touched.CVC && errors.CVC}</Text>
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                    
                )}
            </Formik>

            {(completed && !loading && props.token == null)?
                <>
                    <Text>Creating token...</Text>
                    <ContentView test={7} authorizeData={authorizeData} 
                        cardInfo={cardInfo} {...props}/>
                </>
            :
                <Text>loading</Text>
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