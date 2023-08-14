import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import CompomentInput from './CompomentInput'
import Footer from './Footer';
const SIGN_IN = 'SIGN_IN'
const SIGN_UP = 'SIGN_UP'
function LoginPage({ navigation }) {
    const [stateChang, setStateChange] = useState(SIGN_IN)
    const handelChangPage = () => {
        setStateChange(SIGN_UP)
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>

            <View style={{
                justifyContent: 'center', alignItems: 'center', width: '100%', height: responsiveHeight(15),
            }}>
                <Text style={{
                    fontSize: 30, fontFamily: 'Poppins-Black', color: '#e84c4f', letterSpacing: 10,    borderColor: '#e84c4f', position: 'relative', top: -5, margin: -5
                }}>
                    CINEMAX
                </Text>
        

            </View>
            <View style={{ width: '80%' }}>
                <Text style={{ fontSize: 15, fontFamily: "Poppins-Black", color: '#e84c4f', }}>LOGIN TO YOUR ACCOUNT</Text>
            </View>

            <CompomentInput stateChang={stateChang}  navigation={ navigation}/>

            {/*Footer Page*/}
            <Footer setStateChange={setStateChange} stateChang={stateChang} />

        </SafeAreaView>
    );
}
export default LoginPage