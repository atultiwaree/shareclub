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

      let result = await AsyncStorage.getItem('ServerResponse');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={signInAndSaveToLocal}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={authSystem.signOut}>
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
