import React from "react";
import { Button, View,Text ,StyleSheet,Dimensions,TouchableOpacity} from "react-native";
import { styles } from "./style";
 
import Icon from 'react-native-vector-icons/Entypo';
const {width,height}=Dimensions.get('screen')
function Header({navigation}) {
    return (
      <View style={style.container}>
        
         <Text style={style.text}>M<Text style={{color:'#fff'}}>ovie</Text></Text>
        
      </View>
    );
  }
  const style=StyleSheet.create({
    container:{
        width:width*0.9,
        height:height*0.1,
      
       justifyContent:'center',
       alignItems:'center',
       flexDirection:'row'
    },
    text:{
        color:'rgb(180,160,110)',
        fontSize:30
    }
  })
  export default Header;