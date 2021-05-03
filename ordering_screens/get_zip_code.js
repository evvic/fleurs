import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; 
import { withNavigation } from '@react-navigation/native';  
import { NavigationContext } from '@react-navigation/native';

import { StyleSheet, Text, View, Image, Button, Keyboard,
    TouchableWithoutFeedback, ScrollView } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';
import moment from 'moment'

//npm install react-native-paper
import { TextInput } from 'react-native-paper';

//npm install --save react-native-calendar-picker
import CalendarPicker from 'react-native-calendar-picker';

function GetZipCode(props) {
    const navigation = useNavigation(); //navigation hook

    let [loaded, setLoaded] = useState(false)
    let [product, setProduct] = useState({})
    let [markedDates, setMarkedDates] = useState([])
    let [maxDate, setMaxDate] = useState()
    let [minDate, setMinDate] = useState()

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("zip code changing")
        
        if(props.zipCode && props.zipCode.toString().length == 5) {
            console.log("zip code has 5 nums")
            props.setSelectedDay(null)
            FormatAvailableDates(props.zipCode)
        }

        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [props.zipCode])

    async function FormatAvailableDates(zip) {
        console.log("FormatAvailableDates()")
        let datesArr = await GetDeliveryDates(zip)

        if(datesArr.length > 1) {
            setMarkedDates(datesArr)
            setMinDate(moment(datesArr[0], 'MM/DD/YYYY', true).format())
            setMaxDate(moment(datesArr[datesArr.length - 1], 'MM/DD/YYYY', true).format())
            
        }
    }

    return (
        <ScrollView>
            <Text>Enter delivery ZIP code: </Text>
{/*             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}        
            <View>  
                <TextInput style={{width:"60%"}}
                    label="ZIP code"
                    value={props.zipCode}
                    keyboardType = 'numeric'
                    //regex replace removes anything non numeric from string input
                    onChangeText={text => props.setZipCode(text.replace(/\D/g,''))}
                    maxLength={5}
                />
                </View>      
{/*             </TouchableWithoutFeedback> */}        
            {(props.zipCode && maxDate && props.zipCode.toString().length == 5)?
            <>
                <Text>CALENDAR HERE</Text>
                <CalendarPicker
                    //specifies dates that cannot be selected. 
                    //Array of Dates, or a function that returns true for a given Moment date
                    disabledDates={(checkDay) => CanDeliverToday(checkDay, markedDates)}
                    minDate={minDate}
                    maxDate={maxDate}
                    //Months are scrollable if true
                    scrollable={true}
                    //restirct months allowed to scroll to
                    restrictMonthNavigation={true}
                    //sets state of selected day to MM/DD/YYYY
                    onDateChange={(call) => props.setSelectedDay(moment(call).format('MM/DD/YYYY'))}
                />
                {(props.selectedDay)?
                <>
                    <Text>Selected delivery day is {props.selectedDay}.</Text>
                    <Button
                        title="Deliver"
                        //because this is a nested navigator, it's a bit complicated...
                        onPress={() => navigation.navigate('Ordering', { screen: 'Delivery Address' })}
                    />
                </>
                :
                <>
                    <Text>Select a delivery day.</Text>
                </>
                }
    
            </>
        :
        <></>}
        </ScrollView>
    );
}

function CanDeliverToday(check, availableDates) {
    check = moment(check).format('MM/DD/YYYY')

    if (availableDates.includes(check)) return false
    else return true

    //return true = cannot deliver
    //return false = can deliver
}

var api = axios.create({
    baseURL: 'https://www.floristone.com/api/rest',
    timeout: 2000,
    headers: {'Authorization': `Basic ${auth}`}
});

async function GetDeliveryDates(zip) {
    let url = `/flowershop/checkdeliverydate?zipcode=${zip}`

    const data = await api.get(url)
    const obj = await data.data

    console.log(obj.DATES)
    //let temp = await obj.PRODUCTS[0]

    return obj.DATES
}

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

export default GetZipCode;