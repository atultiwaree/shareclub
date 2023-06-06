import {StyleSheet, View, FlatList} from 'react-native';
import ProductCard from './ProductCard';
import {productDetails} from '../Data/CategoryList';

const listAllProductlist = item => {
  // console.log('ListAlProductList ', item);
  return <ProductCard {...item} />;
};

const ProductListing = ({route, navigation}) => {
  // const {id, category} = route.params;

  return (
    <View style={styles.productWrapper}>
      <FlatList
        data={productDetails}
        renderItem={(item, index) => listAllProductlist(item)}
        style={{
          marginBottom: '22%',
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        // pagingEnabled
      />
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
