import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Profile from '../../screens/Profile';

/*
 * Importing all screens from ProfileScreens
 */

import HelpPage from '../../screens/ProfileScreens/HelpPage';
import PinnedItems from '../../screens/ProfileScreens/PinnedItems';
import MyListedProducts from '../../screens/ProfileScreens/MyListedProducts';

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Overlock-Bold',
        },
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PinnedItems"
        component={PinnedItems}
        options={({route}) => ({
          title: route.params.profilePageOpenType,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="MyListedProducts"
        component={MyListedProducts}
        options={({route}) => ({
          title: route.params.profilePageOpenType,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="HelpPage"
        component={HelpPage}
        options={({route}) => ({
          title: route.params.profilePageOpenType,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
