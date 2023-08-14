import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import requestApi from "../../Axios";

const { width, height } = Dimensions.get("screen");

 
 
function TopTimkiem({ navigation }) {
    const [list, setList] = useState({})
    useEffect(() => {
        const resAPi = async () => {
            try {
                const result = await requestApi('phims?search=&item_per_page=3&page=1&filter=ASC', 'GET')
                setList(result)
                
            } catch (error) {
                console.log(error);
            }
        }
        resAPi()

    }, [])
     
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Trending</Text>

            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={width}
                decelerationRate="fast"
            >
                {list?.phims?.slice(0, 3).map((item) => (
                    <TouchableOpacity style={styles.item} key={item.id} onPress={() => navigation.navigate('Phim',{id:item.id})}>
                        <Image source={{ uri: `http://192.168.1.152:3000/${item.img_nen}` }} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Carousel */}
            <Text style={styles.text}>Phim Mơi</Text>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.strollView}
            >
                <View style={styles.container1}>
                    <View style={styles.row}>
                        {list?.phims?.map((item) => (
                            <TouchableOpacity style={styles.column} key={item.id} onPress={() => navigation.navigate('Phim',{id:item.id})}>
                                <Image source={{ uri: `http://192.168.1.152:3000/${item.img_nen}` }}  style={styles.image2} resizeMode="cover" />
                                <View style={{ width: '40%', padding: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>{item.namePhim}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>tap: {item.tapphim}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                    </View>
                   
                </View>
                <View style={{ width: width, height: 900 }}></View>
            </ScrollView>


            {/*  */}
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: "flex-start",
      height:'auto'
    },
    strollView: {
        marginTop: 20
    }, 
    text: {
        color: "rgb(180,160,110)",
        fontSize: 20,
        marginVertical: 10,
        marginLeft: 10
    },
    scrollViewContent: {
        flexDirection: "row",
         
    },
    item: {
        width: width,
        height: 200,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        marginLeft: 10,
    },
    itemText: {
        fontSize: 24,
        color: "black",
    },
    slide: {
        width: width,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        margin: 10
    },
    image: {
        width: width,
        height: '100%',
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        color: "white",
    },
    scrollView: {
        paddingVertical: 10,
    },
    container1: {
height:'auto'
    },
    row: {
height:'auto'
    },
    column: {
        width: '100%', // 50% chiều ngang của View con để hiển thị hai cột bên trong mỗi hàng.
        height: 150,

        borderBottomEndRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        flexDirection: 'row',

        justifyContent: 'space-around'
    },
    image2: {
        width: '60%',
        height: '100%',

    }

});

export default TopTimkiem;
