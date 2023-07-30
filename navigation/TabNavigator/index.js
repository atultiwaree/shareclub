import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StackNavigator from '../StackNavigator.js';
import PlusScreenNavigator from '../StackNavigator.js/PlusScreenNavigator.js';
import RequestScreenNavigator from '../StackNavigator.js/RequestScreenNavigator.js';
import ProfileNavigator from '../StackNavigator.js/ProfileNavigator.js';
import SearchNavigator from '../StackNavigator.js/SearchNavigator.js';
import DIcon from '../../Data/DIcons.js';

import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

import {useNavigation} from '@react-navigation/native';
import SearchBoxComponent from '../../screens/Components/SearchBoxComponent.js';

function screenOptions(route, color, focused) {
  let iconName;

  switch (route.name) {
    case 'Homes':
      iconName = !focused ? 'home-outline' : 'home-sharp';
      break;
    case 'Plus':
      iconName = !focused ? 'add-circle-outline' : 'add-circle-sharp';
      break;
    case 'Account':
      iconName = !focused ? 'person-outline' : 'person-sharp';
      break;
    case 'Request':
      iconName = !focused ? 'hand-right-outline' : 'hand-right-sharp';
      break;
    case 'Search':
      iconName = !focused ? 'search-outline' : 'search-sharp';
    default:
      break;
  }

  return <IonIcons name={iconName} color={color} size={28} />;
}

const tabBarStyle = {
  position: 'absolute',
  backgroundColor: '#f7f7f7',
  height: 60,
  marginBottom: 10,
  elevation: 0,
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
  borderWidth: 0,
  borderTopColor: '#fff',
};

const tabBarLableStyle = {
  marginBottom: 5,
  fontFamily: 'Overlock-Bold',
  fontSize: 12,
};

const tabBarIconStyle = {
  marginTop: 10,
};

const TabNavigator = () => {
  const sellHeaderShown_Sell = useSelector(
    state => state.header.headers.sellHeader,
  );
  const sellHeaderShown_Profile = useSelector(
    state => state.header.headers.profileHeader,
  );
  const searchHeaderShown = useSelector(
    state => state.header.headers.searchHeader,
  );

  console.log('lauda', searchHeaderShown);
  const nav = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => screenOptions(route, color, focused),
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#000',
        tabBarStyle: tabBarStyle,
        tabBarLabelStyle: tabBarLableStyle,
        tabBarIconStyle: tabBarIconStyle,
        headerLeft: () => {
          return (
            <Pressable
              onPress={() => nav.goBack()}
              style={{
                marginLeft: 20,
              }}>
              <DIcon name="arrow-left" provider={'Feather'} />
            </Pressable>
          );
        },
      })}>
      <Tab.Screen
        name="Homes"
        component={StackNavigator}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          headerTitleStyle: {display: 'none'},
          headerShown: searchHeaderShown,
          headerRight: () => {
            return <SearchBoxComponent />;
          },
        }}
      />
      <Tab.Screen
        name="Plus"
        component={PlusScreenNavigator}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          title: 'List it',
          headerShown: sellHeaderShown_Sell,
          headerTitle: 'What are you offering ?',
          headerTitleStyle: {
            fontFamily: 'Overlock-Bold',
          },
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestScreenNavigator}
        options={{
          title: 'Need',
          tabBarStyle: {
            display: 'none',
          },
          headerTitle: 'Tell us, what you want ?',
          headerTitleStyle: {
            fontFamily: 'Overlock-Bold',
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileNavigator}
        options={{
          headerShown: sellHeaderShown_Profile,
          headerTitle: 'My account',
          headerTitleStyle: {
            fontFamily: 'Overlock-Bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
