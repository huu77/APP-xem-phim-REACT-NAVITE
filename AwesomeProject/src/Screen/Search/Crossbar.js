import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import TheLoai from './TheLoai';
import QuocGia from './QuocGia';
import Fillter from './Fillter';
import Count from './Count';
import ShowData from './ShowData';
import Pagination from './Pagination';
import { observer } from 'mobx-react';

function Crossbar({ navigation,searchText }) {
    const [selectedItem, setSelectedItem] = useState('filter');

    const handleItemPress = (item) => {
        if (selectedItem !== item) {
            setSelectedItem(item);
        }
    };
 
  
   
    return (
        <View>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent1}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={[
                        styles.item,
                        selectedItem === 'filter' && styles.selectedItem,
                    ]}
                    onPress={() => handleItemPress('filter')}
                >
                    <Icon name="filter" size={30} color={selectedItem === 'filter' ? 'red' : 'black'} />
                    <Text style={styles.itemText}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.item,
                        selectedItem === 'select1' && styles.selectedItem,
                    ]}
                    onPress={() => handleItemPress('select1')}
                >
                    <Icon name="select1" size={30} color={selectedItem === 'select1' ? 'red' : 'black'} />
                    <Text style={styles.itemText}>COUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.item,
                        selectedItem === 'staro' && styles.selectedItem,
                    ]}
                    onPress={() => handleItemPress('staro')}
                >
                    <Icon name="staro" size={30} color={selectedItem === 'staro' ? 'red' : 'black'} />
                    <Text style={styles.itemText}>Thể Loại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.item,
                        selectedItem === 'tagso' && styles.selectedItem,
                    ]}
                    onPress={() => handleItemPress('tagso')}
                >
                    <Icon name="tagso" size={30} color={selectedItem === 'tagso' ? 'red' : 'black'} />
                    <Text style={styles.itemText}>Quốc Gia</Text>
                </TouchableOpacity>

            </ScrollView>
            {selectedItem === 'staro'&&  <TheLoai navigation={navigation}/>}
            {selectedItem === 'tagso'&&  <QuocGia navigation={navigation}/>}
            {selectedItem === 'filter'&&  <Fillter navigation={navigation} searchText={searchText} />}
            {selectedItem === 'select1'&&  <Count navigation={navigation} searchText={searchText} />}
         </View>

    );
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: responsiveHeight(10),

        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    TextTitle: {
        fontSize: responsiveFontSize(3),
        marginLeft: '20%',
        fontWeight: 'bold',
        color: '#000'
    },
    scrollViewContent1: {
        flexDirection: 'row',
    },
    item: {
        width: 110,
        height: 50,
        margin: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 5
    },
    itemText: {
        fontSize: 16,
        color: '#000', marginLeft: 5, fontWeight: 'bold'
    },
});
export default observer(Crossbar)