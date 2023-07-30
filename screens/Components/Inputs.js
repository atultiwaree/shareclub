import {StyleSheet, TextInput} from 'react-native';

const TextInputs = ({keyboardType, placeholder}) => {
  return (
    <TextInput
      maxLength={10}
      style={styles.inputText}
      placeholder={placeholder}
    />
  );
};

export {TextInputs};

const styles = StyleSheet.create({
  //!From Verificaiton
  inputText: {
    fontSize: 16,
    color: '#353535',
    borderBottomWidth: 2,
    paddingBottom: 8,
    marginVertical: 20,
    backgroundColor: 'white',
  },
});
