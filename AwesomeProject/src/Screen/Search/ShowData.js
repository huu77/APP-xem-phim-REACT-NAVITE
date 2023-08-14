import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { decodeToken } from "../../decodeToken";
import requestApi from "../../Axios";
import { observer } from 'mobx-react';
import { useStore } from "../../StoreMobx";
const imgLogo = require('../../img/logo.jpg')
const { width, height } = Dimensions.get('screen')

function ShowData({ navigation ,data}) {
    const rootStore = useStore()
     
    useEffect(() => {
        const resAPI = async () => {
      
        }
        resAPI()
    }, [data])
    return (

        <View style={{ width: width, height: height, backgroundColor: '#1f201e', padding: 10 }}>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.strollView}
            >
                {data && data.map((item, index) => (
                    <View style={styles.container1} key={index}>
                    <View style={styles.row}>
                        <>
                            <TouchableOpacity style={styles.column} key={index} onPress={() => navigation.navigate('Phim', { id: item.id })}>
                                <Image source={{ uri: `http://192.168.1.152:3000/${item?.img_nen}` }}style={styles.image2} resizeMode="cover" />
                                <View style={{ width: '40%', padding: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>{item.namePhim}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>Tập: {item.tapphim}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>Ngày phát hành: {item.ngay_phat_hanh}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>Điểm đánh giá: {item.diem_danh_gia}</Text>
                                    <TouchableOpacity onPress={() => handelDelete(item.id)}>
                                        <Icon name="trash" size={30} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                        </>

                    </View>
                </View>
                   
                ))}
                <View style={{ width: width, height: 500 }}></View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    strollView: {
        marginTop: 20
    }, 
    container1: {

    },
    row: {

    },
    column: {
        width: '100%', // 50% chiều ngang của View con để hiển thị hai cột bên trong mỗi hàng.
        height: 180,

        borderBottomEndRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        flexDirection: 'row',

        justifyContent: 'space-around'
    },
    image2: {
        width: '60%',
        height: '100%',

    }
})
export default observer(ShowData);