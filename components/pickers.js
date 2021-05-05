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
                        <Picker.Item label={"Anniversary"} value={"an"} />
                        <Picker.Item label={"Best Sellers"} value={"bs"} />
                        <Picker.Item label={"Birthday"} value={"bd"} />
                        <Picker.Item label={"Everyday"} value={"ao"} />
                        <Picker.Item label={"Thank You"} value={"ty"} />
                        <Picker.Item label={"Love & Romance"} value={"lr"} />
                        <Picker.Item label={"Get Well"} value={"gw"} />
                        <Picker.Item label={"New Baby"} value={"nb"} />
                        <Picker.Item label={"Centerpieces"} value={"c"} />
                        <Picker.Item label={"Fruit Baskets"} value={"x"} />
                        <Picker.Item label={""} value={"all"} />

                        <Picker.Item label={"Christmas"} value={"cm"} />
                        <Picker.Item label={"Easter"} value={"ea"} />
                        <Picker.Item label={"Valentines Day"} value={"vd"} />
                        <Picker.Item label={"Mothers Day"} value={"md"} />
                        <Picker.Item label={""} value={"md"} />

                        <Picker.Item label={"Flowers Under $60"} value={"u60"} />
                        <Picker.Item label={"$60 to $80"} value={"60t80"} />
                        <Picker.Item label={"$80 to $100"} value={"80t100"} />
                        <Picker.Item label={"Above $100"} value={"a100"} />
                        <Picker.Item label={""} value={"a100"}/>

                        <Picker.Item label={"Funeral Table"} value={"fa"} />
                        <Picker.Item label={"Funeral Baskets"} value={"fb"} />
                        <Picker.Item label={"Funeral Sprays"} value={"fs"} />
                        <Picker.Item label={"Funeral Inside Casket"} value={"fl"} />
                        <Picker.Item label={"Funeral Wreaths"} value={"fw"} />
                        <Picker.Item label={"Funeral Hearths"} value={"fh"} />
                        <Picker.Item label={"Funeral Crosses"} value={"fx"} />
                        <Picker.Item label={"Funeral Casket Sprays"} value={"fc"} />
                        <Picker.Item label={"Funeral Urn Arrangements"} value={"fu"} />
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