import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

function Footer({ setStateChange,stateChang }) {
    return (
        <View style={{
            alignItems: 'center', width: '100%', height: responsiveHeight(30), marginTop: 60
        }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Poppins-Black', color: 'black' }}>-OR SIGN IN WITH-</Text>
            <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'space-around', marginTop: 40 }}>
                {/* create icon */}
                <View style={styles.iconContainer}>
                    <Icon name="facebook" size={30} color="#ffffff" />
                </View>
                <View style={styles.iconContainer}>
                    <Icon name="google" size={30} color="#ffffff" />
                </View>
                <View style={styles.iconContainer}>
                    <Icon name="instagram" size={30} color="#ffffff" />
                </View>
            </View>
            {stateChang === 'SIGN_IN' ?
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 30 }}>Don't have acount?
                    <Text style={{ color: '#e84c4f' }} onPress={() => setStateChange('SIGN_UP')} >Sign up</Text>

                </Text>
                : <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 30 }}>Do you already have an acount?
                    <Text style={{ color: '#e84c4f' }} onPress={() => setStateChange('SIGN_IN')} >Sign in</Text>

                </Text>}
        </View>

       
    )

}

export default Footer