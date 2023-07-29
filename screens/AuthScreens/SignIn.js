import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import authSystem from '../../OAuth';
import {useDispatch} from 'react-redux';
import {addUser} from '../../redux/Slices/authSlice';
import DIcon from '../../Data/DIcons';
import React from 'react';
import messageData from '../../Data/message.data';

const SignIn = () => {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const signInAndSaveToLocal = async () => {
    try {
      //Start loader
      setLoading(true);

      let ServerResponse = await authSystem
        .googleSignIn()
        .catch(e => console.log(e));

      console.log('ServerResponse', ServerResponse);

      if (ServerResponse === 'cancelled') {
        console.log('User cancelled signIn');
        setLoading(false);
      } else if (ServerResponse?.success === true) {
        console.log('🚀 ~ User logged in.', ServerResponse.data);
        dispatch(addUser(ServerResponse.data));
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/new.png')}
          />
        </View>
        <Pressable
          disabled={loading ? true : false}
          android_ripple={{color: 'white'}}
          style={[
            !loading
              ? styles.eachCategoryListWrapper
              : {...styles.eachCategoryListWrapper, justifyContent: 'center'},
          ]}
          onPress={signInAndSaveToLocal}>
          {!loading ? (
            <>
              <View style={styles.categoryIconTitle}>
                <DIcon
                  provider="Ionicon"
                  name="ios-logo-google"
                  color="#ff6584"
                  size={25}
                />
                <Text style={styles.itemTitle}>Sign in and verify</Text>
              </View>
              <View style={styles.numberOfItemsWrapper}>
                <Text style={styles.numberOfItemsText}>
                  <DIcon
                    provider="Entypo"
                    name="chevron-thin-right"
                    color="#fff"
                    size={20}
                  />
                </Text>
              </View>
            </>
          ) : (
            <ActivityIndicator
              size="small"
              color="#ff6584"
              style={{height: 28}}
            />
          )}
        </Pressable>
        <Text style={[styles.informationText, {fontSize: 10, fontWeight: 900}]}>
          {messageData.Accept}
        </Text>
      </View>
    </View>
  );
};

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
    width: 250,
  },
  //!Got Styles From home, Need to fix
  eachCategoryListWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 30,
    marginVertical: 8,
  },
  categoryIconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberOfItemsWrapper: {},
  itemTitle: {
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlignVertical: 'center',
    marginTop: 4,
  },
  numberOfItemsText: {
    color: '#c2c2c2',
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    marginTop: 4,
  },

  //!Got from pending
  informationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'justify',
  },
});

export default SignIn;
