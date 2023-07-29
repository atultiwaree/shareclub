import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import messageData from '../../Data/message.data';

const NoListingByUser = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/no_listings.png')}
          />
        </View>
        <Text style={styles.informationText}>
          There's no product you've listed so far
        </Text>
        <Text style={[styles.informationText, {fontSize: 10, fontWeight: 900}]}>
          Verified account ? If yes, start listing your products now
        </Text>
      </View>
    </View>
  );
};

export default NoListingByUser;

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
