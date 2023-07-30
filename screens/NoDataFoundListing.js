import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import messageData from '../Data/message.data';

const NoDataFoundListing = ({message}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/search_errors_holder.png')}
          />
        </View>
        <Text style={styles.informationText}>
          {!message ? 'Sorry! no products yet for this category' : message}
        </Text>
        <Text style={[styles.informationText, {fontSize: 10, fontWeight: 900}]}>
          You can raise a request or List your own products
        </Text>
      </View>
    </View>
  );
};

export default NoDataFoundListing;

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
    fontFamily: 'Poppins-Light',
    fontWeight: '700',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 5,
  },
});
