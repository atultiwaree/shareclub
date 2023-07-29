import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import messageData from '../Data/message.data';

const AddProductThankYou = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/addProductThankyou.png')}
          />
        </View>
        <Text style={styles.informationText}>
          {messageData.AddProductThankYou}
        </Text>
        <Text style={[styles.informationText, {fontSize: 10, fontWeight: 900}]}>
          {messageData.AddProductThankYouDescription}
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.btn}>ADD MORE PRODUCTS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProductThankYou;

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
  btn: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 25,
    paddingVertical: 16,
    backgroundColor: '#333',
    borderRadius: 30,
    textAlign: 'center',
    // marginBottom: 50,
    fontSize: 15,
  },
});
