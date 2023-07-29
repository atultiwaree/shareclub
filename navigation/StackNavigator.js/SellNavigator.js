import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {TransitionSpecs} from '@react-navigation/stack';

import Rooms from '../../screens/SellCategoryScreen/Rooms';
import BooksNotes from '../../screens/SellCategoryScreen/BooksNotes';
import Electronics from '../../screens/SellCategoryScreen/Electronics';
import Households from '../../screens/SellCategoryScreen/Households';
import Services from '../../screens/SellCategoryScreen/Services';
import Attire from '../../screens/SellCategoryScreen/Attire';
import HandCrafts from '../../screens/SellCategoryScreen/HandCrafts';
import Sell from '../../screens/Sell';

//!Thankyou Add product
import AddProductThankYou from '../../screens/AddProductThankYou';

const SellNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sell"
        component={Sell}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={({route}) => ({
          title: route.params.category,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="BookNotes"
        component={BooksNotes}
        options={({route}) => ({
          title: route.params.category,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="Electronics"
        component={Electronics}
        options={({route}) => ({
          title: route.params.category,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="Households"
        component={Households}
        options={({route}) => ({
          title: route.params.category,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="Services"
        component={Services}
        options={({route}) => ({
          title: route.params.category,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="Attires"
        component={Attire}
        options={({route}) => ({
          title: route.params.category,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="HandCrafts"
        component={HandCrafts}
        options={({route}) => ({
          title: route.params.category,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {fontFamily: 'Overlock-Bold'},
        })}
      />
      <Stack.Screen
        name="addProductThankYou"
        component={AddProductThankYou}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SellNavigator;
const styles = StyleSheet.create({});
