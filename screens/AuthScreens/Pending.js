import {useSelector, useDispatch} from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import messageData from '../../Data/message.data';
import axios from 'axios';
import {updateUser} from '../../redux/Slices/authSlice';

const Pending = ({navigation}) => {
  const dispatch = useDispatch();
  const persistedData = useSelector(state => state.auth.profile);
  console.log(persistedData);

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Account is not active yet',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  async function serverStatusCheck() {
    try {
      const {data: userStatusResponse} = await axios.get(
        `http://192.168.42.75:3000/api/v1/user/status/${persistedData.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token: persistedData.token,
          },
        },
      );

      if (userStatusResponse.success === true) {
        if (userStatusResponse.data.active === true) {
          console.log('fuck you');
          dispatch(
            updateUser({type: 'pending', data: userStatusResponse.data.active}),
          );
        } else {
          showToastWithGravity();
        }
      } else throw Error('Something went wrong');
    } catch (error) {
      console.log('Error Data', error);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/approve.png')}
          />
        </View>
        <Text style={styles.informationText}>{messageData.ThanksPending}</Text>
        <Text style={[styles.informationText, {fontSize: 10, fontWeight: 900}]}>
          {messageData.PendingMessage}
        </Text>
        <TouchableOpacity onPress={serverStatusCheck}>
          <Text style={styles.btn}>CHECK MY STATUS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pending;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  imageContainer: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 300,
  },
  informationText: {
    fontFamily: 'Poppins-Regular',
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
    marginTop: 20,
    fontSize: 15,
  },
});
