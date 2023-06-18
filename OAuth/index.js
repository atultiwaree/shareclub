import {memo, useMemo, useCallback} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';

GoogleSignin.configure({
  webClientId:
    '767461995337-diliqc40kcs1enk8sn8a27g173pbuuft.apps.googleusercontent.com',
  offlineAccess: true,
});

const googleSignIn = async () => {
  try {
    /**
     * todo1: generated Id token from googleSignin
     * todo2:  Create a Google credential with the token
     * todo3: Sign-in to firebase the user with the credential
     * !->uid: mainINfo.user.uid [User Id]
     * todo4: Get access token for server verification
     * !->firebaseAuthToken [token for sending to server],
     * @auth : Refers to firebaseStuff
     * */

    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const mainINfo = await auth().signInWithCredential(googleCredential);

    const firebaseAuthToken = await auth().currentUser.getIdToken();

    /*
      #Requesting to node-server for token, uid, verified
      **/

    let {data: serverResponse} = await axios.post(
      `http://192.168.42.75:3000/api/v1/user/googleauth/${mainINfo.user.uid}`,
      {
        deviceModel: DeviceInfo.getModel(),
        deviceId: DeviceInfo.getDeviceId(),
      }, //Must be sent otherwise will send error
      {
        headers: {
          authtoken: firebaseAuthToken,
          'Content-Type': 'application/json',
        },
      },
    );

    // console.log(
    //   '🚀 ~ file: Plus.js:95 ~ googleSignIn ~ serverResponse:',
    //   serverResponse,
    // );

    return serverResponse;
  } catch (e) {
    console.log('🚀 ~ file: Plus.js:81 ~ signInErrors ~ e:', e);
  }
};

const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await auth().signOut();
    console.log('Sign out');
  } catch (error) {
    console.error(error);
  }
};

const authSystem = {
  googleSignIn,
  signOut,
};

export default authSystem;
