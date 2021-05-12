Using the Florist One API, the app will allow users to buy flowers and ship them to any household in the USA and Canada. <br/>


| Specifics | Description |
|--------------|-------------|
|Devices| Android, iOS & Web|
|Language| React Native |
| API | [Florist One](https://www.floristone.com/api/) |

Fleurs is not yet finished, but a beta state is available on the [Play Store](https://play.google.com/store/apps/details?id=com.ewic.fleurs) where the flower shopping experience can be tested but no flowers can be actually bought.

| Platform | Available |
|--------------|--------------|
| Apple App Store| n/a (yet) |
| Google Play Store | [fleurs](https://play.google.com/store/apps/details?id=com.ewic.fleurs) |
| Website | (n/a) yet |



### Release 2

Fleurs app is now in beta! Currently a user can select a flower, add it to their basket, and "order" it. Ordering the flower involves filling out the the delivery date, delivery address, billing address, and credit card info (prefilled with test data). 

> :warning: **Creating payment token is not secure**: once this is fixed the user can then enter their own payment info. 

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

This screen displays a FlatList of products in cards given a certain cateory or even a sort type. The category and sort type can be selected from the 2 pickers at the top of the page that are inside the pickers component.

### Pickers component

This compnent containts no functions besides the useEffect() hook which monitors changes in the category or sorttype props. The user can select different categories or sort types and the sate is lifted up back to the home screen.

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

Every item in the cart creates a new CartItem component from FlatList

### CartItem

Every item in the cart has 2 buttons: "PLACE ORDER" and "REMOVE".
- PLACE ORDER -> navigates to order screen
- REMOVE -> calls RemoveItemFromCart()

#### async function GetProduct() 
- @parameters: none
- @return: object containg error (failed getting product) or containing product info (succeeded gerrign product).

#### async RemoveItemFromCart(id, code)
- @parameters: string of cart/session ID and product code to be removed from cart.
- @return: API post object: either an object containg array of errors (failure to process order) or object containing success message (success).

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

> :warning: **Credit card number & Exp. date are locked**: while the token process is still not confirmed secure, these fields will be locked.

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

This screen also has a React Native Navigation onBackPressed listener where after the order hss been successfully placed, going backwards instead takes the user to the Feedback screen, instead of being able ot go to the previous order page and recreate a token for a product they alread purchased.

The user gets a summary of the product, total cost, delivery and billing address, and then has the button to "place order". When the "place order" button has been pressed, mulltipl functions are called:

#### async function Processing() 
- @parameters: none 
- @return: none
- sets submitted & loading state to true.
- Calls CreateObject(props) which returns the object to be sent to the FloristOne API.
- Calls SendPayment(thing) which accepts the previosuly created oject and passes that to the API.
- If SendPayment() returns a non-error object (success), call RemoveItemFromCart() to remove the bought item from user's cart.
- All async events done: set loading state to false. 
- If SendPayment() returned a non-error object (success), set success state to true.

#### async function SendPayment(obj) 
- @parameters: created payment object containing all data.
- @return: API post object: either an object containg array of errors (failure to process order) or object containg order payment data (success).
- Axios post the placing order object and receive an object back.

#### async RemoveItemFromCart(id, code)
- @parameters: string of cart/session ID and product code to be removed from cart.
- @return: API post object: either an object containg array of errors (failure to process order) or object containing success message (success).

#### async function CreateObject(props)
- @parameters: has props passed as the only parameter but this includes the delivery address, billing address, product(s) and their price, a message, delivery date, and code, ccinfo (payment token), then finally the order total. 
- @return: jsut returns the props but formatted correctly for being passed to the API.

#### function PhormatPhone(num)
- @parameters: 10 digit number.
- @return: the 10 digit phone number formatted with US standards: +1 (###) ###-####

## Feedback

This is the Feedback screen

This screen contains no functions either. It is mostly used as an example of capturing user input then transferring it back to the Home screen after the user goes back. It also tests changing the title of the screen with a button.


# Bugs

There are still many ugs but I would argue that basic user experience would not have them occur.
I have removed the most fatal bugs and now the app is fairly stable.

- On start up
  * For a few seconds after the products have loaded onto the screen, pressing the 'add to basket' button will not work because the cart ID has not been updated yet.
- API Calls
  * ~~The API calls do not catch any errors.~~
- Cart
  * If the user adds an item to the basket then quickly opens the basket page, the product might not appear because it has to be added to the cart over the API then the basket calls the API to retrieve the cart and the array of added products.
  * When the user removes an item from the cart, sometimes the cart will not remove the item becasue it has the wrong product code(????) for some reason.
- Ordering
  * If the user enters a 5 digit ZIP code too quickly, there could be an API call error and the user needs to remove a digit then re-add it to "refresh" the API call. I need to give some sort of notification if this error occurs or automatically reload the call (I haven't been able to replicate this bug in awhile).
  * The calendar can be a bit buggy (since it's a library I'm not sure if I can fix much), the previous and next buttons sometimes don't work so the user must swipe to navigate the months (does not hurt user experince nearly at all).
  * Entering actual credit card inforation is NOT allowed until I learn how to confirm the token is created securely.
