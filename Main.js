import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabNavigator from './navigation/TabNavigator';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

const Main = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TabNavigator />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1,
  },
});
