import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// the navigation prop is passed in to every screen component
function HomeScreen({ navigation, route }) {

    React.useEffect(() => {
        if (route.params?.feedback) {
        // Post updated, do something with `route.params.feedback`
        // For example, send the post to the server
        console.log(route.params?.feedback)
        }
    }, [route.params?.feedback]);

    //for header options/styling
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
                onPress={() => navigation.navigate('Cart')}
                title="Cart"
                color="#A7C7E7"
              />
          ),
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Zcreen</Text>
        <Button
            title="Write feedback"
            onPress={() => navigation.navigate('Feedback')}
        />
        </View>
    );
}

export default HomeScreen;