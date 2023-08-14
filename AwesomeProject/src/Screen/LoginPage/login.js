import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import requestApi from '../../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Login({ navigation }) {
    const [formData, setFormData] = useState({
        user_name: '',
        password: '',
    });
    const handleInputChange = (name, value) => {

        setFormData({ ...formData, [name]: value });
    };
    //validation email
    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    //   check passord is strong
    const isStrongPassword = (password) => {
        const minLength = 8;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/;

        if (password.length < minLength) {
            return false;
        }

        if (!uppercaseRegex.test(password)) {
            return false;
        }

        if (!lowercaseRegex.test(password)) {
            return false;
        }

        if (!numberRegex.test(password)) {
            return false;
        }

        if (!specialCharRegex.test(password)) {
            return false;
        }

        return true;
    };
    //   
    const [err, SetErr] = useState({})
    //loading
    const [loading, setLoading] = useState(false);
    const isValidation = () => {
        let isValid = true
        const enrrors = {}
        //check username
        if (!formData.user_name || formData.user_name.trim() === '') {
            enrrors.user_name = "Please enter username..."
        } else {
            if (formData.user_name.length < 6) {

                enrrors.user_name = "Username must be at least 6 characters long. "
            }
        }

        //check password
        if (!formData.password || formData.password.trim() === '') {
            enrrors.password = "Please enter a valid password."
        } else {
            if (!isStrongPassword(formData.password)) {
                enrrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. "
            }
        }


        if (Object.keys(enrrors).length > 0) {
            SetErr(enrrors)
            isValid = false
        }
        else {
            SetErr({})
        }
        return isValid
    }
    //save token
    const saveTokens = async (accessToken, refreshToken) => {
        try {
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            
        } catch (error) {
            console.log('Lỗi khi lưu trữ tokens:', error);
        }
    };
    const handleRegister = async () => {
        setLoading(true);
        const errors = {};
        // Kiểm tra tính hợp lệ của dữ liệu
        let valid = isValidation();
    
        if (valid) {
          // Nếu dữ liệu hợp lệ, thực hiện đăng ký
    
          const apiUrl = 'api/v1/login';
          const requestData = {
            login: {
              user_name: formData.user_name,
              password: formData.password
            }
          };
    
          try {
            const loginResult = await requestApi(apiUrl, 'POST', requestData);
            
            saveTokens(loginResult.access_token, loginResult.refresh_token);
    
            setTimeout(() => {
              setLoading(false); // Tắt loading sau khi chờ 1 giây
              navigation.navigate('AuthStack');
            }, 1000);
          } catch (error) {
            setLoading(false); // Tắt loading nếu có lỗi
            errors.loi = "Xem lại usernam và password";
            if (Object.keys(errors).length > 0) {
                SetErr(errors)
                 
            }
            else {
                SetErr({})
            }
          }
        } else {
          setLoading(false); // Tắt loading nếu dữ liệu không hợp lệ
        }
      };
    return (

        <View style={{
            justifyContent: 'center', width: '100%', alignItems: 'center'
        }}>
            {/* Username */}
            <View style={{
                justifyContent: 'center', width: '80%', height: responsiveHeight(10)
            }}>

                <TextInput
                    style={[
                        styles.textInput,
                        err.user_name && { borderColor: 'red' }
                    ]}
                    placeholderTextColor="#808080"
                    placeholder="Username"
                    onChangeText={(value) => handleInputChange('user_name', value)}
                />
                {err.user_name && <Text style={styles.errorText}>{err.user_name}</Text>}
            </View>

            {/* password */}
            <View style={{
                justifyContent: 'center', width: '80%', height: responsiveHeight(10)
            }}>
                <TextInput
                    style={[
                        styles.textInput,
                        err.password && { borderColor: 'red' }
                    ]}
                    placeholderTextColor="#808080"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(value) => handleInputChange('password', value)}
                />
                {err.password && <Text style={styles.errorText}>{err.password}</Text>}
            </View>

            <View style={{
                justifyContent: 'center', width: '80%', height: responsiveHeight(20)
            }}>
                <Spinner
                    visible={loading}
                    textContent={'Đang chuyển trang...'}
                    textStyle={{ color: '#fff' }}
                />
                {err.loi &&  <Text style={{ color: 'red' }}>{err.loi}</Text>}

                <TouchableOpacity style={{ backgroundColor: '#e84c4f', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}
                    onPress={handleRegister}
                >
                    <Text style={{ fontSize: 30, color: 'white' }}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>

    )

}
const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        fontFamily: 'Poppins-Black',
        color: '#808080',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 10,
        // Add other styles for error text if needed
    },
});
export default Login