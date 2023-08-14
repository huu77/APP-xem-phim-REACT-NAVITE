import React, { useState, useRef, useEffect } from "react";
import { Button, View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Screen } from "react-native-screens";
const imgLogo = require('../../img/logo.jpg')
const { width, height } = Dimensions.get('screen')
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { observer } from "mobx-react";
import { useStore } from "../../StoreMobx";
import requestApi from "../../Axios";

function SearchInput({ navigation, searchText, setSearchText }) {


    const rootStore = useStore()
    useEffect(() => {
        const resAPi = async () => {
            rootStore.listSearch.addItem('search', searchText)
        }
        resAPi()
    }, [searchText])
    const handleSend = async () => {
        const result = rootStore.listSearch.lists

        const kp = await requestApi(`phims?search=${result.search}&item_per_page=${result.item_per_page}&page=${result.page}&filter=${result.filter}`, 'GET')
        rootStore.listSearch.addItem('totalCount', kp.lastPage)
        rootStore.listSearch.setData(kp.phims)


    };
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Icon name="send" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        // Your other search container styles can go here
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        // Your other search input styles can go here
    },
    sendButton: {
        backgroundColor: 'blue',
        borderRadius: 15,
        padding: 10,
        marginLeft: 10,
        // Your other send button styles can go here
    },


})
export default observer(SearchInput);