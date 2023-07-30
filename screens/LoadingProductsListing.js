import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import messageData from '../Data/message.data';

const LoadingProductsListing = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/loading_product_listed.png')}
          />
        </View>
        <Text style={styles.informationText}>
          {messageData.LoadingListedProducts}
        </Text>
        <ActivityIndicator size="large" color="#ff6584" />
      </View>
    </View>
  );
};

export default LoadingProductsListing;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  imageContainer: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 300,
  },
  informationText: {
    fontFamily: 'Overlock-Black',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'justify',
    marginBottom: 20,
  },
});
