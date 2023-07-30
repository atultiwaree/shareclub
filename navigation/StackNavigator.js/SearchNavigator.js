import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Search from '../../screens/Search';
import SearchedDetails from '../../screens/SearchedDetails';

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchProducts"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchedDetails"
        component={SearchedDetails}
        options={{
          headerShown: true,
          headerTitle: 'Product in detail',
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
          headerStyle: {backgroundColor: 'transparent'},
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
