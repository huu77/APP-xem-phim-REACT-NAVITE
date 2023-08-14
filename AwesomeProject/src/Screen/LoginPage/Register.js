import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import requestApi from '../../Axios';

function Register({ navigation }) {
    const [formData, setFormData] = useState({
        user_name: '',
        password: '',
        confirmPassword: '',
        email: '',
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
        // check confirmpassword
        if (formData.password !== formData.confirmPassword) {
            enrrors.confirmPassword = 'confirmPassword do not match.';
        }
        //  
        if (!formData.email || formData.email.trim() === '') {
            enrrors.email = 'Please enter a valid email.';
        } else {
            if (!isValidEmail(formData.email)) {
                enrrors.email = 'Invalid email format!';
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

    const handleRegister = async () => {
        const enrrors = {}
         
        
        // checxk valid
        let valid = isValidation()
        if (valid) {
            // request axios
            const apiUrl = 'api/v1/register';
            const requestData = {
                user: {
                    user_name: formData.user_name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                }
            };
           
            try {
                SetErr({})
                const loginResult = await requestApi(apiUrl, 'POST', requestData);
                enrrors.success="Ban da dk thanh cong"
               
                if (Object.keys(enrrors).length > 0) {
                    SetErr(enrrors)
                    navigation.navigate('LoginPage')
                }
                else {
                    SetErr({})
                }
                console.log("ban da dk thanh cong",formData);
               
            } catch (error) {
                 // Tắt loading nếu có lỗi
                enrrors.loi = "Xem lai thong tin dang ki!";
                console.log(error);
                if (Object.keys(enrrors).length > 0) {
                    SetErr(enrrors)
                     
                }
                else {
                    SetErr({})
                }

            }
          
        }else {
            SetErr({}); // Xóa thông báo lỗi khi đăng ký lại
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
                    value={formData.user_name}
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
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                />
                {err.password && <Text style={styles.errorText}>{err.password}</Text>}

            </View>

            <View style={{
                justifyContent: 'center', width: '80%', height: responsiveHeight(20), marginTop: 40
            }}>
                <TextInput
                    style={[
                        styles.textInput,
                        err.confirmPassword && { borderColor: 'red' }
                    ]}
                    placeholderTextColor="#808080"
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                />
                {err.confirmPassword && <Text style={styles.errorText}>{err.confirmPassword}</Text>}

                <TextInput
                    style={[
                        styles.textInput,
                        err.email && { borderColor: 'red' }
                    ]}
                    placeholderTextColor="#808080"
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
                {err.email && <Text style={styles.errorText}>{err.email}</Text>}

                <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: '#e84c4f', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}  >
                    <Text style={{ fontSize: 30, color: 'white' }}>SIGN UP</Text>
                </TouchableOpacity>
                {err.loi && <Text style={styles.errorText}>{err.loi}</Text>}
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
export default Register