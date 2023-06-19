import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Profile from '../../screens/Profile';

const ProfileNavigator = () => {
  function History(fuck) {
    return (
      <View>
        <Text>History</Text>
      </View>
    );
  }

  function Pinned(fuck) {
    return (
      <View>
        <Text>Pinned</Text>
      </View>
    );
  }

  function Help(fuck) {
    return (
      <View>
        <Text>Help</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Pinned" component={Pinned} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
