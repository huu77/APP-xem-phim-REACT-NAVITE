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
import { useStore } from '../../StoreMobx';
import { observer } from 'mobx-react';
import Pagination from './Pagination';
import ShowData from './ShowData';
const { width, height } = Dimensions.get('screen')
function Count({ navigation,searchText }) {
    const [count,setcount]=useState('5')
    const [total, setTotal] = useState('')
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const rootStore= useStore()
    useEffect(()=>{
        const resAPi=async()=>{
            rootStore.listSearch.addItem('item_per_page',count)
               //
               const result = rootStore.listSearch.lists
               const kp = await requestApi(`phims?search=${searchText}&item_per_page=${count}&page=${page}&filter=${result.filter}`, 'GET')
               rootStore.listSearch.addItem('totalCount', kp.lastPage)
               setTotal(kp.lastPage)
               setData(kp.phims)
      }
      resAPi()
    },[count,page,searchText])
 const handleItemPress=async(item)=>{
  if(count!==item){

    setcount(item)
  }
     
 }
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent1}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
            <TouchableOpacity
          style={[
            styles.item,
            count==='5' && styles.changItem
          ]}
          onPress={() => handleItemPress('5')}
         
        > 
          <Text style={styles.itemText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.item,count==='7' && styles.changItem
          ]}
          onPress={() => handleItemPress('7')}
         
        > 
          <Text style={styles.itemText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.item,count==='10' && styles.changItem
          ]}
          onPress={() => handleItemPress('10')}
         
        > 
          <Text style={styles.itemText}>10</Text>
        </TouchableOpacity>
        </ScrollView>
        <Pagination total={total}  setTotal={setTotal} page={page}  setPage={setPage} navigation={navigation}/>
          <ShowData  data={data}  setData={setData} navigation={navigation}/>
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

},changItem:{
    backgroundColor:'red'
}
});
export default observer(Count)