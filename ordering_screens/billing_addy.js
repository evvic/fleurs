import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { Text, View, Image, Button, Switch } from "react-native";
import { styles } from '../styles/global.js'; //CSS equivalent

//npm i react-native-keyboard-aware-scroll-view --save
//^ important to make forms easier to fill
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//npm install formik
import { Formik } from 'formik';

//npm install yup ~ form input validation
import * as yup from 'yup'

//npm install react-native-paper
import { TextInput } from 'react-native-paper';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const emailRegEXp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const ReviewSchema = yup.object({
    name: yup.string().required().min(1),
    address1: yup.string().required(),
    address2: yup.string().notRequired(),
    city: yup.string().required(),
    state: yup.string().required().length(2),
    //zip
    //country (code)
    phone: yup.string().required().length(10).matches(phoneRegExp, "Phone number is not valid."),
    email: yup.string().required().matches(emailRegEXp, "Email is not valid."),
})

function GetBillingAddy(props) {
    const navigation = useNavigation(); //navigation hook

    const [sameAddress, setSameAddress] = useState(false)

    const AddAddress = (addy) => {
        // deliveryAddress will still appear empty in here but it was updated
        props.setBillingAddress({
            name: addy.name,
            address1: addy.address1,
            address2: addy.address2,
            city: addy.city,
            state: addy.state,
            zip: addy.zip,
            country: addy.country,
            phone: addy.phone,
            email: addy.email
        })
    }

    return (
        <KeyboardAwareScrollView>
            <Formik
                initialValues={{ name: '', address1: '', address2: '',
                    city: '', state: '', zip: props.zipCode, country: 'US', phone: '', email: '' }}
                onSubmit={values => {
                    console.log("submitting address...")
                    AddAddress(values)
                    //when address is filled go to billing
                    navigation.navigate('Ordering', { screen: 'Payment' })}
                }
                validationSchema={ReviewSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, resetForm, values, errors, touched }) => (
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.header_text}>Billing Address</Text>
                        <View style={styles.nameAndPhone}>
                            <TextInput
                                label="Name"
                                error={(touched.name && errors.name)? true : false }
                                autoCompleteType='name'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.error_text}>{touched.name && errors.name}</Text>
                            <TextInput
                                label="Phone"
                                error={(touched.phone && errors.phone)? true : false }
                                keyboardType = 'phone-pad'
                                autoCompleteType = 'tel'
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                            />
                            <Text style={styles.error_text}>{touched.phone && errors.phone}</Text>
                            <TextInput
                                label="Email"
                                error={(touched.email && errors.email)? true : false }
                                keyboardType = 'email-address'
                                autoCompleteType='email'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <Text style={styles.error_text}>{touched.email && errors.email}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.toggle}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={sameAddress ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        setSameAddress(!sameAddress)
                                        //resetForm()
                                    }}
                                    value={sameAddress}
                                />
                            </View>
                            <View style={styles.toggleText}>
                                <Text>Billing address is the same as delivery</Text>
                            </View>
                        </View>
                        
                        <TextInput
                            label="Address 1"
                            disabled={(sameAddress)? true : false}
                            autoCompleteType='street-address'
                            error={(touched.address1 && errors.address1)? true : false }
                            onChangeText={handleChange('address1')}
                            onBlur={handleBlur('address1')}
                            value={(sameAddress)? values.address1 = props.deliveryAddress.address1 : values.address1}
                        />
                        <Text style={styles.error_text}>{touched.address1 && errors.address1}</Text>
                        <TextInput
                            label="Apartment, suite, etc."
                            disabled={(sameAddress)? true : false}
                            onChangeText={handleChange('address2')}
                            onBlur={handleBlur('address2')}
                            value={(sameAddress)? values.address2 = props.deliveryAddress.address2 : values.address2}
                        />
                        <Text style={styles.subtle_text}>Example: 3rd floor</Text>
                        <TextInput
                            error={(touched.city && errors.city)? true : false }
                            label="City"
                            disabled={(sameAddress)? true : false}
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={(sameAddress)? values.city = props.deliveryAddress.city : values.city}
                        />
                        <Text style={styles.error_text}>{touched.city && errors.city}</Text>
                        <View style={styles.row}>
                            <View style={styles.inputWrap} >
                                <TextInput
                                    error={(touched.state && errors.state)? true : false }
                                    label="State Code"
                                    disabled={(sameAddress)? true : false}
                                    onChangeText={handleChange('state')}
                                    onBlur={handleBlur('state')}
                                    value={(sameAddress)? values.state = props.deliveryAddress.state : values.state.toUpperCase().slice(0, 2)}
                                />
                                <Text style={styles.error_text}>{touched.state && errors.state}</Text>
                            </View>
                            <View style={styles.inputWrap} >
                                <TextInput
                                    label="ZIP code"
                                    autoCompleteType='postal-code'
                                    disabled={(sameAddress)? true : false}
                                    onChangeText={handleChange('zip')}
                                    onBlur={handleBlur('zip')}
                                    value={(sameAddress)? values.zip = props.deliveryAddress.zip : values.zip}
                                />
                            </View>
                            <View style={styles.inputWrap} >
                                <TextInput
                                    label="Country"
                                    editable={false}
                                    onChangeText={handleChange('country')}
                                    onBlur={handleBlur('country')}
                                    value={values.country}
                                />
                            </View>
                        </View>
                        <Button onPress={handleSubmit} title="Submit" color="#9AC791"/>
                    </View>
                </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    );
}

export default GetBillingAddy;