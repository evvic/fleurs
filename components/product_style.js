import {StyleSheet} from 'react-native'
/* flower-pot is the main container for each product */

/* For some reason, Reac Native does NOT use CSS files so
a JS file with a StyleSheet needs to be used instead */

export const styles = StyleSheet.create ({
    flower_pot: {
        //width:"40%",
        backgroundColor:"#add8e6",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
