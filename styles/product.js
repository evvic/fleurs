import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create ({ 
    productCard: {
        borderRadius: 15,
        elevation: 6,
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#333',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        marginHorizontal: 10,
        marginVertical: 8,
        padding: 1,
        //
        flex: 1
    },
    productCardContents: {
        overflow: 'hidden',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        aspectRatio: 0.9,
        //
        overflow: 'hidden'
        /* marginHorizontal: 4,
        marginVertical: 4 */
    },
    header_text: {
        fontSize: 20,
        paddingTop: 9,
        paddingHorizontal: 10
    },
    subtle_text: {
        marginBottom: 2,
        fontStyle: 'italic',
        color: 'grey',
        textAlign: 'center',
    },
    paragrah_text: {
        paddingBottom: 10,
        fontSize: 15,
        lineHeight: 22
    },


    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
      }
})