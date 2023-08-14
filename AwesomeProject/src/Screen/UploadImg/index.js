

import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UploadImg = ({ setFilePath, filePath }) => {

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return;
            }
            // Create a new FormData object
            const formData = new FormData();
            formData.append('file', {
                name: response.assets[0].fileName,
                uri: response.assets[0].uri,
                type: response.assets[0].type

            });
            // Get the token from AsyncStorage (you can use your own token retrieval logic)
            const token = await AsyncStorage.getItem('accessToken');

            setFilePath(response.assets[0].uri);
            axios.post('http://192.168.1.152:3000/users/upload/images', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log("success"); // Xử lý phản hồi từ máy chủ
            })
            .catch(error => {
                console.error('API request error:', error);
            });
           
        });
    };

    return (


        <View style={styles.container}>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => chooseFile('photo')}
            >
                <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>
        </View>

    );
};

export default UploadImg;

const styles = StyleSheet.create({
    container: {

        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
    },
});
