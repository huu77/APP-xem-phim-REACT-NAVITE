import React, { useState, useRef, useEffect } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Animated } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import requestApi from "../../Axios";
import { useStore } from "../../StoreMobx";
import { decodeToken } from "../../decodeToken";
import { binarySearch } from "../../algorithm";


function Header({ navigation, id, userToken }) {
    const rootStore = useStore();
    const [isHeart, setIsheart] = useState(false)

    useEffect(() => {
        // handel like heart
        const resAPI = async () => {
            const token = await decodeToken()
            const data = await requestApi(`likeList/${token.id}`, 'GET')
            rootStore.likeListStore.getList(data.data)
            const likelist = rootStore.likeListStore.lists
            const sortedListsAsString = likelist.map((item) => item.id)
            
            //change string
            const sortedLists = sortedListsAsString.map(Number);
            const idToCheckNumber = Number(id);
            //search
            const idExists = binarySearch(sortedLists, idToCheckNumber);
            
            setIsheart(idExists)

        }
        resAPI()
    }, [rootStore.likeListStore.lists])

    const handelLike = async () => {
        
        try {
            const data = {
                info: {
                    phim_like_id: id.toString(),
                    user_like_id: userToken?.id.toString(),
                    unlike: true
                }
            }
           
            const kp = await requestApi('likeList', 'POST',data)
            setIsheart(!isHeart)
            
        } catch (error) {
            console.log(error);
        }

    }

    return (

        <View style={{
            width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0)'
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="back" size={40} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handelLike()}>
                {isHeart === true ? <Icon name="heart" size={40} color="red" /> : <Icon name="hearto" size={40} color="red" />}
            </TouchableOpacity>

        </View>

    );
}
const styles = StyleSheet.create({

})
export default Header;