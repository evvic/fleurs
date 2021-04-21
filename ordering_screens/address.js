import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import moment from 'moment'

//npm i react-native-keyboard-aware-scroll-view --save
//^ important to make forms easier to fill
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//npm install formik
import { Formik } from 'formik';


//npm install react-native-paper
import { TextInput } from 'react-native-paper';

//npm install @vtex/address-form
import AddressContainer from '@vtex/address-form/lib/AddressContainer'


function GetAddress(props) {

    const AddAddress = (addy) => {
        props.setDeliveryAddress({
            
        })
    }

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("zip code changing")
   
        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [])

    return (
        <KeyboardAwareScrollView>
            <Formik
                initialValues={{ name: '', institution: '', address1: '', address2: '',
            city: '', state: '', zip: props.zipCode, country: 'US', phone: '' }}
                onSubmit={values => AddAddress(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                    label="Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    />
                    <TextInput
                    label="institution"
                    onChangeText={handleChange('institution')}
                    onBlur={handleBlur('institution')}
                    value={values.institution}
                    />
                    <TextInput
                        label="Address 1"
                        onChangeText={handleChange('address1')}
                        onBlur={handleBlur('address1')}
                        value={values.address1}
                    />
                    <TextInput
                        label="Address 2"
                        onChangeText={handleChange('address2')}
                        onBlur={handleBlur('address2')}
                        value={values.address2}
                    />
                    <TextInput
                        label="City"
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        value={values.city}
                    />
                    <TextInput
                        label="State"
                        onChangeText={handleChange('state')}
                        onBlur={handleBlur('state')}
                        value={values.state}
                    />
                    <TextInput
                        label="ZIP code"
                        onChangeText={handleChange('zip')}
                        onBlur={handleBlur('zip')}
                        value={values.zip}
                    />
                    <TextInput
                        label="Country"
                        onChangeText={handleChange('country')}
                        onBlur={handleBlur('country')}
                        value={values.country}
                    />
                    <TextInput
                        label="Phone"
                        keyboardType = 'phone-pad'
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                    />
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    );
}

var api = axios.create({
    baseURL: 'https://www.floristone.com/api/rest',
    timeout: 2000,
    headers: {'Authorization': `Basic ${auth}`}
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderWidth: 5,
        borderColor: '#777',
        color: '#000',
        justifyContent: 'center',
        flex: 1,
        width: '50%',
        height: 80,
        marginTop: 20
    }
});

export default GetAddress;