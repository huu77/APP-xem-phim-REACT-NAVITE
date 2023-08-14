import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
 
import requestApi from '../../Axios';
import UploadImg from '../UploadImg';
import { decodeToken } from '../../decodeToken';
//decode token 
 

function Info({ navigation }) {
  const [user, setUSer] = useState({})
  const [userInfoUpload, setUserInfo] = useState({
    full_name: "",
    email: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await decodeToken();

      requestApi(`users/${data.id}`, 'GET').then((res) => {
        // setUSer(res.existingUser)
        setUserInfo({full_name:res.existingUser.full_name,email:res.existingUser.email,img:res.existingUser.img})

      }).catch((err) => { console.log(err); })
    };
    fetchData();
  }, []);


  const handelLogout = async () => {
    try {
      // Xóa token đã lưu trữ
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      // Chuyển hướng đến trang đăng nhập
      navigation.navigate('LoginPage');
    } catch (error) {
      console.log('Lỗi khi đăng xuất:', error);
    }
  };

 
  const [filePath, setFilePath] = useState(null);


   //upload info
  
  const handleFieldChange = (field, value) => {
    setUserInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handelSave = async () => {
    const data = {
      InfoNewUser:{
        full_name: userInfoUpload.full_name,
        email: userInfoUpload.email
      }
    }
   
    try {
      const result = await requestApi('users/upload/info', 'PUT', data)
      console.log(result);
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <SafeAreaView style={{ width: '100%', backgroundColor: '#f8f5f2', alignItems: 'center' }}>
      <View style={{ width: '100%' }}>
        <Image style={{ width: '100%', height: responsiveHeight(12) }} source={require('../../img/imageUser.png')} resizeMode='stretch' />
        <View style={styles.container}>
          <View style={styles.containerParrent}>
            <View style={styles.circle} >
              {filePath === null ? <Image source={{ uri: `http://192.168.1.152:3000/${userInfoUpload.img}` }} style={styles.image} /> : <Image
                source={{ uri: filePath }}
                style={styles.image}
                resizeMode="contain"
              />}

            </View>
          </View>
          <Text style={styles.TextName}>{userInfoUpload.full_name}</Text>
        </View>
        <UploadImg filePath={filePath} setFilePath={setFilePath} />
      </View>

      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

        {/* email */}
        <View style={{ width: '80%', justifyContent: 'flex-start', marginTop: 10 }}>
          <Text style={{ fontSize: responsiveFontSize(3), fontWeight: 'bold' }}> Email</Text>
          <TextInput placeholder='email...' value={userInfoUpload.email}
            onChangeText={text => handleFieldChange('email', text)}
            style={{ width: '100%', height: responsiveHeight(7), borderRadius: 10, backgroundColor: '#fff', fontSize: 18, paddingHorizontal: 5, paddingVertical: 5 }}
            placeholderTextColor={{ color: '#000' }}
            keyboardType='email-address'
          />
        </View>
        {/*  */}
        <View style={{ width: '80%', justifyContent: 'flex-start', marginTop: 10 }}>
          <Text style={{ fontSize: responsiveFontSize(3), fontWeight: 'bold' }}> FULLNAME</Text>
          <TextInput placeholder='03xxxxxx99' value={userInfoUpload.full_name}
            onChangeText={text => handleFieldChange('full_name', text)}
            style={{ width: '100%', height: responsiveHeight(7), borderRadius: 10, backgroundColor: '#fff', fontSize: 18, paddingHorizontal: 5, paddingVertical: 5 }}
            placeholderTextColor={{ color: '#000' }}
          />
        </View>
        <TouchableOpacity style={{ width: '40%', height: 30, backgroundColor: '#e84c4f', alignItems: 'center', marginTop: 20, borderRadius: 10 }} onPress={() => handelSave()}>
          <Text style={{ fontSize: 20, color: 'white' }}>SAVE </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>

        <TouchableOpacity style={styles.cssTouchableOpacity} onPress={() => handelLogout()}>
          <Text style={{ fontSize: 30, color: 'white' }}>Logout </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerParrent: {
    width: responsiveWidth(36),
    alignItems: 'center',
    height: responsiveHeight(18),
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    top: -70,
    backgroundColor: '#fff'
  },
  container: {
    width: '100%',
    height: responsiveHeight(20),

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: responsiveWidth(28),
    height: responsiveHeight(14),
    borderRadius: 100,
    overflow: 'hidden',

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

  },
  TextName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30
  }, cssTouchableOpacity: {
    backgroundColor: '#e84c4f', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginTop: 50, width: '70%', alignItems: 'center'
  }
});
export default Info