import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import messageConstants from '../../Data/message.data';
import {boxWithInnerText} from '../../Data/interface.data';
import {launchImageLibrary} from 'react-native-image-picker';
import Warning from '../../Data/Warning';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../redux/Slices/authSlice';
import {launchCamera} from 'react-native-image-picker';

const Verification = ({navigation}) => {
  const userPersistedData = useSelector(state => state.auth.profile);
  const dispatcher = useDispatch();

  // console.log(userPersistedData);

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

  //!Loading
  const [loading, setLoading] = useState(false);

  async function selectImageBoxHandler(boxId) {
    try {
      const imageDetails = await launchCamera({
        mediaType: 'photo',
        quality: 0.4,
      });

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
    if (img1 && img3) {
      console.log('Selected All');
      setImageArray([]);
      setImageArray([img1, img3]);
      setGoToNext(true);
    } else {
      Alert.alert('Please Select All The Images');
    }
  }

  async function submitVerifyHandler() {
    console.log('Verify Handler');
    let okay = numberMatch();

    if (okay && imageArray.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('whatsappNumber', whatsappNumber);

        for await (const i of imageArray) {
          console.log(i);
          formData.append('verificationMedia', i);
        }

        let {data: verificationResponse} = await axios.post(
          `https://shareclub.shridaan.com/api/v1/user/verify/${userPersistedData.id}`,
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
          setLoading(false);
        } else {
          setWarningMessage('Something went wrong');
          setShowWarning(true);
          setLoading(false);
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
    } else if (item.id === 3) {
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
        disabled={loading ? true : false}
        style={styles.box}
        onPress={() => selectImageBoxHandler(item.id)}
        currentBoxId={item.id}>
        <DynamicSelectionDisplay item={item} />
      </TouchableOpacity>
    );
  };

  function numberMatch() {
    if (img1 && img3) {
      console.log('Selected All');
      setImageArray([]);
      setImageArray([img1, img3]);
    } else {
      Alert.alert('Please Select All The Images');
    }

    if (whatsappNumber === '' || rewhatsappNumber === '') {
      setShowWarning(true);
      setWarningMessage(messageConstants.WhatsAppNumberIsRequired);
      return false;
    } else if (whatsappNumber !== rewhatsappNumber) {
      setShowWarning(true);
      setWarningMessage(messageConstants.WhatsAppNumberNotMatch);
      return false;
    } else if (whatsappNumber.length < 10) {
      setShowWarning(true);
      setWarningMessage(messageConstants.whatsapplength);
      return false;
    } else {
      setShowWarning(false);
      setWarningMessage('');
      return true;
    }
  }

  return (
    <View style={styles.wrapper}>
      {/* {!goToNext ? ( */}
      <View style={styles.boxContainer}>
        <FlatList
          data={boxWithInnerText}
          renderItem={props => <Boxes {...props} />}
        />
        {/* <TouchableOpacity onPress={nextButtonHandler}>
          <Text style={styles.btn}>NEXT</Text>
        </TouchableOpacity> */}
        <Text style={styles.disclamer}>
          {messageConstants.VerificationDisclamer}
        </Text>
      </View>
      {/* ) : ( */}
      <View>
        <TextInput
          maxLength={10}
          style={styles.inputText}
          placeholder="Enter WhatsApp Number"
          keyboardType="number-pad"
          onChangeText={e => setWhatsappNumber(e)}
          value={whatsappNumber}
          editable={loading ? false : true}
        />
        <TextInput
          maxLength={10}
          style={styles.inputText}
          placeholder="Enter WhatsApp Number"
          keyboardType="number-pad"
          onChangeText={e => reSetWhatsappNumber(e)}
          value={rewhatsappNumber}
          editable={loading ? false : true}
        />
        <TouchableOpacity
          disabled={loading ? true : false}
          onPress={submitVerifyHandler}>
          <Text style={styles.btn}>
            {!loading ? (
              `SEND FOR VERIFICAITON`
            ) : (
              <ActivityIndicator size="small" color="#ff6584" />
            )}
          </Text>
        </TouchableOpacity>
        {showWarning ? <Warning message={warningMessage} /> : null}
      </View>
      {/* )} */}
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
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
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
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  disclamer: {
    color: '#353535',
    fontSize: 10,
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: 10,
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
