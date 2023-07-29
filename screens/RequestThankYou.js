import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import messageData from '../Data/message.data';

const RequestThankYou = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/RequestThankYou.png')}
          />
        </View>
        <Text style={styles.informationText}>
          {messageData.RequirementThankYou}
        </Text>
        <Text style={[styles.informationText, {fontSize: 10, fontWeight: 900}]}>
          {messageData.RequirementDescription}
        </Text>
      </View>
    </View>
  );
};

export default RequestThankYou;

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
  },
});
