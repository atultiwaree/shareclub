import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
let x;
function renderProductImage(url) {
  return <Image style={styles.imageStyle} resizeMode="contain" source={url} />;
}

const ProductCard = props => {
  const {id, proTitle, proDescription, proPricing, proImages} = props.item;

  console.log(`${proImages[0].url}`);

  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  return (
    <View style={styles.eachProductWrapper}>
      <View style={styles.productImageWrapper}>
        <FlatList
          data={proImages}
          renderItem={({item, index}) => renderProductImage(item.url)}
          keyExtractor={item => item.id}
          horizontal={true}
          pagingEnabled
          style={{height: 300}}
          showsHorizontalScrollIndicator={false}
          renderToHardwareTextureAndroid
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentProductIndex((x / 300).toFixed(0));
            console.log(x, currentProductIndex);
          }}
        />
        <View style={styles.productImageTrackerWrapper}>
          {[1, 2, 3, 4, 5, 7].map((x, i) => (
            <View
              style={[
                styles.productImageTracker,
                {
                  backgroundColor:
                    currentProductIndex == i ? '#333' : '#e7e7e7',
                  width: currentProductIndex == i ? 15 : 6,
                },
              ]}></View>
          ))}
        </View>
      </View>
      <View style={styles.productAbout}>
        <View style={styles.productTitle}>
          <Text style={styles.productTitleText}>{proTitle}</Text>
        </View>
        <View style={styles.productDescription}>
          <Text style={styles.productDescriptionText}>{proDescription}</Text>
        </View>
        <View style={styles.pricingContactWrapper}>
          <Text style={styles.priceText}>
            Pricing - ₹ <Text style={styles.priceNum}>{proPricing}</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  eachProductWrapper: {
    width: '100%',
    backgroundColor: '#e7e7e7',
    padding: 10,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 25,
  },
  productImageWrapper: {
    // padding: 2,
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  productImageTrackerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    gap: 8,
  },
  productImageTracker: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: '#333',
    // backgroundColor: '#fe961a',
  },
  imageStyle: {
    width: 300,
    aspectRatio: 1,
    flex: 1,
    // height: undefined,
  },
  productAbout: {
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  productTitle: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  productTitleText: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 16,
  },
  productDescription: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  productDescriptionText: {
    fontSize: 12,
  },
  pricingContactWrapper: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  chatText: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 30,
  },
  priceNum: {
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'Poppins-Regular',
  },
});
