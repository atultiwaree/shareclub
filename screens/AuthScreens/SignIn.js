import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import authSystem from '../../OAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const signInAndSaveToLocal = async () => {
    try {
      let ServerResponse = await authSystem.googleSignIn();
      await AsyncStorage.setItem(
        'ServerResponse',
        JSON.stringify(ServerResponse),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    console.log('SignOut Called');
    try {
      await authSystem.signOut();
      let x = await AsyncStorage.removeItem('ServerResponse');
      console.log(x);
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
