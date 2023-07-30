import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Pressable,
  Vibration,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import DIcon from '../Data/DIcons';
import {customAndroidToast, pricingComma} from '../utils/helper';
import {useDispatch, useSelector} from 'react-redux';
import {pinUnPinProducts} from '../redux/Slices/pinSlice';
import authSystem from '../OAuth';
import ViewShot from 'react-native-view-shot';
import share from 'react-native-share';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ProductCard = props => {
  const ref = React.useRef();

  /**
   * Data
   */

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [screenShotUrl, setScreenShotUrl] = useState();

  const {
    _id: id,
    title: proTitle,
    description: proDescription,
    price: proPricing,
    productImages: proImages,
    active,
    intrested,
    user,
    type,
  } = props.item;

  /**
   * Redux Part
   */

  const dispatch = useDispatch();

  const persistedPinnedProducts = useSelector(
    state => state.pin.everyPinnedProducts,
  );

  /**
   * Logical funcitons
   */

  async function updateIntrestAndHandleChat(user, productTitle) {
    //Intrested will be updated later
    Vibration.vibrate(40);
    try {
      let message =
        "Hi! Visitor, from ShareClub, lets have a discussion on product you've listed " +
        `" ${productTitle}"`;
      let url =
        'whatsapp://send?text=' + message + '&phone=91' + user.whatsappNumber;
      await Linking.openURL(url);
    } catch (e) {
      if (e) {
        customAndroidToast('Please install WhatsApp from playstore');
        Linking.openURL(
          'https://play.google.com/store/search?q=whatsapp&c=apps',
        );
      }
    }
  }

  function pinHandler(productDetails) {
    dispatch(pinUnPinProducts({productDetails}));
  }

  async function shareCard() {
    console.log('Screenshot');
    Vibration.vibrate(50);
    ref.current.capture().then(uri => {
      uri &&
        share.open({
          url: uri,
          message:
            'Download shareclub, to get this product https://play.google.com/store/apps/details?id=com.testshareclub',
        });
    });
  }

  /**
   * Rendering product image
   * !Using callbacks
   */

  // const renderProductImage = useCallback(url => (
  //   <Image
  //     style={styles.imageStyle}
  //     resizeMode="contain"
  //     source={{uri: url}}
  //     key={Date.now()}
  //   />
  // ));

  function renderProductImage(url) {
    return (
      <Image
        style={styles.imageStyle}
        resizeMode="contain"
        source={{uri: url}}
        resizeMethod="resize"
        onLoadStart={() => console.log('fucked uppppp')}
      />
    );
  }

  const imageKeyExtractor = useCallback((item, i) => item._id.toString(), []);

  return (
    <ViewShot ref={ref}>
      <View style={styles.eachProductWrapper}>
        <View style={styles.productImageWrapper}>
          <FlatList
            data={proImages}
            renderItem={({item, index}) =>
              renderProductImage(`https://shareclub.shridaan.com/${item.path}`)
            }
            keyExtractor={imageKeyExtractor}
            horizontal={true}
            pagingEnabled
            style={{height: 300}}
            showsHorizontalScrollIndicator={false}
            renderToHardwareTextureAndroid
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentProductIndex((x / 300).toFixed(0));
              // console.log(x, currentProductIndex);
            }}
          />
          <View style={styles.productImageTrackerWrapper}>
            {proImages.map((x, i) => (
              <View
                key={i}
                style={[
                  styles.productImageTracker,
                  {
                    backgroundColor:
                      currentProductIndex == i ? '#333' : '#e7e7e7',
                    width: currentProductIndex == i ? 15 : 6,
                  },
                ]}></View>
            ))}
          </View>
        </View>
        <View style={styles.productAbout}>
          <View style={styles.productTitle}>
            <Text style={styles.productTitleText}>{proTitle}</Text>
          </View>
          <View style={styles.productDescription}>
            <Text style={styles.productDescriptionText}>{proDescription}</Text>
          </View>
          <View style={styles.pricingContactWrapper}>
            <Text style={styles.priceText}>
              Price.{' '}
              <Text style={styles.priceNum}>{pricingComma(proPricing)}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => updateIntrestAndHandleChat(user, proTitle)}>
              <Text style={styles.chatText}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pinsAndReachedWrapper}>
            <View style={styles.reachedBox}>
              <DIcon
                name={'tag'}
                provider={'Feather'}
                color="#353535"
                size={23}
              />
              <Text style={styles.intActPinText}>{type}</Text>
            </View>
            <Pressable style={styles.reachedBox} onPress={shareCard}>
              <DIcon
                name={'share'}
                provider={'Feather'}
                color="#6871ff"
                size={23}
              />
              <Text style={styles.intActPinText}>Share {intrested}</Text>
            </Pressable>
            <View style={styles.activeBox}>
              <DIcon
                name={'bullseye'}
                provider={'FontAwesome5'}
                color={active ? '#00BFA6' : '#ff6884'}
                size={23}
              />
              <Text style={styles.intActPinText}>
                {active ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.pinsWrapper}
              onPress={pinHandler.bind(null, props.item)}>
              {persistedPinnedProducts.findIndex(e => e._id === id) === -1 ? (
                <>
                  <DIcon
                    name={'pin'}
                    provider={'Octicons'}
                    size={23}
                    color="#353535"
                  />
                  <Text style={styles.intActPinText}>Pin</Text>
                </>
              ) : (
                <>
                  <DIcon
                    name={'pin'}
                    provider={'Octicons'}
                    size={23}
                    color="#ff6584"
                  />
                  <Text style={styles.intActPinText}>Unpin</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ViewShot>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  eachProductWrapper: {
    width: '100%',
    backgroundColor: '#e7e7e7',
    padding: responsiveWidth(2.8),
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: responsiveHeight(2),
  },
  productImageWrapper: {
    // padding: 2,
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: responsiveWidth(3),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  productImageTrackerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    gap: 8,
  },
  productImageTracker: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: '#333',

    // backgroundColor: '#fe961a',
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 1,
    flex: 1,
  },
  productAbout: {
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  productTitle: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  productTitleText: {
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
    fontSize: responsiveFontSize(2.1),
  },
  productDescription: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  productDescriptionText: {
    fontSize: responsiveFontSize(1.7),
  },
  pricingContactWrapper: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  chatText: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 30,
  },
  priceNum: {
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'Poppins-Regular',
  },
  pinsAndReachedWrapper: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth: 1,
  },
  pinsAndReachButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 30,
    flexDirection: 'row',
  },

  reachedBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 1,
  },

  activeBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pinsWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  intActPinText: {
    color: '#353535',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.5),
  },
});
