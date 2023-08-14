import React, { useState, useRef, useEffect } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Animated } from "react-native";
import { useStore } from "../../StoreMobx";
import requestApi from "../../Axios";
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { decodeToken } from "../../decodeToken";
const { width, height } = Dimensions.get('screen')

const ListComment = ({ id,setText,setIdCheck,idCheck }) => {
  const rootStore = useStore();
  const [userToken,setUseToken]=useState({})
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await requestApi(`comments/${id}`, 'GET')
        await rootStore.commentStore.getComment(response?.listComment)
        const token=await decodeToken()
         setUseToken(token)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchData();
  }, [id,idCheck]);
  
  


  const handleDeleteComment = async (id) => {
    rootStore.commentStore.deleteComment(id)
    await requestApi(`comments/removeComment/${id}`, 'DELETE')
  }
  const handelEditComment=async(id)=>{
   
    const kp=await requestApi(`comments/oneComment/${id}`,'GET')
    
    setIdCheck(kp.comment.id)
    setText(kp.comment.text_comment)
  }
  return (
    <>
      {
        rootStore?.commentStore?.lists?.map((item, index) => (
          <View key={index} style={{ width: width, height: 'auto', flexDirection: 'row', marginBottom: 10 }}>
            {/* img user */}
            <View style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: 100, overflow: 'hidden', marginLeft: 10 }}>

              <Image source={{ uri: `http://192.168.1.152:3000/${item?.users?.img}` }} style={{ width: 40, height: 40 }} resizeMode="cover" />

            </View>
            {/* name nd comment */}
            <View style={{ width: '70%', height: 'auto', backgroundColor: '#242526', borderRadius: 15, marginLeft: 10, padding: 10 }}>
              <Text style={{ marginLeft: 10, fontSize: 20, color: '#fff' }}>{item?.users?.full_name}</Text>
              <Text style={{ marginLeft: 10, fontSize: 15, color: '#fff' }}>{item?.text_comment}</Text>
            </View>
            {
            userToken?.id === item?.users?.id && <><View style={{ width: '70%', height: 'auto', backgroundColor: '#242526', justifyContent: 'space-around' }}>
              {/* icon edit */}
              <TouchableOpacity onPress={()=>handelEditComment(item.id)}>
                <Icon name="edit" size={30} color="#fff" />
              </TouchableOpacity>
              {/* icon delete */}
              <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
                <Icon name="trash" size={30} color="#fff" />
              </TouchableOpacity>
            </View> 
            </>
            }

          </View>

        ))

      }


    </>
  );
}
const styles = StyleSheet.create({

})
export default observer(ListComment);