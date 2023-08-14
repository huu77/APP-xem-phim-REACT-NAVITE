import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import requestApi from '../../Axios';

const imgLogo = require('../../img/logo.jpg');
const { width, height } = Dimensions.get('screen');

function WellcomePage() {
  const navigation = useNavigation();

  useEffect(() => {
    checkUserToken();
  }, []);

  const checkUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('accessToken');
      if (userToken) {
        // Nếu userToken tồn tại, chuyển hướng vào trang Main
        navigation.navigate('AuthStack');
      }
    } catch (error) {
      console.log('Lỗi khi kiểm tra userToken:', error);
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={imgLogo} style={{ width: '100%' }} />
      </View>
      <View style={styles.next}>
        <TouchableOpacity onPress={() =>
           navigation.navigate('LoginPage')
          
           }>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>Start Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.End}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}>
          Welcome to the world of great experiences!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  logo: {
    width: width,
    height: height * 0.4,
  },
  next: {
    width: width,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  End: {
    width: width,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WellcomePage;
  

