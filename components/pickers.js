import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker'; //npm install @react-native-picker/picker --save
import { styles } from '../styles/home.js'

export default function Pickers(props) {

    React.useEffect(() => {
        
    }, [props])

    return (
        <View style={styles.homeCard}>
              <View style={styles.homeCardContentsWrap}>
                <View style={styles.homeCardLeftSide}>
                    <Text style={styles.homeCardText}>Category</Text>
                    <Picker
                    style={styles.dropdown_container}
                    selectedValue={props.category}
                    onValueChange={(itemValue, itemIndex) => props.setCategory(itemValue)}
                    >
                        <Picker.Item label={"All"} value={"all"} />
                        <Picker.Item label={"Birthday"} value={"bd"} />
                        <Picker.Item label={"Anniversary"} value={"an"} />
                        <Picker.Item label={"Everyday"} value={"ao"} />
                        <Picker.Item label={"Thank You"} value={"ty"} />
                        <Picker.Item label={"Love & Romance"} value={"lr"} />
                        <Picker.Item label={"Get Well"} value={"gw"} />
                        <Picker.Item label={"New Baby"} value={"nb"} />
                        <Picker.Item label={"Centerpieces"} value={"c"} />
                        <Picker.Item label={"Fruit Baskets"} value={"x"} />
                        <Picker.Item label={"Flowers Under $60"} value={"u61"} />
                    </Picker>
                </View>
                <View style={styles.homeCardLeftSide}>
                    <Text style={styles.homeCardText}>Sort type</Text>
                    <Picker
                    style={styles.dropdown_container}
                    selectedValue={props.sorttype}
                    onValueChange={(itemValue, itemIndex) => props.setSorttype(itemValue)}
                    >
                        <Picker.Item label={"None"} value={null} />
                        <Picker.Item label={"Price Ascending"} value={"pa"} />
                        <Picker.Item label={"Price Descending"} value={"pd"} />
                        <Picker.Item label={"Alphabetical (a-z)"} value={"az"} />
                        <Picker.Item label={"Alphabetical (z-a)"} value={"za"} />
                    </Picker>
                </View>
              </View>
                {(props.loadedProducts)?
                <></> //products have loaded
                :
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
              
            </View>
    )
}