import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setInputText} from '../../redux/Slices/searchSlice';

const SearchBoxComponent = () => {
  const [textValue, setTextValue] = useState('');

  const dispatch = useDispatch();

  //! Dispatch a value in accordance to
  React.useEffect(() => {
    let id = setTimeout(() => {
      dispatch(setInputText({text: textValue.replace(/^\s+|\s+$/g, '')}));
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [textValue]);

  return (
    <View style={styles.searchBoxWrapper}>
      <TextInput
        placeholder="Search..."
        style={styles.searchBoxInput}
        value={textValue}
        onChangeText={t => setTextValue(t)}
      />
    </View>
  );
};

export default SearchBoxComponent;

const styles = StyleSheet.create({
  searchBoxWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  searchBoxInput: {
    height: '85%',
    textAlignVertical: 'bottom',
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginLeft: 10,
    backgroundColor: '#f1f1f1',
  },
});
