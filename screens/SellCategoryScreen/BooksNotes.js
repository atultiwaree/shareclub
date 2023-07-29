import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import React, {useState} from 'react';
import {productType} from '../../Data/CategoryList';
import DIcon from '../../Data/DIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {headerHideShow} from '../../redux/Slices/headerSlice';
import {useSelector} from 'react-redux';
import axios from 'axios';

const BooksNotes = ({route, navigation}) => {
  const userPersistedData = useSelector(state => state.auth.profile);

  //!To hide and show headers
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(headerHideShow({type: 'sellheader', show: false}));
  }, []);

  //!To get name of "type" according to id
  const typeOfName = {
    1: 'Old',
    2: 'New',
    3: 'Rental',
  };

  //!To get details of the product
  const [productTypeState, setProductTypeState] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [productImage, setProductImage] = useState([]);

  //!Set functionality
  const [uploadTriggered, setUploadTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstImageSelected, setFirstImageSelected] = useState(false);

  //!To show long press image remove

  useEffect(() => {
    ToastAndroid.show('Long press to remove image', 5000);
  }, [uploadTriggered]);

  function allChecks() {
    if (title !== '' && description !== '' && price !== '') {
      if (title.length < 30) {
        ToastAndroid.show('Add more words to title', 3000);
      } else if (description.length < 80) {
        ToastAndroid.show('Add more words to description', 3000);
      } else if (Number(price) < 100) {
        ToastAndroid.show('Price must be greater than 100', 3000);
      } else if (Number(price) > 20000) {
        ToastAndroid.show('Price must be less than 20,000', 3000);
      } else if (productImage.length < 4) {
        ToastAndroid.show('Select minimum 4 images', 3000);
      } else return 1;
    } else ToastAndroid.show('All fields are mandatory', 3000);
  }

  async function sendToServerFinal() {
    try {
      if (allChecks() === 1) {
        setLoading(true);
        const formData = new FormData();

        /**
         * !ObjectOfAllFomrdata so that manually we don't have to append on formData
         */

        let objectOfAllFormData = {
          type: typeOfName[productTypeState],
          category: route.params.category,
          title,
          description,
          price,
        };

        Object.keys(objectOfAllFormData).forEach(x => {
          formData.append(x, objectOfAllFormData[x]);
        });

        for (const i of productImage) {
          formData.append('productImages', i);
        }

        const {data: addProductServerResponse} = await axios.post(
          `https://shareclub.shridaan.com/api/v1/product/add/${userPersistedData.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: userPersistedData.token,
            },
          },
        );

        if (addProductServerResponse.success === true) {
          //!Reset everything
          setLoading(false);
          setUploadTriggered(false);
          setTitle('');
          setDescription('');
          setPrice('');
          setProductImage([]);
          setProductTypeState(1);
          //!Goto thnakyou page
          navigation.navigate('addProductThankYou');
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: Rooms.js:90 ~ sendToServerFinal ~ error:', error);
    }
  }

  function deleteSelectedImage(name) {
    let tempFilteredImg = productImage.filter(obj => obj.name != name);
    setProductImage(tempFilteredImg);
  }

  async function imageSelector() {
    let tempObj = Object.assign({});
    try {
      const imageDetails = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      tempObj['uri'] = imageDetails.assets[0].uri;
      tempObj['name'] = imageDetails.assets[0].fileName;
      tempObj['fileName'] = imageDetails.assets[0].fileName;
      tempObj['type'] = imageDetails.assets[0].type;

      if (productImage?.length < 9) {
        setProductImage([...productImage, tempObj]);
      } else {
        ToastAndroid.show('Reached limit', 3000);
      }

      //!Can't console log productImage state here coz setState is Asynchronous
    } catch (error) {
      console.log(
        '🚀 ~ file: Verification.js:22 ~ selectImageBoxHandler ~ e:',
        error.messaage,
      );
    }
  }

  const ProdutTypeComponent = ({item}) => {
    return (
      <Pressable
        style={[
          styles.eachProductTypeWrapper,
          productTypeState == item.id
            ? styles.eachProductTypeWrapperSelected
            : null,
        ]}
        android_ripple={{color: 'white'}}
        onPress={setProductTypeState.bind(null, item.id)}>
        <Text
          style={[
            styles.eachProductTypeWrapperText,
            productTypeState == item.id
              ? styles.eachProductTypeWrapperTextSelected
              : null,
          ]}>
          {item.type}
        </Text>
      </Pressable>
    );
  };

  const PopulatedImageSection = () => {
    return (
      <View style={styles.populatedImageWrapper}>
        <FlatList
          style={{marginTop: 10}}
          data={productImage}
          keyExtractor={item => item.name}
          ListFooterComponent={() => (
            <TouchableOpacity onPress={imageSelector}>
              <DIcon
                name={'image-plus'}
                provider={'MaterialCommunityIcons'}
                size={55}
                color={'#353535'}
              />
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                {firstImageSelected ? 'Add more' : 'Add photo'}
              </Text>
            </TouchableOpacity>
          )}
          ListFooterComponentStyle={{
            justifyContent: 'flex-end',
            marginLeft: 10,
          }}
          renderItem={({item}) => (
            <Pressable
              style={styles.eachPopulatedImageWrapper}
              onLongPress={deleteSelectedImage.bind(null, item.name)}>
              <Image
                source={{uri: item.uri}}
                style={styles.populatedProductImages}
              />
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={50}
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1}}>
      <Text style={styles.productTypeTitle}>Select product type</Text>
      <View style={styles.productTypeWrapper}>
        <FlatList
          onScroll={() => setEnableScroll(false)}
          data={productType}
          renderItem={props => <ProdutTypeComponent {...props} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled
        />
      </View>
      <View style={styles.wrapper}>
        <TextInput
          style={[styles.inputText, {textAlignVertical: 'top'}]}
          placeholder="Title, max 80 characters"
          value={title}
          onChangeText={t => setTitle(t)}
          multiline
          numberOfLines={2}
          maxLength={80}
          editable={loading ? false : true}
        />
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder={'Description, max 200 characters'}
          style={[styles.inputText, {textAlignVertical: 'top'}]}
          value={description}
          onChangeText={t => setDescription(t)}
          maxLength={200}
          editable={loading ? false : true}
        />

        {uploadTriggered ? (
          <View style={styles.selectImageWrapper}>
            <PopulatedImageSection />
          </View>
        ) : (
          <View style={styles.selectImageWrapper}>
            <Pressable
              style={styles.selectImageContainer}
              onPress={() => setUploadTriggered(true)}>
              <DIcon
                name={'ios-cloud-upload'}
                provider={'Ionicons'}
                size={120}
                color={'#35353590'}
              />
              <Text style={styles.selectImageTitle}>
                Product image, between [0-10]
              </Text>
            </Pressable>
          </View>
        )}

        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          placeholder="Price between ₹100-20,000"
          value={price}
          onChangeText={p => setPrice(p)}
          maxLength={5}
          autoComplete="off"
          editable={loading ? false : true}
        />

        <TouchableOpacity
          onPress={sendToServerFinal}
          disabled={loading ? true : false}>
          <Text style={styles.btn}>
            {!loading ? (
              `ADD MY PRODUCT`
            ) : (
              <ActivityIndicator size="small" color="#ff6584" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BooksNotes;

const styles = StyleSheet.create({
  productTypeTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 22,
    marginTop: 10,
    color: '#353535',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  productTypeWrapper: {
    padding: 10,
  },
  eachProductTypeWrapper: {
    padding: 8,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#353535',
  },
  eachProductTypeWrapperText: {
    color: '#353535',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  eachProductTypeWrapperSelected: {
    backgroundColor: '#353535',
  },
  eachProductTypeWrapperTextSelected: {
    color: '#fff',
  },

  //!#From Verificaiton
  inputText: {
    fontSize: 14,
    color: '#353535',
    borderBottomWidth: 2,
    paddingBottom: 8,
    marginVertical: 20,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
  },
  selectImageWrapper: {
    // borderColor: 'red',
    height: 170,
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  selectImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
  selectImageTitle: {
    fontSize: 15,
    color: '#35353590',
    fontFamily: 'Poppins-Regular',
    marginBottom: 15,
  },
  populatedImageWrapper: {
    width: '100%',
    height: 150,
    // paddingHorizontal: 5,
  },
  eachPopulatedImageWrapper: {
    width: 120,
    height: 140,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#35353550',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  populatedProductImages: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  btn: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 25,
    paddingVertical: 16,
    backgroundColor: '#333',
    borderRadius: 30,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});
