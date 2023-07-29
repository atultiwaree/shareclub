import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {headerHideShow} from '../../redux/Slices/headerSlice';
import {productDetails} from '../../Data/CategoryList';
import ListedProductCards from './ListedProductCards';
import LoadingProductListed from './LoadingProductListed';
import {useGetAllListedProductsQuery} from '../../redux/Slices/rtkQuerySlices/listedProductsRtkSlice';
import NoListingByUser from './NoListingByUser';

const listAllProductlist = item => {
  return <ListedProductCards {...item} />;
};

const MyListedProducts = () => {
  /*
   * For layouts
   */
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(headerHideShow({type: 'profileheader', show: false}));
  }, []);

  /*
   * For loading data
   */

  const {id: userId, token: userToken} = useSelector(
    state => state.auth.profile,
  );

  const {
    data: serverResponse,
    error,
    isLoading,
  } = useGetAllListedProductsQuery({
    userId,
    userToken,
  });

  // console.log(JSON.stringify(serverResponse.data.productsListedByUser));

  return (
    <View style={styles.productWrapper}>
      {isLoading ? (
        <LoadingProductListed />
      ) : serverResponse?.data?.productsListedByUser?.length === 0 ? (
        <NoListingByUser />
      ) : (
        <FlatList
          data={serverResponse?.data?.productsListedByUser}
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

export default MyListedProducts;

const styles = StyleSheet.create({
  productWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
