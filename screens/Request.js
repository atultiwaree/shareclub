import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useState, useRef} from 'react';
import React from 'react';
import RequestThankYou from './RequestThankYou';
import messageData from '../Data/message.data';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Request = () => {
  const persistedUserData = useSelector(state => state.auth.profile);

  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [rewhatsappNumber, reSetWhatsappNumber] = useState('');
  const [requiredContet, setRequiredContent] = useState('');
  const [loading, setLoading] = useState('');

  const [sentRequest, setSentRequest] = useState(false);

  async function sendRequest() {
    if (whatsappNumber !== rewhatsappNumber) {
      ToastAndroid.showWithGravity(
        'Both whatsapp number must be same',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (whatsappNumber.length != 10) {
      ToastAndroid.showWithGravity(
        'Enter valid phone number',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (requiredContet === '') {
      ToastAndroid.showWithGravity(
        'Please write your requirements',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (requiredContet.length < 50) {
      ToastAndroid.showWithGravity(
        'Please provide little more description',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      try {
        setLoading(true);
        // formRef.current.reset();
        let {data: requestServerResponse} = await axios.post(
          `https://shareclub.shridaan.com/api/v1/user/requirement/${persistedUserData.id}`,
          {
            whatsappNumber: whatsappNumber,
            requirement: requiredContet,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              token: persistedUserData.token,
            },
          },
        );

        if (requestServerResponse.success === true) {
          console.debug(requestServerResponse.message);
          setWhatsappNumber('');
          reSetWhatsappNumber('');
          setRequiredContent('');
          setLoading(false);
          setSentRequest(true);
        }
      } catch (error) {
        console.log('Request page network', error);
      }
    }
  }

  return !sentRequest ? (
    <KeyboardAwareScrollView
      extraHeight={200}
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/request.png')}
            style={styles.imageStyle}
          />
        </View>

        <TextInput
          maxLength={10}
          style={styles.inputText}
          placeholder="Enter whatsapp number"
          keyboardType="number-pad"
          onChangeText={e => setWhatsappNumber(e)}
          value={whatsappNumber}
          editable={loading ? false : true}
        />
        <TextInput
          maxLength={10}
          style={styles.inputText}
          placeholder="Re-enter whatsapp number"
          keyboardType="number-pad"
          onChangeText={e => reSetWhatsappNumber(e)}
          value={rewhatsappNumber}
          editable={loading ? false : true}
        />
        <TextInput
          multiline={true}
          numberOfLines={10}
          placeholder={messageData.Requirement}
          onChangeText={e => setRequiredContent(e)}
          value={requiredContet}
          editable={loading ? false : true}
          style={[
            {
              height: 140,
              textAlignVertical: 'top',
            },
            styles.inputText,
          ]}
        />
      </View>
      <View style={{paddingHorizontal: 22, marginBottom: 40}}>
        <TouchableOpacity
          onPress={sendRequest}
          disabled={loading ? true : false}>
          <Text style={styles.btn}>
            {!loading ? (
              `SEND REQUEST`
            ) : (
              <ActivityIndicator size="small" color="#ff6584" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  ) : (
    <RequestThankYou />
  );
};

export default Request;

const styles = StyleSheet.create({
  //!Got from home page
  wrapper: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    display: 'flex',
    flex: 1,
  },
  requestText: {
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    fontSize: 10,
    fontWeight: 900,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },

  //!From Verificaiton
  inputText: {
    fontSize: 14,
    color: '#353535',
    borderBottomWidth: 2,
    paddingBottom: 8,
    marginVertical: 20,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
  },

  //!Got from pending
  btn: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 25,
    paddingVertical: 16,
    backgroundColor: '#333',
    borderRadius: 30,
    textAlign: 'center',
    // marginBottom: 20,
    fontSize: 15,
  },
});
