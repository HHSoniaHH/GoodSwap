import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
} from "react-native";
import { useLogin } from "../context/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/client";
import MyImage from '../../assets/defaultProfile.png';

const Profile = () => {
  const imageUri = Image.resolveAssetSource(MyImage).uri;

  const [modalVisible, setModalVisible] = useState(false);
  const { profile,setProfile } = useLogin();
  const [userData, setUserData] = useState({
    fname: profile.fname,
    lname: profile.lname,
    email: profile.email,
  });
//  const id = window.localStorage.getItem("id");
const handleInputChange = (field, value) => {
  setUserData({ ...userData, [field]: value });
};


  const handleSubmit =async (event) => {
    event.preventDefault();
    
    const token = await AsyncStorage.getItem('token');

     try {
      const res = await client.put(`/user/${profile.id}`, userData,   {headers: {
        Authorization: `JWT ${token}`,
      },})
        
       if(res.data.success===true)
       {   console.log(res.data);
        setProfile(res.data.data)
        setModalVisible(!modalVisible) 
  
  
  
    }else{
      console.log(res.data.message);
     }
  
      
     } catch (error) {
      console.log('Une erreur est survenue :', error.message);
      console.log('Message d\'erreur serveur :', error.response.data);
     }


        // Mettre à jour l'état de l'utilisateur ou rediriger vers une autre page
    
    
  };


  return (
    <View  style={styles.container}
    >
      <Modal style={styles.centeredView}
      
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Modifier mes infos</Text>

            <TextInput
              placeholder="Email"
              onChangeText={(value) => handleInputChange('email', value)}
              value={userData.email||profile.email}
              placeholderTextColor="#A8A8A8"
              style={styles.input}
            />
            <TextInput
        onChangeText={(value) => handleInputChange('fname', value)}

              placeholder="Nom"
              value={userData.fname || profile.fname}
              placeholderTextColor="#A8A8A8"
              style={styles.input}
            />

            <TextInput
        onChangeText={(value) => handleInputChange('lname', value)}

              placeholder="Prénom"
              value={userData.lname || profile.lname}
              placeholderTextColor="#A8A8A8"
              style={styles.input}
            />

            <View style={{ flexDirection: "row", gap: 15 }}>
              <Pressable  onPress={handleSubmit} style={[styles.button, styles.buttonClose]}>
                <Text style={[styles.textStyle, {}]}>Modifier</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { backgroundColor: "red" },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle]}>Annuler</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection:'row',gap:18 ,marginBottom:15,borderColor:'#000080',borderWidth:1 ,alignItems:'center',borderRadius:25,marginTop:15 ,width:380,padding:10}}>
      <Image source={{ uri: profile.avatar||imageUri }} style={{ width: 120, height: 120 , borderRadius: 25}} />

        <View style={{}}>
      <Text style={{ fontSize: 20, marginTop: 20 ,fontFamily:'poppins' }}>{profile.fname} {profile.lname}</Text>
      <Text style={{ fontSize: 12,color:'#A0A0A0', marginTop:-5 ,fontFamily:'poppins'}}>{profile.email}</Text>
      <Text style={{ fontSize: 12,color:'#420075',textAlign:'right', marginTop: 10 ,fontFamily:'poppins'}}>{profile.UserType}</Text>

        </View>
      </View>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >  
        <Text style={styles.textStyle}>Modifier mes infos</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",

    flex: 1,
    alignItems: "center",   
     marginTop: 2,

  },
  container: {

    flex: 1,
    alignItems: "center",   
     marginTop: 2,
     
  },
  modalView: {
    margin: 25,
    backgroundColor: "white",
    borderRadius: 20,
    width: 350,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: "#0099ff",
    width: 250,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
  },
  input: {
    borderWidth: 1,

    borderColor: "rgba(49, 39, 131,1)",
    height: 45,
    width: 315,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 8,
  },
});

export default Profile;
