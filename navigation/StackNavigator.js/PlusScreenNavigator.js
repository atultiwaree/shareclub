import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sell from '../../screens/Sell';
import SignIn from '../../screens/AuthScreens/SignIn';
import Verification from '../../screens/AuthScreens/Verification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

const PlusScreenNavigator = () => {
  const [isSignedIn, setIsSignedIn] = React.useState();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getAsyncValue() {
      let gotValue = await AsyncStorage.getItem('ServerResponse');
      setIsSignedIn(JSON.parse(gotValue));
      setIsLoading(false);
    }
    getAsyncValue().catch(e =>
      console.log('Under UseEffect In PlusScreenNavigator', e.message),
    );
  }, []);

  function Loading() {
    return (
      <View style={{backgroundColor: 'red'}}>
        <Text>loading.....</Text>
      </View>
    );
  }

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Loading />;
  }

  return (
    <Stack.Navigator>
      {isSignedIn ? ( //is !isSignedIn
        <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : !isSignedIn.data.verified ? (
        <Stack.Group>
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen
          name="Sell"
          component={Sell}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default PlusScreenNavigator;
