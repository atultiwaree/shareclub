import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import authSystem from '../../OAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, resetUser} from '../../redux/Slices/authSlice';
const SignIn = () => {
  // console.log(
  //   'Authenticte',
  //   useSelector(state => state.auth),
  // );

  const dispatch = useDispatch();

  const signInAndSaveToLocal = async () => {
    try {
      let ServerResponse = await authSystem.googleSignIn();

      if (ServerResponse.success === true) {
        console.log(
          '🚀 ~ file: SignIn.js:19 ~ signInAndSaveToLocal ~ ServerResponse:Got Server Response',
        );
        dispatch(addUser(ServerResponse.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    console.log('SignOut Called');
    try {
      await authSystem.signOut();
      dispatch(resetUser());
    } catch (e) {
      console.log('🚀 ~ file: SignIn.js:25 ~ signOut ~ SignOut:', e.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={signInAndSaveToLocal}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
