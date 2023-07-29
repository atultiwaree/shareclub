import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import {categoryList as offeredCategoryData} from '../Data/CategoryList';
import React from 'react';
import DIcon from '../Data/DIcons';
import {useDispatch} from 'react-redux';

import {headerHideShow} from '../redux/Slices/headerSlice';
import {useFocusEffect} from '@react-navigation/native';

const Boxes = ({item, navigation}) => {
  return (
    <Pressable
      style={styles.eachBox}
      android_ripple={{color: 'white'}}
      onPress={() =>
        navigation.navigate(item.category, {
          category: item.category,
          id: item.id,
        })
      }>
      <DIcon
        provider={item.provider}
        name={item.iconName}
        color={'#fff'}
        size={30}
      />
      <Text style={styles.eachBoxText}>{item.category}</Text>
    </Pressable>
  );
};

const Sell = navProps => {
  const dispatch = useDispatch();

  //! I used this because useEffect can't work here
  useFocusEffect(
    React.useCallback(() => {
      console.log('pakad liye');
      dispatch(headerHideShow({type: 'sellheader', show: true}));
    }, []),
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.eachBoxContaner}>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          data={offeredCategoryData}
          numColumns={2}
          renderItem={props => <Boxes {...props} {...navProps} />}
        />
      </View>
    </View>
  );
};

export default Sell;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },

  eachBoxContaner: {
    alignContent: 'space-around',
    height: '80%',
  },
  eachBox: {
    borderWidth: 1,
    flexBasis: '40%',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#353535',
    height: 100,
    justifyContent: 'center',
    borderRadius: 15,
    gap: 10,
  },
  eachBoxText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});
