import React, { useState ,useRef,useEffect} from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Animated } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { Screen } from "react-native-screens";
import Video from 'react-native-video';
import requestApi from "../../Axios";
const { height } = Dimensions.get('screen')
 
function SrcVideo({ navigation,id }) {
   
    return (

        <View style={{ width: '100%', height: height * 0.3, borderRadius: 10, overflow: 'hidden', marginTop: 10, alignItems: 'center' }}>

          <Video
            source={{uri:`http://192.168.1.152:3000/phims/${id}`}}
            style={{ width: '95%', height: '100%' }}
            controls={true} // Hiển thị các điều khiển của video (play, pause, vv.).
            resizeMode="cover" // Để video đầy màn hình mà không làm biến dạng.
          />

        </View>

    );
}
const styles = StyleSheet.create({
    
})
export default SrcVideo;