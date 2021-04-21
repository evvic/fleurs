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
        marginBottom: '5',
        textAlign: 'center'
    }
});