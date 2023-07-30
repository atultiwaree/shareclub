import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {categoryList} from '../Data/CategoryList';
import DIcon from '../Data/DIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const Home = ({navigation}) => {
  return (
    <View style={styles.homeWrapper}>
      {/* Header/container - logo */}
      <View style={styles.hederContainer}>
        {/* Logo */}
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: responsiveFontSize(4.5),
            color: '#353535',
          }}>
          Shareclub
        </Text>
      </View>
      {/* Category Container - title, categories */}

      <View style={styles.categoryWrapper}>
        <View style={styles.categoryListWrapper}>
          <FlatList
            data={categoryList}
            renderItem={({item, index}) => (
              <Pressable
                android_ripple={{color: 'white'}}
                onPress={() =>
                  navigation.navigate('ProductListing', {
                    id: item.id,
                    title: item.title,
                    category: item.category,
                  })
                }
                style={styles.eachCategoryListWrapper}>
                <View style={styles.categoryIconTitle}>
                  <DIcon
                    provider={item.provider}
                    name={item.iconName}
                    color={'#fff'}
                    size={responsiveWidth(7)}
                  />
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
                {/* <View style={styles.numberOfItemsWrapper}>
                  <Text style={styles.numberOfItemsText}>
                    {`${item.numberOfItems} Items`}
                  </Text>
                </View> */}
              </Pressable>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  hederContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryWrapper: {
    flex: 1,
    marginTop: 30,
  },
  categoryListWrapper: {
    padding: 5,
  },
  eachCategoryListWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(8),
    marginVertical: responsiveHeight(1.2),
  },
  categoryIconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberOfItemsWrapper: {},
  itemTitle: {
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    textAlignVertical: 'center',
    marginTop: 4,
  },
  numberOfItemsText: {
    color: '#c2c2c2',
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    marginTop: 4,
  },
});
