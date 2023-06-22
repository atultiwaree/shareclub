import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import authSystem from '../OAuth';
import DIcon from '../Data/DIcons';
import {accountOptionsList} from '../Data/CategoryList';

import {useDispatch, useSelector} from 'react-redux';
import {resetUser} from '../redux/Slices/authSlice';

const Profile = () => {
  const dispatcher = useDispatch();

  const persistedUser = useSelector(state => state.auth.profile);

  const [userName, setuserName] = useState('Guest user');
  const [userImage, setuserImage] = useState(undefined);

  useEffect(() => {
    console.log('Google subscribed user.');
    const unsub = auth().onAuthStateChanged(user => {
      if (user) {
        setuserName(user.displayName);
        setuserImage(user.photoURL);
        console.log(user.photoURL);
      }
    });
    return unsub;
  });

  const signOut = async () => {
    console.log('SignOut Called');
    try {
      await authSystem.signOut(); //Google sgnout
      dispatcher(resetUser()); //Persisted user clear

      //Reset username and image

      setuserImage(undefined);
      setuserName('Guest user');
      console.log('User logged out');
    } catch (e) {
      console.log('🚀 ~ file: SignIn.js:25 ~ signOut ~ SignOut:', e.message);
    }
  };

  /**
   * !Since signout button funcitonality was different from above
   * !all list hence I made it seprate component according to signin and signout it will show of hide
   *
   */

  const SignOutButton = () => {
    return (
      <Pressable
        android_ripple={{color: 'white'}}
        style={styles.eachCategoryListWrapper}
        onPress={signOut}>
        <View style={styles.categoryIconTitle}>
          <DIcon provider="AntDesign" name="logout" color="#ff6584" size={25} />
          <Text style={styles.itemTitle}>Sign out</Text>
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
      </Pressable>
    );
  };

  return (
    <View style={styles.warpper}>
      <View style={styles.nameDpContainer}>
        <View style={styles.dpContainer}>
          <Image
            resizeMode="contain"
            source={
              userImage === undefined
                ? require('../assets/images/guestProfilef.png')
                : {uri: userImage}
            }
            style={{width: '100%', height: '100%', borderRadius: 100}}
          />
        </View>
        <Text style={styles.userName}>{`👋 Hi!, ${userName}`}</Text>
      </View>
      <View style={styles.afterProfile}>
        <FlatList
          data={accountOptionsList}
          renderItem={({item, index}) => (
            <Pressable
              android_ripple={{color: 'white'}}
              style={styles.eachCategoryListWrapper}>
              <View style={styles.categoryIconTitle}>
                <DIcon
                  provider={item.provider}
                  name={item.iconName}
                  color={'#fff'}
                  size={25}
                />
                <Text style={styles.itemTitle}>{item.title}</Text>
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
            </Pressable>
          )}
        />
        {Object.keys(persistedUser).length > 0 ? <SignOutButton /> : null}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  warpper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignItems: 'center',
  },
  nameDpContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor: '#fff',
    borderRadius: 15,
  },
  dpContainer: {
    height: 120,
    width: 120,
    borderRadius: 100,
    overflow: 'hidden',
    // borderWidth: 1,
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 16,
    marginVertical: 20,
    color: '#353535',
    fontFamily: 'Poppins-Regular',
  },
  afterProfile: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    height: '50%',
    marginTop: 20,
    paddingVertical: 10,
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
});
