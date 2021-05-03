import React from "react";
import { useNavigation } from '@react-navigation/native'; 
import { Text, View, Image, Button } from "react-native";
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

const ReviewSchema = yup.object({
    name: yup.string().required().min(1),
    institution: yup.string().notRequired(),
    address1: yup.string().required(),
    address2: yup.string().notRequired(),
    city: yup.string().required(),
    state: yup.string().required().length(2),
    //zip
    //country (code)
    phone: yup.string().required().matches(phoneRegExp, "Phone number is not valid.")
})

function GetDeliveryAddy(props) {
    const navigation = useNavigation(); //navigation hook

    const AddAddress = (addy) => {
        // deliveryAddress will still appear empty in here but it was updated
        props.setDeliveryAddress({
            name: addy.name,
            institution: addy.institution,
            address1: addy.address1,
            address2: addy.address2,
            city: addy.city,
            state: addy.state,
            zip: addy.zip,
            country: addy.country,
            phone: addy.phone
        })
    }

    return (
        <KeyboardAwareScrollView>
            <Formik
                initialValues={{ name: '', institution: '', address1: '', address2: '',
                    city: '', state: '', zip: props.zipCode, country: 'US', phone: '' }}
                onSubmit={values => {
                    console.log("submitting address...")
                    AddAddress(values)
                    //when address is filled go to billing
                    navigation.navigate('Ordering', { screen: 'Billing Address' })}
                }
                validationSchema={ReviewSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.header_text}>Delivery Address</Text>
                        <View style={styles.nameAndPhone}>
                            <TextInput
                                label="Recipient's name"
                                error={(touched.name && errors.name)? true : false }
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.error_text}>{touched.name && errors.name}</Text>
                            <TextInput
                                label="Recipient's phone"
                                error={(touched.phone && errors.phone)? true : false }
                                keyboardType = 'phone-pad'
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                            />
                            <Text style={styles.error_text}>{touched.phone && errors.phone}</Text>
                        </View>
                        <TextInput
                            label="Institution"
                            onChangeText={handleChange('institution')}
                            onBlur={handleBlur('institution')}
                            value={values.institution}
                        />
                        <Text style={styles.subtle_text}>Example: Evergreen Memorial</Text>
                        <TextInput
                            label="Address 1"
                            error={(touched.address1 && errors.address1)? true : false }
                            onChangeText={handleChange('address1')}
                            onBlur={handleBlur('address1')}
                            value={values.address1}
                        />
                        <Text style={styles.error_text}>{touched.address1 && errors.address1}</Text>
                        <TextInput
                            label="Apartment, suite, etc."
                            onChangeText={handleChange('address2')}
                            onBlur={handleBlur('address2')}
                            value={values.address2}
                        />
                        <Text style={styles.subtle_text}>Example: 3rd floor</Text>
                        <TextInput
                            error={(touched.city && errors.city)? true : false }
                            label="City"
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                        />
                        <Text style={styles.error_text}>{touched.city && errors.city}</Text>
                        <View style={styles.row}>
                            <View style={styles.inputWrap} >
                                <TextInput
                                    error={(touched.state && errors.state)? true : false }
                                    label="State Code"
                                    onChangeText={handleChange('state')}
                                    onBlur={handleBlur('state')}
                                    value={values.state.toUpperCase().slice(0, 2)}
                                />
                                <Text style={styles.error_text}>{touched.state && errors.state}</Text>
                            </View>
                            <View style={styles.inputWrap} >
                                <TextInput
                                    label="ZIP code"
                                    editable={false}
                                    onChangeText={handleChange('zip')}
                                    onBlur={handleBlur('zip')}
                                    value={values.zip}
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
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    );
}

export default GetDeliveryAddy;