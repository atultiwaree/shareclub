import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {headerHideShow} from '../redux/Slices/headerSlice';
import {useDispatch} from 'react-redux';
import {useGetSingleProductDetailQuery} from '../redux/Slices/rtkQuerySlices/singleProductDetailRtkSlice';
import ProductDetailsCardComponent from './Components/ProductDetailsCardComponent';

const listAllProductlist = item => {
  return <ProductDetailsCardComponent {...item} />;
};

const SearchedDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Hidig header');
    dispatch(headerHideShow({type: 'searchHeaderType', show: false}));
  }, []);

  console.log(route);

  const {productId} = route.params;

  const {isFetching, data: serverResponseListing} =
    useGetSingleProductDetailQuery(productId);

  console.log(serverResponseListing);

  if (isFetching) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#353535" size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={[serverResponseListing?.data]}
        renderItem={(item, index) => listAllProductlist(item)}
        style={{
          marginBottom: '22%',
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default SearchedDetails;
