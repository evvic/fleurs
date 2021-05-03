import {StyleSheet} from 'react-native'
/* flower-pot is the main container for each product */

/* For some reason, Reac Native does NOT use CSS files so
a JS file with a StyleSheet needs to be used instead */

export const styles = StyleSheet.create ({
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
    },
    error_text: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        //textAlign: 'center'
    },
    subtle_text: {
        marginBottom: 10,
        fontStyle: 'italic',
        color: 'grey'
        //textAlign: 'center'
    },
    header_text: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 6,
    },
    subHeaderText: {
        paddingVertical: 5,
        //fontWeight: 'bold',
        fontSize: 16,
        
    },

    //ZIP code custom card container
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 6,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
        
    },
    cardCalendarContent: {
        marginVertical: 10,
    },
    cardCenteredContent: {
        marginHorizontal: 18,
        marginVertical: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    //address form styling
    row: {
        flex: 1,
        flexDirection: "row"
    },
    inputWrap: {
        flex: 1,
        padding: 3,
        //borderColor: "#cccccc",
        //borderBottomWidth: 1,
        marginBottom: 10
    },

    nameAndPhone: {
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 20
    }
});