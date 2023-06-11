import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sell from '../../screens/Sell';
import SignIn from '../../screens/AuthScreens/SignIn';
import Verification from '../../screens/AuthScreens/Verification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from 'react-native';
import {AuthContext} from '../../Contexts';

const Stack = createNativeStackNavigator();

const PlusScreenNavigator = () => {
  /**
   * todo:So whenever asyncstorage changed, the useEffect was not calling and hence screen was not changing
   * todo:So in Main.js I call onAuthStateChange Event and passed its value by making context
   * todo:Now If there is value in storage and authState has value then verification page will render.
   */

  const {authState} = useContext(AuthContext);

  console.log(authState);

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
    /**
     * @show_signIn_when_user_Is_not_loggedIn_and_there_is_nothing_in_localstorage
     */

    <Stack.Navigator>
      {!isSignedIn && !authState ? ( //is !isSignedIn
        <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : !isSignedIn?.data?.verified ? (
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
