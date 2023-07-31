import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import DIcon from '../../Data/DIcons';
import {pricingComma} from '../../utils/helper';
import {useSelector} from 'react-redux';
import {useDelistProductMutation} from '../../redux/Slices/rtkQuerySlices/listedProductsRtkSlice';
import {customAndroidToast} from '../../utils/helper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
function renderProductImage(url) {
  return (
    <Image style={styles.imageStyle} resizeMode="contain" source={{uri: url}} />
  );
}

async function listDelistHandler({
  id,
  userId,
  userToken,
  delistProduct,
  active,
}) {
  //!Id here refers to productId(_id)
  try {
    const productId = id;
    let delistingResponse = await delistProduct({
      productId,
      userId,
      userToken,
    });

    customAndroidToast('Operation successfull');
  } catch (e) {
    console.log(e);
  }
}

const ListedProductCards = props => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const {
    _id: id,
    title: proTitle,
    description: proDescription,
    price: proPricing,
    productImages: proImages,
    active,
  } = props.item;

  /*
   *Get User ID  & Token from redux send to listDelit function by binding it
   */
  const {id: userId, token: userToken} = useSelector(
    state => state.auth.profile,
  );

  console.log(active);

  const [delistProduct, {isLoading: productDelistLoading}] =
    useDelistProductMutation();

  /*
!Using Callbacks
*/
  const imageKeyExtractor = useCallback((item, i) => item._id.toString(), []);

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
            onPress={listDelistHandler.bind(null, {
              id,
              userId,
              userToken,
              delistProduct,
              active,
            })}>
            <Text style={styles.chatText}>
              {!productDelistLoading ? (
                active ? (
                  'Delist'
                ) : (
                  'Activate'
                )
              ) : (
                <ActivityIndicator size="small" color="#ff6584" />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activeStatus}>
          <DIcon
            name={'bullseye'}
            provider={'FontAwesome5'}
            color={active ? '#00BFA6' : '#ff6584'}
            size={20}
          />
          <Text style={styles.activeStatusText}>
            {active ? 'Active' : 'Inactvie'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListedProductCards;

const styles = StyleSheet.create({
  eachProductWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    padding: responsiveWidth(2.8),
    borderRadius: responsiveWidth(5),
    overflow: 'hidden',
    marginVertical: responsiveHeight(1.5),
  },
  productImageWrapper: {
    borderRadius: responsiveWidth(5),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  productImageTrackerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: responsiveWidth(2.1),
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
    width: responsiveWidth(83.4),
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
  activeStatus: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeStatusText: {
    color: '#353535',
    fontFamily: 'Poppins-Regular',
    fontWeight: '800',
    marginLeft: 5,
    fontSize: responsiveFontSize(1.8),
  },
});
