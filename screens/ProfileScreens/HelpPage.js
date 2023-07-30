import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {headerHideShow} from '../../redux/Slices/headerSlice';

async function whatsapp() {
  //Intrested will be updated later

  try {
    let message = `Hi! Visitor, from ShareClub`;
    let url = 'whatsapp://send?text=' + message + '&phone=917408407403';
    console.log(url);
    await Linking.openURL(url);
  } catch (e) {
    if (e) {
      customAndroidToast('Please install WhatsApp from playstore');
      Linking.openURL('https://play.google.com/store/search?q=whatsapp&c=apps');
    }
  }
}

const HelpPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('fuck');
    dispatch(headerHideShow({type: 'profileheader', show: false}));
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Support.png')}
          />
        </View>
        <Text style={styles.informationText}>
          Need help | Report | Feedback
        </Text>
        <TouchableOpacity onPress={whatsapp}>
          <Text style={styles.btn}>Contact via whatsapp</Text>
        </TouchableOpacity>
        <Text style={[styles.informationText, {fontSize: 10, fontWeight: 900}]}>
          Shareclub Beta CGC Landran | Version, 0.0.1
        </Text>
      </View>
    </View>
  );
};

export default HelpPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  imageContainer: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 300,
  },
  informationText: {
    fontFamily: 'Overlock-Black',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'justify',
    marginTop: 10,
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
