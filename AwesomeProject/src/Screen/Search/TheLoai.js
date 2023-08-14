import React, { useState,useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import requestApi from '../../Axios';
const { width, height } = Dimensions.get('screen')
function TheLoai({ navigation }) {
  
  const [data, setData] = useState([]);
  const [LIST, setList] = useState([]);
  const [id,setID]=useState('1')
useEffect(()=>{
const resAPI=async()=>{
    const kp= await requestApi('theloais','GET')
    setData(kp.theloai)

    const kp1 = await requestApi(`phims/theloai/${id}`,'GET')
    setList(kp1.list)
}
resAPI()
},[id])
  const handleItemPress =async (item) => {
  

     try {
        const kp = await requestApi(`phims/theloai/${item}`,'GET')
        
        setList(kp.list)
     } catch (error) {
        console.log('khong the get type tthe loai',error);
     }
       
   
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent1}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item,index)=>(
            <TouchableOpacity
          style={[
            styles.item
          ]}
          onPress={() => handleItemPress(item.id_theloai)}
          key={index}
        > 
          <Text style={styles.itemText}>{ item.name_theloai}</Text>
        </TouchableOpacity>
        ))}
        
        

      </ScrollView>
      {/* show data phim to theloai */}
      <View style={{ width: width, height: height, backgroundColor: '#1f201e', padding: 10 }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.strollView}
            >
                {LIST && LIST.map((item, index) => (
                    <View style={styles.container1} key={index}>
                    <View style={styles.row}>
                        <>
                            <TouchableOpacity style={styles.column} key={index} onPress={() => navigation.navigate('Phim', { id: item.id })}>
                                <Image source={{ uri: `http://192.168.1.152:3000/${item?.img_nen}` }}style={styles.image2} resizeMode="cover" />
                                <View style={{ width: '40%', padding: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>{item.namePhim}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>Tập: {item.tapphim}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>Ngày phát hành: {item.ngay_phat_hanh}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>Điểm đánh giá: {item.diem_danh_gia}</Text>
                                    <TouchableOpacity onPress={() => handelDelete(item.id)}>
                                        <Icon1 name="trash" size={30} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                        </>

                    </View>
                </View>
                ))}
                <View style={{ width: width, height: height * 0.2 }}></View>
            </ScrollView>
        </View>
      </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: responsiveHeight(10),

    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  TextTitle: {
    fontSize: responsiveFontSize(3),
    marginLeft: '20%',
    fontWeight: 'bold',
    color: '#000'
  },
  scrollViewContent1: {
    flexDirection: 'row',
  },
  item: {
    width: 110,
    height: 50,
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5
  },
  itemText: {
    fontSize: 16,
    color: '#000', marginLeft: 5,fontWeight:'bold'
  },
  strollView: {
    marginTop: 20
}, container1: {

},
row: {

},
column: {
    width: '100%', // 50% chiều ngang của View con để hiển thị hai cột bên trong mỗi hàng.
    height: 180,

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
export default TheLoai