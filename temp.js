import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const Verification = () => {
  const [image, setImage] = useState();

  const [tempArr, setTempArr] = useState([]);

  const imglb = async () => {
    let tempObj = Object.assign({});
    const result = await launchImageLibrary({mediaType: 'photo'});
    setImage(result);
    tempObj['uri'] = result.assets[0].uri;
    tempObj['name'] = result.assets[0].fileName;
    tempObj['fileName'] = result.assets[0].fileName;
    tempObj['type'] = result.assets[0].type;
    // console.log('TempObj', tempObj);
    setTempArr([...tempArr, tempObj]);
    console.log(':::::::::::Temp Arr:::::::::', tempArr);
  };

  const myForm = async () => {
    try {
      console.log('My Form called');
      const formData = new FormData();
      formData.append('name', 'atul');

      for (const i of tempArr) {
        formData.append('verificationMedia', i);
      }

      let {data} = await axios.post(
        `http://192.168.42.75:3000/api/v1/user/test`,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      console.log(formData);
    } catch (e) {
      console.log('Form Error', e);
    }
  };

  return (
    <View style={styles.wrapper}>
      {image ? (
        <Image source={{uri: image.assets[0].uri, height: 200, width: 200}} />
      ) : (
        <Text>Hello</Text>
      )}

      <TouchableOpacity onPress={imglb}>
        <Text>Launch Image Library 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={imglb}>
        <Text>Launch Image Library 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={imglb}>
        <Text>Launch Image Library 3</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={myForm}>
        <Text>Form</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
