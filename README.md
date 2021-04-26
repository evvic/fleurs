Using the Florist One API, the app will allow users to buy flowers and ship them to any household in the USA and Canada. <br/>


| Specifics | Description |
|--------------|-------------|
|Devices| Android, iOS & Web|
|Language| React Native |
| API | [Florist One](https://www.floristone.com/api/) |

### Release 1

Fleurs app is still in alpha. Currently a user can select a flower, add it to their basket, and "order" it. Ordering the flower involves filling out the the delivery date, delivery address, billing address, and credit card info (prefilled with test data). 

This project relies heavily on React Navigation, a tool to allow creating multiple screens the user can navigate around with. The functions documented in this project will be organized by their screens and sub-screens.

Table of Contents
=================
- [Screens](#screens)
  * [Home](#home)
  * [Cart](#cart)
  * [Ordering](#ordering)
    + [Delivery](#delivery)
    + [Delivery Address](#delivery-address)
    + [Billing Address](#billing-address)
    + [Payment](#payment)
    + [Place Order](#process-order)
  * [Feedback](#license)
- [Bugs](#bugs)

<!-- toc -->

# Screens
 
## Home

This is the Home screen

#### async function StartUp()
- @parameters: none
- @return: none
- An async function called when Home Screen mounts. It calls other async functions asynchronously:
  * await Intro()
  * await CreateCart()
  * await returnCategories()
- At the end, sets the state of *loaded* to true

#### async function Intro()
- @parameters: none
- @return: string msg = a message from the API saying the connection was made.
- An async function that checks if connecting to the API was successful by requesting for a welcome message.

#### async function CreateCart()
- @parameters: none
- @return: string session_id = a string of random characters that is the specific cart's ID.
- Using axios, makes an API call to create a cart and returns the ID of the cart.
- If it couldn't create a cart, it returns an error message

#### async function returnCategories()
- @parameters: none
- @return: string[], returns an array of categories the user can select as a filter for the flowers
- This function is in another file, it calls the API and parses the list of categories and each categories ID.


## Cart

This is the Cart screen

#### async function UpdateCart()
- @parameters: none
- @return: none
- Calls GetCart() function
- Updates cartItems state with all the products in the cart

#### async function GetCart()
- @parameters: CartID
- @return: [{}] array of objects(products) with given cart ID

## Ordering

This is the Ordering screen

### Delivery

This is the Delivery sub screen in Ordering

#### async function FormatAvailableDates(zip)
- @parameters: string of 5 digit zip code
- @return: none
- Calls GetDeliveryDates(zip) to get the array of available dates
- Sets state of 
  * markedDates: array of dates added to the calendar to be selectable
  * minDate: the first/earliest date in the array to set as the cutoff of earliest dates possible in the calendar
  * maxDate: the last date in the array to set the cutoff of the dates in the calendar

#### async function GetDeliveryDates(zip)
- @parameters: string of 5 digit zip code
- @return: Parsed array of dates
- Calls the API for an array of delivery dates available for the given ZIP code.

#### function CanDeliverToday(check, availableDates)
- @parameters: check (specific day to check), availableDates (array of all dates that can be delivered)
- @return: boolean whether given day is available
  * return true = cannot deliver
  * return false = can deilver
- The date in the check variable is checked if it is contained inside the availableDates array.

### Delivery Address

This is the Delivery Address sub screen in Ordering

#### function AddAddress(addy) 
- @parameters: object containing each part of the address
- @return: none
- Sets state of delivery address to the addy value

#### function onSubmit(values) 
- @parameters: object containing inputted address values
- @return: none
- Calls AddAddress to set the delivery address state
- Then calls navigation prop to navigate to the Billing Address Screen

### Billing Address

This is the Billing Address sub screen in Ordering

#### function AddAddress(addy) 
- @parameters: object containing each part of the address
- @return: none
- Sets state of billing address to the addy value

#### function onSubmit(values) 
- @parameters: object containing inputted billing address values
- @return: none
- Calls AddAddress to set the billing address state
- Then calls navigation prop to navigate to the Payment Screen

### Payment

This is the Payment sub screen in Ordering

#### function AddCardInfo(info)
- @parameters: object containing each part of the card
- @return: none
- Sets state of card info to the info values

#### function onSubmit(values) 
- @parameters: object containing inputted billing address values
- @return: none
- Calls AddCardInfo to set the cardInfo object to the values object
- Sets the state of the token state to null
- Sets the state of completed state to true
- Then calls navigation prop to navigate to the Place Order Screen

#### async function GetKey()
- @parameters: none
- @return: object with authorizenet login ID, key, and URL for Accept.js library used for creating the token

#### async function LoadAuthData()
- @parameters: none
- @return: none
- Calls GetKey and sets the authorizeData state
- Sets loading state to false so WebView component can load

### Place Order

This is the Process Order sub screen in Ordering

This screen is not fully developed with its intended features yet so there are no functions here. It simply displays the important data:
  * product name & price
  * delivery address
  * token value

## Feedback

This is the Feedback screen

This screen contains no functions either. It is mostly used as an example of capturing user input then transferring it back to the Home screen after the user goes back. it also tests changing the title of the screen with a button.


# Bugs

There are currently LOTS of bugs and I am aware of them and plan on fixing them very soon.

- On start up
  * The cart ID sets the state in the Home screen and is passed to the Cart screen, but App.js does not get the updated state and therefore when clsoing the app, it destroys a cart with an ID of 'undefined'.
  * For a few seconds after the products have loaded onto the screen, pressing the 'add to basket' button will not work because the cart ID ahs not been updated yet.
- API Calls
  * The API calls do not catch any errors. I know that if an error occurs from the call the API will return just an array of 'error' objects and I need to add a condition to each API call that can catch those error outputs (doesn't happen frequently at all).
  * TimeOut: sometimes an API call will timeout after 2000ms, I need to either increase the timeout (Axios) or at least add a catch to the calls when a timeout occurs.
- Cart
  * If the user adds an item to the basket then quickly opens the basket page, the product might not appear because it has to be added to the cart over the API then the basket calls the API to retrieve the cart and the array of added products.
- Ordering
  * If the user enters a 5 digit ZIP code too quickly, there could be an API call error and the user needs to remove a digit then re-add it to "refresh" the API call. I need to give some sort of notification if this error occurs or automatically reload the call.
  * The calendar can be a bit buggy (since it's a library I'm not sure if I can fix much), the previous and next buttons sometimes don't work so the user must swipe to navigate the months.
  * Entering actual credit card inforation is NOT good. The method of creating the token is not secure. I have pre-enetered credit card info that an be changed but should probably be left as is.
  * When pressing the submit button on the credit card info, the token is generated and the navigation navigates to the place order page, but the token is like a callback that is set a few seconds after the page has already been navigated to. I honestly don't understand how that part is working.
