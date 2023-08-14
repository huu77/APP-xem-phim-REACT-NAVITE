import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Login from './login';
import Register from './Register';
function CompomentInput({ stateChang , navigation}) {
    return (

        <View style={{
            justifyContent: 'center', width: '100%', alignItems: 'center'
        }}>
             
            {/* comfirm password */}
            {stateChang !== 'SIGN_UP' ?(
                <Login navigation={navigation}/>)
                : <Register navigation={navigation}/> }

        </View>

    )

}

export default CompomentInput