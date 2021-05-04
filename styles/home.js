import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create ({
    homeCard: {
        //borderRadius: 20,
        borderBottomLeftRadius: 25,     //rounds bottom corners
        borderBottomRightRadius: 25,    //rounds bottom corner
        elevation: 6,
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#333',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        marginHorizontal: 0,
        marginVertical: 0,
        position: 'absolute', //allows components underneath
        width: '100%'         //fixes absolute problem
    },
    homeCardContentsWrap: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center', //
        marginHorizontal: 10,
        marginVertical: 10,
        marginBottom: 15,
    },
    homeCardLeftSide: {
        flex:1,
        //flexDirection:'row'
        //marginBottom: 10,
        justifyContent:'space-evenly'
    },
    homeCardRightSide: { //currently only using the left side for both
        justifyContent:'space-evenly',
        marginVertical:10
    },
    homeCardText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#303030'
    },
    dropdown_container: {
        paddingTop: 30,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 3,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
})
