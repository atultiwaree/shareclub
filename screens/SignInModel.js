import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SignInModel = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};

export default SignInModel;

const styles = StyleSheet.create({});
