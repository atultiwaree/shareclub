import React from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import ProductCard from './ProductCard';
import LoadingProductsListing from './LoadingProductsListing';
import NoDataFoundListing from './NoDataFoundListing';
import {useViewCategoryProductsQuery} from '../redux/Slices/rtkQuerySlices/viewProducts';

const listAllProductlist = item => {
  return <ProductCard {...item} />;
};

const ProductListing = ({route, navigation}) => {
  const [limit, setLimit] = React.useState(3);

  const {category} = route.params;

  // console.log(category);

  const {isLoading, data, error, refetch} = useViewCategoryProductsQuery({
    category,
    type: null,
    limits: limit,
  });

  function reachEndHandler() {
    setLimit(x => x + 3);
    refetch();
  }

  const serverResponseListing = [];

  serverResponseListing.push(data);

  console.log(serverResponseListing[0]);

  if (serverResponseListing[0]?.data === null) {
    return <NoDataFoundListing message={null} />;
  }

  if (error?.message == 'Aborted') {
    return <NoDataFoundListing message={'Network error'} />;
  }

  // console.log(serverResponseListing[0]?.data);

  return (
    <View style={styles.productWrapper}>
      {isLoading ? (
        <LoadingProductsListing />
      ) : (
        <FlatList
          data={serverResponseListing[0]?.data?.products}
          renderItem={(item, index) => listAllProductlist(item)}
          style={{
            marginBottom: '22%',
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
          ListFooterComponent={() => (
            <ActivityIndicator color={'#353535'} tvParallaxShiftDistanceY />
          )}
          onEndReached={reachEndHandler}
        />
      )}
    </View>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  productWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
