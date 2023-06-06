import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home'; //Entry point
import ProductListing from '../../screens/ProductListing';
import SignInModel from '../../screens/SignInModel';

const Stack = createNativeStackNavigator();

const headerStyle = {
  position: 'absolute',
  backgroundColor: 'transparent',
  zIndex: 100,
  top: 0,
  left: 0,
  right: 0,
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
};

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductListing"
        component={ProductListing}
        options={({route}) => ({
          title: route.params.title,
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: headerStyle,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
