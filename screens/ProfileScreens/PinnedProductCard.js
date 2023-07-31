import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {customAndroidToast} from '../../utils/helper';
import DIcon from '../../Data/DIcons';
import {pricingComma} from '../../utils/helper';
import {useDispatch} from 'react-redux';
import {pinUnPinProducts} from '../../redux/Slices/pinSlice';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const PinnedProductCard = props => {
  const dispatch = useDispatch();

  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const {
    _id: id,
    title: proTitle,
    description: proDescription,
    price: proPricing,
    productImages: proImages,
    user,
  } = props.item;

  async function updateIntrestAndHandleChat(user, productTitle) {
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

  function handleRemove(id) {
    /**
     * !pinSlice is going to check productDetails._id so instead of dispatching whole object I've sent only _id to dispatch it will work
     */
    dispatch(pinUnPinProducts({productDetails: {_id: id}}));
  }

  const imageKeyExtractor = useCallback((item, i) => item._id.toString(), []);

  const renderProductImage = useCallback(
    url => (
      <Image
        style={styles.imageStyle}
        resizeMode="contain"
        source={{uri: url}}
      />
    ),
    [],
  );

  return (
    <View style={styles.eachProductWrapper}>
      <View style={styles.productImageWrapper}>
        <FlatList
          data={proImages}
          renderItem={({item, index}) =>
            renderProductImage(`https://shareclub.shridaan.com/${item.path}`)
          }
          horizontal={true}
          pagingEnabled
          style={{height: 300}}
          showsHorizontalScrollIndicator={false}
          renderToHardwareTextureAndroid
          keyExtractor={imageKeyExtractor}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentProductIndex((x / 300).toFixed(0));
            console.log(x, currentProductIndex);
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

        <TouchableOpacity
          style={styles.RemoveWrapper}
          onPress={handleRemove.bind(null, id)}>
          <DIcon
            name={'circle-with-cross'}
            provider={'Entypo'}
            color={'#ff6584'}
            size={20}
          />
          <Text style={styles.RemoveText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PinnedProductCard;

const styles = StyleSheet.create({
  eachProductWrapper: {
    width: '100%',
    backgroundColor: '#e7e7e7',
    padding: responsiveWidth(2.8),
    borderRadius: responsiveWidth(5),
    overflow: 'hidden',
    marginVertical: responsiveHeight(2),
  },
  productImageWrapper: {
    borderRadius: responsiveWidth(5),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  productImageTrackerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: responsiveWidth(2.5),
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
    width: responsiveWidth(83.3),
    aspectRatio: 1,
    flex: 1,
    // height: undefined,
  },
  productAbout: {
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  productTitle: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    marginTop: responsiveWidth(2),
  },
  productTitleText: {
    fontWeight: 'bold',
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
  RemoveWrapper: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  RemoveText: {
    color: '#353535',
    fontFamily: 'Poppins-Regular',
    fontWeight: '800',
    marginLeft: 4,
    fontSize: responsiveFontSize(1.8),
  },
});
