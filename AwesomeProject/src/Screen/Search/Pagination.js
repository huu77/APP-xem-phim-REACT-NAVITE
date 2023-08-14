import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '../../StoreMobx';
import requestApi from '../../Axios';
import { observer } from 'mobx-react';

const ITEMS_PER_PAGE = 10;

const Pagination = ({total,page,setPage,navigation}) => {
  const rootStore = useStore()
   
  
 

  const handlePrevPage = async () => {
    if (page > 1) {
      setPage(page - 1);
      rootStore.listSearch.addItem('page', page - 1)
      const result = rootStore.listSearch.lists

      const kp = await requestApi(`phims?search=${result.search}&item_per_page=${result.item_per_page}&page=${result.page}&filter=${result.filter}`, 'GET')
      rootStore.listSearch.setData(kp.phims)
    }
  };

  const handleNextPage = async () => {
    if (page < total) {
      setPage(page + 1);
      rootStore.listSearch.addItem('page', page + 1)

      const result = rootStore.listSearch.lists
      const kp = await requestApi(`phims?search=${result.search}&item_per_page=${result.item_per_page}&page=${result.page}&filter=${result.filter}`, 'GET')
      rootStore.listSearch.setData(kp.phims)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePrevPage}>
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>
        Page {page} of {total}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleNextPage}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default observer(Pagination);
