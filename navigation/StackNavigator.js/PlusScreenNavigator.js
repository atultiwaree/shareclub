import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sell from '../../screens/Sell';
import SignIn from '../../screens/AuthScreens/SignIn';
import Verification from '../../screens/AuthScreens/Verification';
import Pending from '../../screens/AuthScreens/Pending';
const Stack = createNativeStackNavigator();
import {useSelector} from 'react-redux';

const PlusScreenNavigator = () => {
  const getProfile = useSelector(state => state.auth.profile);

  let {id, verification, active, token} = getProfile;

  return (
    <Stack.Navigator>
      {Object.keys(getProfile).length === 0 ? (
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
      ) : verification === false ? (
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />
      ) : verification === true && active === false ? (
        <Stack.Screen
          name="Pending"
          component={Pending}
          options={{headerShown: false}}
        />
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
