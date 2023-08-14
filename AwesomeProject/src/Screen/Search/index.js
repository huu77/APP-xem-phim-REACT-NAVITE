import React, { useState, useRef } from "react";
import { Button, View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, TextInput } from "react-native";
const imgLogo = require('../../img/logo.jpg')
const { width, height } = Dimensions.get('screen')
import { Picker } from '@react-native-picker/picker';
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import Crossbar from "./Crossbar";
import { observer } from "mobx-react";

function Search({ navigation}) {
    const [searchText, setSearchText] = useState('');
    return (

        <View style={{ width: width, height: height, backgroundColor: '#1f201e' }}>
            {/* search input and send */}
            <SearchInput searchText={searchText} setSearchText={setSearchText}/>
            <Crossbar navigation={navigation} searchText={searchText}  />
        </View>
    );
}
const styles = StyleSheet.create({
   
})
export default observer(Search);