import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import messageData from '../../Data/message.data';

const PinnedItemsPlaceholder = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/PinnedHolder.png')}
          />
        </View>
        <Text style={styles.informationText}>{messageData.NoPinnedItems}</Text>
      </View>
    </View>
  );
};

export default PinnedItemsPlaceholder;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  imageContainer: {
    height: '85%',
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
