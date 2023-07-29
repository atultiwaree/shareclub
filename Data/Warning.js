import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Warning = ({message}) => {
  return (
    <View style={styles.warningWrapper}>
      <Text style={styles.warningText}> {message}</Text>
    </View>
  );
};

export default Warning;

const styles = StyleSheet.create({
  warningWrapper: {
    padding: 5,
    borderColor: '#444',
    margin: 20,
    // backgroundColor: '#fff',
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
  },
  warningText: {
    color: 'red',
    fontWeight: '600',
  },
});
