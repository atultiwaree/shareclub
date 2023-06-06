import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StackNavigator from '../StackNavigator.js';
import PlusScreenNavigator from '../StackNavigator.js/PlusScreenNavigator.js';
import Profile from '../../screens/Profile.js';
import Request from '../../screens/Request.js';

const Tab = createBottomTabNavigator();

function Search() {
  return (
    <View style={styles.screen}>
      <Text>Search</Text>
    </View>
  );
}

function screenOptions(route, color, focused) {
  let iconName;

  switch (route.name) {
    case 'Homes':
      iconName = !focused ? 'home-outline' : 'home-sharp';
      break;
    case 'Plus':
      iconName = !focused ? 'add-circle-outline' : 'add-circle-sharp';
      break;
    case 'Profile':
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
  const [randomState, setRandomState] = React.useState(false);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => screenOptions(route, color, focused),
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#000',
        tabBarStyle: tabBarStyle,
        tabBarLabelStyle: tabBarLableStyle,
        tabBarIconStyle: tabBarIconStyle,
      })}>
      <Tab.Screen
        name="Homes"
        component={StackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Plus" component={PlusScreenNavigator} />
      <Tab.Screen name="Request" component={Request} />
      <Tab.Screen name="Profile" component={Profile} />
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
