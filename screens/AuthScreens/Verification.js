import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import messageConstants from '../../Data/message.data';
import {boxWithInnerText} from '../../Data/interface.data';
import {launchImageLibrary} from 'react-native-image-picker';
import Warning from '../../Data/Warning';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../redux/Slices/authSlice';

const Verification = ({navigation}) => {
  const userPersistedData = useSelector(state => state.auth.profile);
  const dispatcher = useDispatch();

  console.log(userPersistedData);

  //!Number and College States

  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [rewhatsappNumber, reSetWhatsappNumber] = useState('');
  const [goToNext, setGoToNext] = useState(false);

  //!States for all three boxes

  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [imageArray, setImageArray] = useState([]); //!For backend purpose only

  //!Warning State
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  async function selectImageBoxHandler(boxId) {
    try {
      const imageDetails = await launchImageLibrary({mediaType: 'photo'});

      let tempObj = Object.assign({});

      if (imageDetails.didCancel === true) {
        if (boxId === 1) {
          setImg1(null);
        } else if (boxId === 2) {
          setImg2(null);
        } else {
          setImg3(null);
        }
      } else {
        tempObj['uri'] = imageDetails.assets[0].uri;
        tempObj['name'] = imageDetails.assets[0].fileName;
        tempObj['fileName'] = imageDetails.assets[0].fileName;
        tempObj['type'] = imageDetails.assets[0].type;
        if (boxId === 1) {
          setImg1(tempObj);
        } else if (boxId === 2) {
          setImg2(tempObj);
        } else {
          setImg3(tempObj);
        }
      }
    } catch (e) {
      console.log(
        '🚀 ~ file: Verification.js:22 ~ selectImageBoxHandler ~ e:',
        e.messaage,
      );
    }
  }

  function nextButtonHandler() {
    if (img1 && img2 && img3) {
      console.log('Selected All');
      setImageArray([]);
      setImageArray([img1, img2, img3]);
      setGoToNext(true);
      console.log(imageArray);
    } else {
      Alert.alert('Please Select All The Images');
    }
  }

  async function submitVerifyHandler() {
    console.log('Verify Handler');
    let okay = numberMatch();

    if (okay) {
      try {
        const formData = new FormData();
        formData.append('whatsappNumber', whatsappNumber);
        for (const i of imageArray) {
          formData.append('verificationMedia', i);
        }

        let {data: verificationResponse} = await axios.post(
          `http://192.168.42.75:3000/api/v1/user/verify/${userPersistedData.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: userPersistedData.token,
            },
          },
        );

        if (verificationResponse.success === true) {
          dispatcher(
            updateUser({
              type: 'verification',
              data: verificationResponse.data.verification,
            }),
          );
        } else {
          setWarningMessage('Something went wrong');
          setShowWarning(true);
        }
      } catch (error) {
        console.log('Error SubmitVeriyHandler', error);
      }
    }
  }

  const DynamicSelectionDisplay = ({item}) => {
    //!Was to display particular image to place where the box was clicked
    if (item.id === 1) {
      return (
        <View>
          {img1 === null ? (
            <Text style={styles.boxText}>{item.data}</Text>
          ) : (
            <Image
              resizeMode="stretch"
              source={{uri: img1.uri, height: 200, width: 200}}
            />
          )}
        </View>
      );
    } else if (item.id === 2) {
      return (
        <View>
          {img2 === null ? (
            <Text style={styles.boxText}>{item.data}</Text>
          ) : (
            <Image
              resizeMode="stretch"
              source={{uri: img2.uri, height: 200, width: 200}}
            />
          )}
        </View>
      );
    } else {
      return (
        <View>
          {img3 === null ? (
            <Text style={styles.boxText}>{item.data}</Text>
          ) : (
            <Image
              resizeMode="stretch"
              source={{uri: img3.uri, height: 200, width: 200}}
            />
          )}
        </View>
      );
    }
  };

  const Boxes = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.box}
        onPress={() => selectImageBoxHandler(item.id)}
        currentBoxId={item.id}>
        <DynamicSelectionDisplay item={item} />
      </TouchableOpacity>
    );
  };

  function numberMatch() {
    if (whatsappNumber === '' || rewhatsappNumber === '') {
      setShowWarning(true);
      setWarningMessage(messageConstants.WhatsAppNumberIsRequired);
      return false;
    } else if (whatsappNumber !== rewhatsappNumber) {
      setShowWarning(true);
      setWarningMessage(messageConstants.WhatsAppNumberNotMatch);
      return false;
    } else {
      setShowWarning(false);
      setWarningMessage('');
      return true;
    }
  }

  const fuck = async () => {
    console.log('Fuck Error');
  };

  return (
    <View style={styles.wrapper}>
      {!goToNext ? (
        <View style={styles.boxContainer}>
          <Text style={styles.disclamer}>
            {messageConstants.VerificationDisclamer}
          </Text>
          <FlatList
            data={boxWithInnerText}
            renderItem={props => <Boxes {...props} />}
          />
          <TouchableOpacity onPress={nextButtonHandler}>
            <Text style={styles.btn}>NEXT</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TextInput
            maxLength={10}
            style={styles.inputText}
            placeholder="Enter WhatsApp Number"
            keyboardType="number-pad"
            onChangeText={e => setWhatsappNumber(e)}
            value={whatsappNumber}
          />
          <TextInput
            maxLength={10}
            style={styles.inputText}
            placeholder="Enter WhatsApp Number"
            keyboardType="number-pad"
            onChangeText={e => reSetWhatsappNumber(e)}
            value={rewhatsappNumber}
          />
          <TouchableOpacity onPress={submitVerifyHandler}>
            <Text style={styles.btn}>SUBMIT & VERIFY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={fuck}>
            <Text style={styles.btn}>SU VERIFY</Text>
          </TouchableOpacity>
          {showWarning ? <Warning message={warningMessage} /> : null}
        </View>
      )}
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  boxContainer: {
    width: '100%',
    marginTop: 20,
  },
  box: {
    height: 140,
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#353535',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    marginTop: 20,
    fontSize: 15,
  },
  boxText: {
    color: '#353535',
    fontWeight: 600,
    fontSize: 15,
  },
  disclamer: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
  },
  inputText: {
    fontSize: 16,
    color: '#353535',
    borderBottomWidth: 2,
    paddingBottom: 8,
    marginVertical: 20,
    backgroundColor: 'white',
  },
});
