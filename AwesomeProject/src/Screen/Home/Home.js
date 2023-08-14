import React from "react";
import { Button, View, Text } from "react-native";
import { styles } from "./style";
import LinearGradient from 'react-native-linear-gradient';
import Header from "./Header";
import TopTimkiem from "./TopTimkiem";
function HomeScreen({ navigation }) {
  return (

    <View style={styles.container}>
      <Header />

      <TopTimkiem navigation={navigation}/>

       
    </View>
  );
}
export default HomeScreen;