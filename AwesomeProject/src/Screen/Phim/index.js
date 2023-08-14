import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { useStore } from "../../StoreMobx";
import SrcVideo from "./Video";
import requestApi from "../../Axios";
import ListComment from "./ListComment";
const { width, height } = Dimensions.get('screen')
import { decodeToken } from "../../decodeToken";
import Header from "./Header";
import { observer } from 'mobx-react';
const Phim = ({ navigation, route }) => {
  const [userToken, setuserToken] = useState({})
  const rootStore = useStore();
  //get id phim
  const { id } = route.params
  const [phim, setPhim] = useState({})
  //resapi
  useEffect(() => {
    const resAPi = async () => {
      try {
        const result = await requestApi(`phims/onePhim/${id}`, 'GET')
        setPhim(result)
        const token = await decodeToken()
        setuserToken(token)

      } catch (error) {
        console.log(error);
      }
    }
    resAPi()

  }, [rootStore?.commentStore?.lists, id])


  // handel send message
  const [text, setText] = useState('')
  const [idCheck, setIdCheck] = useState('')
  const handelSend = async () => {
    if (idCheck !== '') {
      const dt = {
        info: {
          id: idCheck,
          text_comment: text
        }
      }
      rootStore.commentStore.updateComment(idCheck,text)
      setText('')
     
      // await requestApi('comments/update', 'PUT', dt)
    }
    else {
      const data = {
        info: {
          id_user: userToken.id.toString(),
          id_phim: id.toString(),
          text_comment: text
        }
      }

      try {
        if (text === "") return;
        const response = await requestApi('comments', 'POST', data)
        await rootStore.commentStore.postComment(response.data)
        setText('')
      } catch (error) {
        console.log(error);
      }

    }

  }

  return (

    <View style={styles.constainer}>

      <Header navigation={navigation} id={id} userToken={userToken} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.strollView}
      >
        {/* name */}
        <View style={{ width: width, justifyContent: 'flex-start', marginTop: 20, }}>
          <Text style={{ color: 'rgb(180,160,130)', marginLeft: 10, fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins' }}>
            {phim?.phim?.namePhim}
          </Text>
          <View style={{ width: '100%', height: height * 0.3, borderRadius: 10, overflow: 'hidden', alignItems: 'center', marginTop: 10 }}>
            <Image source={{ uri: `http://192.168.1.152:3000/${phim?.phim?.img_nen}` }} style={{ width: '95%', height: '100%' }} resizeMode="cover" />
          </View>
        </View>
        {/* mota */}
        <View style={{ width: '100%', height: height * 0.15, borderRadius: 10, overflow: 'hidden', marginTop: 10 }}>

          <Text style={{ color: 'rgb(180,160,130)', marginLeft: 10, fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins' }}>
            DESCIPTION
          </Text>
          <Text style={{ color: '#fff', marginHorizontal: 10, fontSize: 15 }}> {phim?.phim?.mota}</Text>
        </View>


        <SrcVideo id={phim?.phim?.src} />

        {/* comment */}
        <View style={{ width: '100%', height: 'auto', margin: 10, padding: 10, }}>
          <Text style={{ color: 'rgb(180,160,130)', marginLeft: 10, fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins', marginBottom: 10 }}>
            COMMENT
          </Text>
          {/* input comment */}
          <View style={{ width: '100%', height: height * 0.1, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput placeholder="comment..." style={{ width: '75%', height: 50, borderRadius: 15, backgroundColor: '#fff', padding: 10 }} value={text} onChangeText={(value) => setText(value)} />
            <TouchableOpacity style={{ width: '15%', marginLeft: 10 }} onPress={handelSend}><Text style={{ fontSize: 20, color: '#fff' }}>Send</Text></TouchableOpacity>
          </View>

          {/* list comment */}
          <ListComment id={id} setText={setText} setIdCheck={setIdCheck} idCheck={idCheck}/>
          {/* end comment */}
        </View>

        {/*  */}
        <View style={{ width: width, height: 300 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  constainer: {
    width: '100%',
    backgroundColor: '#1f201e',

  }
})
export default observer(Phim);