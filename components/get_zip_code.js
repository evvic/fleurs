import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { username, password, auth } from '../API_KEY.js'
import axios from 'axios';

//npm install --save reinput
//import Reinput from "reinput" //broken

//npm install react-native-input-style --save
import Input from 'react-native-input-style';   //broken

//npm install react-native-masked-text --save
import { TextInputMask } from 'react-native-masked-text'

//npm install react-native-paper
import { TextInput } from 'react-native-paper';

//npm install --save react-native-calendars
import {Calendar, LocaleConfig} from 'react-native-calendars';

/*
    FIX CALENDAR FOR PHONE
    FormatAvailableDates() WILL ADD THE DATES TO STATE
    LIKE HOW THEY SHOULD BE ADDED TO markedDates
    https://github.com/wix/react-native-calendars 

*/


function GetZipCode(props) {
    let [loaded, setLoaded] = useState(false)
    let [product, setProduct] = useState({})
    let [selectedDay, setSelectedDay] = useState()
    let [markedDates, setMarkedDates] = useState([])

    React.useEffect(() => {
        // this is called when the component is mounted
        console.log("zip code changing")
        
        if(props.zipCode && props.zipCode.toString().length == 5) {
            console.log("zip code has 5 nums")
            
            
            
            FormatAvailableDates(props.zipCode)
            

        }

        //anything returned happens when component is unmounted
        return () => {
            console.log("product unmounted")
        };
    }, [props.zipCode])

    async function FormatAvailableDates(zip) {
        let datesArr = await GetDeliveryDates(zip)

        

    }

    let dateObj = new Date()
    let currentDate = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}`
    let maxDate = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 2}-${dateObj.getUTCDate()}`
    console.log(currentDate)

    return (
        <View>
            <Text>Enter delivery ZIP code: </Text>
            
            <TextInput style={{width:"60%"}}
                label="ZIP code"
                value={props.zipCode}
                keyboardType = 'numeric'
                //regex replace removes anything non numeric from string input
                onChangeText={text => props.setZipCode(text.replace(/\D/g,''))}
                maxLength={5}
            />

            {(props.zipCode && props.zipCode.toString().length == 5)?
            <>
                <Text>CALENDAR HERE</Text>
                <Calendar
                    // Initially visible month. Default = Date()
                    current={currentDate}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={currentDate}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={maxDate}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    //hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Button/>)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    //disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    //firstDay={1}
                    // Hide day names. Default = false
                    //hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    //showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    //onPressArrowLeft={subtractMonth => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    disableArrowLeft={true}
                    // Disable right arrow. Default = false
                    //disableArrowRight={true}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                    // Replace default month and year title with custom one. the function receive a date as parameter.
                    //renderHeader={(date) => {/*Return JSX*/}}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}
                />
            </>
        :
        <></>}
        </View>
    );
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

    console.log(obj)
    //let temp = await obj.PRODUCTS[0]



    return obj
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