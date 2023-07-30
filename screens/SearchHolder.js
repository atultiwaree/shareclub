import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import messageData from '../Data/message.data';

const SearchHolder = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/search_holder.png')}
          />
        </View>
        <Text style={styles.informationText}>{messageData.searchHolder}</Text>
      </View>
    </View>
  );
};

export default SearchHolder;

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
    fontFamily: 'Poppins-Regular',
    // fontWeight: '700',
    fontSize: 20,
    // alignSelf: 'center',
    marginBottom: 20,
  },
});
