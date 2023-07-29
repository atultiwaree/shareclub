import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {headerHideShow} from '../../redux/Slices/headerSlice';
import PinnedItemsPlaceholder from './PinnedItemsPlaceholder';
import PinnedProductCard from './PinnedProductCard';

const listAllProductlist = item => {
  return <PinnedProductCard {...item} />;
};

const PinnedItems = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(headerHideShow({type: 'profileheader', show: false}));
  }, []);

  const persistedPinnedProducts = useSelector(
    state => state.pin.everyPinnedProducts,
  );

  return (
    <View style={styles.productWrapper}>
      {persistedPinnedProducts?.length === 0 ? (
        <PinnedItemsPlaceholder />
      ) : (
        <FlatList
          data={persistedPinnedProducts}
          renderItem={(item, index) => listAllProductlist(item)}
          style={{
            marginBottom: '22%',
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
        />
      )}
    </View>
  );
};

export default PinnedItems;

const styles = StyleSheet.create({
  productWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
