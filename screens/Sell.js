import {View, Text, TouchableOpacity} from 'react-native';
import {updateUser} from '../redux/Slices/authSlice';
import {useDispatch} from 'react-redux';

const Sell = () => {
  const dispatcher = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatcher(updateUser({type: 'pending', data: false}))}>
      <Text>Sell</Text>
    </TouchableOpacity>
  );
};

export default Sell;
