import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Vibration,
  ToastAndroid,
} from 'react-native';
import ProductCard from './ProductCard';
import LoadingProductsListing from './LoadingProductsListing';
import NoDataFoundListing from './NoDataFoundListing';
import {useViewCategoryProductsQuery} from '../redux/Slices/rtkQuerySlices/viewProducts';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const listAllProductlist = item => {
  return <ProductCard {...item} />;
};

const ProductListing = ({route, navigation}) => {
  const [limit, setLimit] = React.useState(3);
  const [loadBtn, setLoadBtn] = React.useState('Load more');

  const {category} = route.params;

  // console.log(category);

  const {
    isLoading,
    data: serverResponseListing,
    error,
    refetch,
    isFetching,
  } = useViewCategoryProductsQuery({
    category,
    type: null,
    limits: limit,
  });

  function loadMoreHandler() {
    Vibration.vibrate(30);
    if (limit < Number(serverResponseListing?.data?.lenghtOfCollection) + 3) {
      setLimit(x => x + 3);
      refetch();
      ToastAndroid.showWithGravity(
        'Loading more items',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        'No more items',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      setLoadBtn("You're all caught up");
    }
  }

  if (!isLoading && serverResponseListing?.data === null) {
    return <NoDataFoundListing message={null} />;
  }

  if (error?.message == 'Aborted') {
    return <NoDataFoundListing message={'Network error'} />;
  }

  return (
    <View style={styles.productWrapper}>
      {isLoading ? (
        <LoadingProductsListing />
      ) : (
        <FlatList
          data={serverResponseListing?.data?.products}
          renderItem={(item, index) => listAllProductlist(item)}
          style={{
            marginBottom: '22%',
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={loadMoreHandler}
              disabled={isFetching ? true : false}>
              <Text style={styles.btn}>
                {isFetching ? (
                  <ActivityIndicator color={'red'} size={'small'} />
                ) : (
                  loadBtn
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  productWrapper: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5.5),
  },

  btn: {
    fontWeight: 'bold',
    color: '#353535',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: 16,
    backgroundColor: '#e3e3e3',
    borderRadius: responsiveWidth(35),
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    width: responsiveWidth(50),
    alignSelf: 'center',
    marginBottom: responsiveWidth(5),
  },
});
