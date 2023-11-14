import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';

import client from '../api/client';
import MyImage from '../../assets/defaultProfile.png';
import { useLogin } from '../context/LoginProvider';

  
const ImageUpload = props => {
  const imageUri = Image.resolveAssetSource(MyImage).uri;
  const [profileImage, setProfileImage] = useState('');
  const { token } = props.route.params;
  const { setIsLoggedIn, setIsUser, setLoginpending } = useLogin();

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        setProfileImage(response.uri);
      }
    }
  };
  const uploadProfileImage = async () => {

    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: profileImage,
      type: 'image/jpg',
    });

    try {
      const res = await client.post('/upload-profile', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
        setIsLoggedIn(true);
        setIsUser(true)

        props.navigation.dispatch(StackActions.replace('UserHome'));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
const  ignoer =()=>{
  setIsLoggedIn(true);
  setIsUser(true)

  props.navigation.dispatch(StackActions.replace('UserHome'));
}
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Text style={styles.uploadBtn}>Selectionner une image</Text>
          )}
        </TouchableOpacity>
       
        {profileImage ? (
          <Text
            onPress={uploadProfileImage}
            style={[
              styles.skip,
              { backgroundColor: '#0099FF', color: 'white', borderRadius: 8 },
            ]}
          >
            Charger
          </Text>
        ) : <Text  onPress={ignoer} style={styles.skip}>Ignorer</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 1,
    marginTop:16,
    fontWeight: 'bold',
    fontFamily:'poppins'

  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 2,
    opacity: 1
    ,fontFamily:'poppins'

  },
});

export default ImageUpload;
