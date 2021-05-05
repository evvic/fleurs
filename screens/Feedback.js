import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { StackActions } from '@react-navigation/native'; 

export default function Feedback({ navigation, route }) {
    const [feedbackText, setFeedbackText] = React.useState('');

    //for header options/styling
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
                onPress={() => navigation.navigate('Cart')}
                title="Basket"
                color="#A7C7E7"
              />
          ),
        });
    }, [navigation]);
  
    return (
      <>
        <TextInput
          multiline
          placeholder="What's on your mind?"
          style={{ height: 200, padding: 10, backgroundColor: 'white' }}
          value={feedbackText}
          onChangeText={setFeedbackText}
        />
        <View style={{padding: 10, marginHorizontal: 70}}>
          <Button
            title="Done"
            onPress={() => {
              // Pass params back to home screen
              //navigation.navigate('Home', { feedback: feedbackText });
              navigation.dispatch(StackActions.popToTop());
            }}
            color="#dcc2ee"
          />
        </View>
        <View style={{padding: 10, marginHorizontal: 70}}>
          <Button
              title="Update the title"
              //can edit navigation options while on screen
              onPress={() => navigation.setOptions({ title: 'Thanks for using Fluers' })}
              color="#A7C7E7"
          />
        </View>
      </>
    );
  }