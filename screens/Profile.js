import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const [userName, setuserName] = useState('Default Name');
  const [userEmail, setuserEmail] = useState('Default Email');
  const [userImage, setuserImage] = useState(
    'https://miro.medium.com/v2/resize:fit:622/format:webp/1*L7YCbRich-fkNNcdTAIvQg.jpeg',
  );

  useEffect(() => {
    console.log('Subs');
    const unsub = auth().onAuthStateChanged(user => {
      if (user) {
        setuserEmail(user.email);
        setuserName(user.displayName);
        setuserImage(user.photoURL);
      }
    });
    return unsub;
  });

  return (
    <View style={styles.warpper}>
      <Text>Name : {userName}</Text>
      <Text>Email : {userEmail}</Text>
      <Image source={{uri: userImage, height: 100, width: 100}} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  warpper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
