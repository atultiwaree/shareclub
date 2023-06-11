import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabNavigator from './navigation/TabNavigator';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './Contexts';
import {useEffect, useState} from 'react';

const Main = () => {
  const [authState, setAuthState] = useState();

  function onAuthStateChanged(user) {
    setAuthState(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <AuthContext.Provider value={{authState}}>
        <TabNavigator />
      </AuthContext.Provider>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1,
  },
});
