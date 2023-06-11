import React, {useContext} from 'react';
import {AuthContext} from '../../Contexts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../screens/AuthScreens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();
import Request from '../../screens/Request';

const RequestScreenNavigator = () => {
  const {authState} = useContext(AuthContext);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
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
  }, [authState]);

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
      {!isSignedIn && !authState ? ( //is !isSignedIn
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
