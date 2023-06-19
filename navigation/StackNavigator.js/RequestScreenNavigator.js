import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../screens/AuthScreens/SignIn';
const Stack = createNativeStackNavigator();
import Request from '../../screens/Request';

import {useSelector} from 'react-redux';

const RequestScreenNavigator = () => {
  const persistedUserData = useSelector(state => state.auth.profile);

  return (
    <Stack.Navigator>
      {Object.keys(persistedUserData).length === 0 ? (
        <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen
          name="RequestPageFromStack"
          component={Request}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default RequestScreenNavigator;
