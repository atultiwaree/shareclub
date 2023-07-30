import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DIcon from '../Data/DIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyGetSearchedProductsQuery} from '../redux/Slices/rtkQuerySlices/searchRtkSlice';
import NoDataFoundListing from './NoDataFoundListing';
import {setInputText} from '../redux/Slices/searchSlice';
import SearchHolder from './SearchHolder';
import {headerHideShow} from '../redux/Slices/headerSlice';
import {useFocusEffect} from '@react-navigation/native';

const Search = ({navigation}) => {
  const dispatch = useDispatch();

  const searchedText = useSelector(state => state.search.searchedText);

  const [myList, setMyList] = useState();

  function clearSearchResults() {
    dispatch(setInputText({type: 'clear'}));
  }

  const [trigger, {isLoading}] = useLazyGetSearchedProductsQuery();

  useEffect(() => {
    console.log(searchedText);
    const handleGetUsers = async searchedText => {
      if (searchedText.length > 2) {
        const {
          data: usersData,
          isLoading,
          error,
        } = await trigger({searchedText}, false);
        console.log('Searched Text', searchedText, usersData);
        setMyList(usersData);
      } else {
        setMyList([]); //Qki skip kaam nai karr raha tha
      }
    };
    handleGetUsers(searchedText); //!ise all karna he padege regardless of text lower or greater than 3
  }, [searchedText]);

  //! I used this because useEffect can't work here
  useFocusEffect(
    React.useCallback(() => {
      console.log('Comed');
      dispatch(headerHideShow({type: 'searchHeaderType', show: true}));
    }, []),
  );

  function heandleSelectedProduct(id) {
    console.log(id);
    navigation.navigate('SearchedDetails', {productId: id});
  }

  const SearchResponseTextComponet = React.useCallback(({_id, title}) => {
    return (
      <TouchableOpacity
        style={styles.listWrapper}
        onPress={heandleSelectedProduct.bind(null, _id)}>
        <Text style={styles.listText}>{title}</Text>
        <DIcon provider="Feather" name="arrow-up-right" size={25} />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.searchWrapper}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color="#353535" />
        </View>
      ) : myList?.data?.length > 0 ? (
        <FlatList
          ListHeaderComponent={() => {
            return (
              <TouchableOpacity
                style={styles.searchResultRemove}
                onPress={clearSearchResults}>
                <DIcon name={'cross'} provider={'Entypo'} color="red" />
                <Text style={styles.searchResultRemoveText}>Clear</Text>
              </TouchableOpacity>
            );
          }}
          style={styles.listProductFlatlist}
          data={myList.data}
          renderItem={({item, index}) => (
            <SearchResponseTextComponet {...item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : searchedText.length > 2 ? (
        <NoDataFoundListing />
      ) : (
        <SearchHolder />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchWrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  listWrapper: {
    borderColor: '#353535',
    padding: 10,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  listText: {
    color: '#353535',
    fontSize: 16,
    flexWrap: 'wrap',
    fontWeight: '600',
    flexBasis: '80%',
  },
  listProductFlatlist: {
    marginBottom: '20%',
  },
  searchResultRemove: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    width: '25%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#353535',
  },
  searchResultRemoveText: {
    fontFamily: 'Poppins-bold',
    color: 'white',
  },
});
